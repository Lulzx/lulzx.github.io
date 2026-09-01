import { execFileSync } from 'node:child_process';
import { copyFileSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const write = (path, value) => writeFileSync(new URL(path, root), value);

function decode(value) {
  return value
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&rarr;/g, '→')
    .replace(/&larr;/g, '←').replace(/&middot;/g, '·').replace(/&copy;/g, '©')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

function text(html) {
  return decode(html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function details(filePath, collection) {
  const html = read(filePath);
  const id = basename(filePath, '.html');
  const title = decode(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1].replace(/<[^>]+>/g, '').trim()
    || html.match(/<title>(.*?)\s+[—|-]\s+lulzx<\/title>/i)?.[1]
    || id);
  const description = decode(html.match(/<meta name="description" content="([^"]+)"/i)?.[1] || '');
  const article = collection === 'words'
    ? html.match(/<div class="content">([\s\S]*)<\/div>\s*<\/div>\s*<\/body>/i)?.[1] || ''
    : html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)?.[1] || '';
  const paragraphs = [...article.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].slice(0, 3).map(match => text(match[1]));
  return { collection, description, filePath, html, id, title, article, paragraphs };
}

function htmlToMarkdown(item) {
  let value = item.article;
  const codeBlocks = [];
  value = value.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, (_, code) => {
    const token = `@@CODEBLOCK${codeBlocks.length}@@`;
    codeBlocks.push(`\n\n\`\`\`\n${decode(code).trim()}\n\`\`\`\n\n`);
    return token;
  });
  value = value
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n')
    .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, '*$2*')
    .replace(/<code>([\s\S]*?)<\/code>/gi, '`$1`')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1')
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '');
  codeBlocks.forEach((block, index) => { value = value.replace(`@@CODEBLOCK${index}@@`, block); });
  return `# ${item.title}\n\n${decode(value).replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
}

const learnFiles = readdirSync(new URL('learn/', root))
  .filter(name => name.endsWith('.html') && name !== 'index.html')
  .sort().map(name => `learn/${name}`);
const wordFiles = readdirSync(new URL('words/', root))
  .filter(name => name.endsWith('.html') && name !== 'index.html')
  .sort().map(name => `words/${name}`);
const notes = learnFiles.map(file => details(file, 'learn'));
const words = wordFiles.map(file => details(file, 'words'));

for (const item of [...notes, ...words]) {
  write(`${item.collection}/${item.id}.md`, htmlToMarkdown(item));
}

const noteCards = notes.map(item => `
<article class="ssr-note">
  <h3><a href="/learn/${item.id}">${escapeHtml(item.title)}</a></h3>
  ${item.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('\n  ')}
</article>`).join('');
const wordLinks = words.map(item => `<a class="chip" href="/words/${item.id}">${escapeHtml(item.title)}</a>`).join('');

const projectSource = read('index.html');
const projectBlock = projectSource.match(/const PROJECT_LINES = \[([\s\S]*?)\n\];/);
if (!projectBlock) throw new Error('PROJECT_LINES missing from index.html');
const projectEntries = [...projectBlock[1].matchAll(/\{ name: '(.*?)', href: '(.*?)', text: '(.*?)' \}/g)]
  .map(match => ({ name: match[1], href: match[2], text: match[3].replace(/\\'/g, "'") }));
const projectLinks = projectEntries
  .map(item => `<p><a href="${item.href}">${escapeHtml(item.name)}</a>: ${escapeHtml(item.text)}</p>`)
  .join('\n  ');

const shell = `
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="container header-inner"><a href="/landing" class="brand">lulzx.com</a><div class="nav-wrap"><nav class="nav"><a href="/words"><span class="en">words</span></a><a href="/"><span class="en">projects</span></a><a href="/learn"><span class="en">learn</span></a><a href="/about"><span class="en">about</span></a><a href="/gallery/"><span class="en">gallery</span></a></nav></div></div></header>
<main id="main">
  <section class="section container"><div class="head-row"><h2>Projects</h2></div><p class="page-intro">Public software by lulzx, ordered by the depth of the work rather than by date. The bare list at the site root carries the same entries.</p><div class="ssr-projects">${projectLinks}</div></section>
  <section class="container"><div class="hero"><div class="hero-text"><div class="hero-kicker"><hr class="speedline"><span class="tx">Now broadcasting</span><hr class="speedline"></div><h1>Software engineer.<span class="l2">Building quiet systems.</span></h1><p class="lede">I build small, focused tools and systems with a bias towards clarity, performance and control. Minimal by default. Auditable from source.</p><div class="hero-links"><a href="/">View projects →</a><a href="/learn">Read my notes →</a><a href="/about">About me →</a></div><div class="quote-box"><span class="ln">Build with intent.</span><span class="ln">Ship small.</span><span class="ln">Leave room to think.</span></div></div><div class="hero-art"><div class="monitor"><div class="screen"><img class="ink-img" src="/assets/ink/fuji.webp" width="1100" height="825" alt="Archive footage: Mount Fuji with a pine on the shore, in newsreel monochrome"></div><div class="mcap"><span>archive footage · mt. fuji</span></div></div></div></div></section>
  <section class="section container"><div class="rule-head"><hr><h2>What guides the work</h2><hr></div><div class="principles"><div class="principle"><h3>Do one thing well</h3><p>Small tools with clear boundaries are easier to understand, test, and replace.</p></div><div class="principle"><h3>Minimal by default</h3><p>Every dependency and abstraction has to earn its place.</p></div><div class="principle"><h3>Auditable from source</h3><p>Important behavior should be visible in code and verifiable from evidence.</p></div><div class="principle"><h3>Performance is respect</h3><p>Remove waiting from the path a person uses repeatedly.</p></div><div class="principle"><h3>Build for failure</h3><p>Keep state outside a single run, make retries safe, and leave a way back.</p></div></div></section>
  <section class="section container ssr-intro"><div class="head-row"><h2>Writing garden</h2><a class="more-link" href="/learn">All notes →</a></div><p class="page-intro">These are first-person field notes about building and operating software. They cover small systems, source reading, performance, local machine learning, dependencies, reliability, and the habits that shape the work. The excerpts below are present in the raw HTML so readers and crawlers do not need JavaScript to discover the substance of the site.</p><div class="ssr-notes">${noteCards}</div></section>
  <section class="section container"><div class="head-row"><h2>Word garden</h2><a class="more-link" href="/words">Open the garden →</a></div><p class="page-intro">Short connected concepts used across the notes.</p><div class="ssr-words">${wordLinks}</div></section>
  <section class="section container"><div class="head-row"><h2>Identity and machine access</h2></div><p class="page-intro">lulzx is a software engineer building public tools and keeping a working garden of what those projects teach. Read <a href="/about">about lulzx</a>, use the <a href="/contact">contact page</a>, review the <a href="/privacy">privacy policy</a>, or start from the <a href="/developers">lulzx developer resources</a>. Agents can use <a href="/llms.txt">llms.txt</a>, the <a href="/sitemap.xml">XML sitemap</a>, and Markdown content negotiation.</p></section>
</main>
<footer class="site-footer"><div class="container"><div class="footer-sign"><span class="en">End of broadcast</span></div><div class="footer-bottom"><span class="copy">© 2026 lulzx.com</span><span class="built">Built with plain text and good intentions.</span></div></div></footer>
`;

let index = read('index.html');
const start = '<!-- AGENT_SSR_START -->';
const end = '<!-- AGENT_SSR_END -->';
if (!index.includes(start) || !index.includes(end)) throw new Error('SSR markers missing from index.html');
index = index.replace(new RegExp(`${start}[\\s\\S]*?${end}`), `${start}${shell}${end}`);
write('index.html', index);

function lastModified(filePath) {
  if (['index.html', 'about/index.html', 'contact/index.html', 'developers/index.html', 'privacy/index.html'].includes(filePath)) {
    return '2026-08-22';
  }
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', filePath], { cwd: new URL('.', root), encoding: 'utf8' }).trim() || '2026-08-22';
  } catch {
    return '2026-08-22';
  }
}

const routes = [
  ['/', 'index.html'], ['/landing', 'index.html'], ['/about', 'about/index.html'], ['/contact', 'contact/index.html'],
  ['/developers', 'developers/index.html'], ['/gallery/', 'gallery/index.html'], ['/learn', 'index.html'],
  ['/privacy', 'privacy/index.html'], ['/projects', 'index.html'], ['/words', 'index.html'],
  ...notes.map(item => [`/learn/${item.id}`, item.filePath]),
  ...words.map(item => [`/words/${item.id}`, item.filePath]),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(([route, file]) => `  <url><loc>https://lulzx.com${route}</loc><lastmod>${lastModified(file)}</lastmod></url>`).join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);

copyFileSync(new URL('index.html', root), new URL('404.html', root));
copyFileSync(new URL('index.html', root), new URL('learn/index.html', root));

console.log(`Generated raw homepage (${shell.length} chars), ${notes.length + words.length} Markdown pages, sitemap, and SPA copies.`);
