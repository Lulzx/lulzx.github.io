import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { handleRequest, preferredType } from '../worker/index.js';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function mockOrigin(overrides = {}) {
  const defaults = {
    '/': new Response('<h1>HTML home</h1>', { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', Vary: 'Accept-Encoding' } }),
    '/index.html': new Response('<h1>SPA</h1>', { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', Vary: 'Accept-Encoding' } }),
    '/index.md': new Response('# Markdown home', { status: 200, headers: { 'Content-Type': 'text/plain' } }),
    '/about': new Response('<h1>About</h1>', { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }),
    '/about/index.md': new Response('# About', { status: 200, headers: { 'Content-Type': 'text/plain' } }),
    '/projects': new Response('fallback shell', { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } }),
  };
  const table = { ...defaults, ...overrides };
  return async request => {
    const path = new URL(request.url).pathname;
    const source = table[path] || new Response('fallback shell', { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    return new Response(request.method === 'HEAD' ? null : source.body, source);
  };
}

test('raw homepage has meaningful JavaScript-free content and one H1', () => {
  const html = read('index.html');
  const withoutScripts = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  const raw = visibleText(html);
  assert.match(withoutScripts, /<h1>Software engineer\./);
  assert.equal((withoutScripts.match(/<h1\b/gi) || []).length, 1);
  assert.ok(raw.length >= 500, `only ${raw.length} visible characters`);
  assert.ok(raw.length / Buffer.byteLength(html) >= 0.05, `content efficiency is ${(100 * raw.length / Buffer.byteLength(html)).toFixed(2)}%`);
});

test('homepage exposes complete Person, Organization, and WebSite JSON-LD', () => {
  const html = read('index.html');
  const block = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(block, 'JSON-LD block missing');
  const graph = JSON.parse(block)['@graph'];
  assert.ok(graph.find(node => node['@type'] === 'Person'));
  const organization = graph.find(node => node['@type'] === 'Organization');
  assert.equal(organization.contactPoint['@type'], 'ContactPoint');
  assert.ok(organization.contactPoint.email);
  assert.ok(organization.contactPoint.contactType);
  assert.equal(organization.address['@type'], 'PostalAddress');
  assert.ok(organization.address.addressCountry);
  assert.ok(graph.find(node => node['@type'] === 'WebSite'));
});

test('trust and developer pages have canonical titles, H1s, and 500+ text characters', () => {
  for (const route of ['about', 'contact', 'privacy', 'developers']) {
    const html = read(`${route}/index.html`);
    assert.match(html, new RegExp(`<title>[^<]*lulzx`, 'i'), `${route} title does not name lulzx`);
    assert.equal((html.match(/<h1\b/gi) || []).length, 1, `${route} must have one H1`);
    assert.ok(visibleText(html).length >= 500, `${route} has less than 500 characters`);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://lulzx.com/${route}">`));
  }
});

test('llms.txt gives specific when-to-use and access guidance', () => {
  const llms = read('llms.txt');
  assert.match(llms, /^# lulzx$/m);
  assert.match(llms, /^## When to use this site$/m);
  assert.match(llms, /^## How agents should access it$/m);
  for (const path of ['/developers', '/sitemap.xml', '/about', '/contact', '/privacy']) assert.ok(llms.includes(path));
});

test('sitemap is valid in shape and covers every public content page', () => {
  const xml = read('sitemap.xml');
  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(xml, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  for (const route of ['/', '/about', '/contact', '/privacy', '/developers', '/projects', '/learn', '/words', '/gallery/']) {
    assert.ok(xml.includes(`<loc>https://lulzx.com${route}</loc>`), `missing ${route}`);
  }
  for (const dir of ['learn', 'words']) {
    const ids = readdirSync(new URL(`${dir}/`, root)).filter(name => name.endsWith('.html') && name !== 'index.html').map(name => name.slice(0, -5));
    for (const id of ids) assert.ok(xml.includes(`<loc>https://lulzx.com/${dir}/${id}</loc>`), `missing ${dir}/${id}`);
  }
  const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)];
  assert.ok(urls.length > 60);
  for (const [, entry] of urls) assert.match(entry, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
});

test('generated SPA copies and Markdown siblings stay complete', () => {
  const index = read('index.html');
  assert.equal(read('404.html'), index);
  assert.equal(read('learn/index.html'), index);
  for (const dir of ['learn', 'words']) {
    const html = readdirSync(new URL(`${dir}/`, root)).filter(name => name.endsWith('.html') && name !== 'index.html');
    for (const name of html) {
      const markdown = read(`${dir}/${name.slice(0, -5)}.md`);
      assert.match(markdown, /^# .+/);
      assert.ok(markdown.length > 30, `${dir}/${name} Markdown is too short`);
    }
  }
});

test('media preference honors q-values, specificity, and explicit rejection', () => {
  assert.equal(preferredType(null), 'text/html');
  assert.equal(preferredType('text/markdown, text/html;q=0.8'), 'text/markdown');
  assert.equal(preferredType('text/markdown;q=0.4, text/html;q=0.9'), 'text/html');
  assert.equal(preferredType('text/html;q=0, */*;q=1'), 'text/markdown');
  assert.equal(preferredType('application/pdf'), null);
});

test('edge serves Markdown with correct content type and Vary', async () => {
  const response = await handleRequest(new Request('https://lulzx.com/', { headers: { Accept: 'text/markdown' } }), mockOrigin());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.match(response.headers.get('Vary'), /Accept/i);
  assert.equal(await response.text(), '# Markdown home');
});

test('edge serves HTML with alternate link and Vary: Accept, Accept-Encoding', async () => {
  const response = await handleRequest(new Request('https://lulzx.com/'), mockOrigin());
  assert.equal(response.status, 200);
  assert.match(response.headers.get('Content-Type'), /text\/html/);
  assert.match(response.headers.get('Vary'), /Accept-Encoding/);
  assert.match(response.headers.get('Vary'), /Accept/);
  assert.match(response.headers.get('Link'), /rel="alternate"; type="text\/markdown"/);
});

test('edge returns 406 for unsupported types', async () => {
  const response = await handleRequest(new Request('https://lulzx.com/', { headers: { Accept: 'application/pdf' } }), mockOrigin());
  assert.equal(response.status, 406);
  assert.match(response.headers.get('Vary'), /Accept/);
});

test('edge recovers valid SPA routes but gives missing paths a Markdown 404', async () => {
  const valid = await handleRequest(new Request('https://lulzx.com/projects'), mockOrigin());
  assert.equal(valid.status, 200);
  assert.match(await valid.text(), /SPA/);

  const missing = await handleRequest(new Request('https://lulzx.com/not-a-real-resource'), mockOrigin());
  assert.equal(missing.status, 404);
  assert.equal(missing.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  const body = await missing.text();
  assert.match(body, /Site map/);
  assert.match(body, /Agent instructions/);
  assert.match(body, /Developer resources/);
});
