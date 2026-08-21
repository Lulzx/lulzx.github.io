const HTML = 'text/html';
const MARKDOWN = 'text/markdown';

const SPA_INDEX_PATHS = new Set(['/projects', '/words']);
const MARKDOWN_PATHS = new Map([
  ['/', '/index.md'],
  ['/about', '/about/index.md'],
  ['/contact', '/contact/index.md'],
  ['/developers', '/developers/index.md'],
  ['/gallery', '/gallery/index.md'],
  ['/gallery/', '/gallery/index.md'],
  ['/learn', '/learn/collection.md'],
  ['/learn/', '/learn/collection.md'],
  ['/privacy', '/privacy/index.md'],
  ['/projects', '/projects.md'],
  ['/words', '/words/index.md'],
  ['/words/', '/words/index.md'],
]);

function parseAccept(header) {
  if (!header) return [];
  return header.split(',').map((part, position) => {
    const [rawType, ...rawParams] = part.trim().split(';');
    const type = rawType.toLowerCase();
    if (!type) return null;
    let q = 1;
    for (const rawParam of rawParams) {
      const [name, value] = rawParam.trim().split('=');
      if (name?.toLowerCase() === 'q') {
        const parsed = Number(value);
        q = Number.isFinite(parsed) ? Math.max(0, Math.min(1, parsed)) : 0;
      }
    }
    const specificity = type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2;
    return { type, q, specificity, position };
  }).filter(Boolean);
}

function matches(entry, candidate) {
  return entry.type === '*/*'
    || (entry.type.endsWith('/*') && candidate.startsWith(entry.type.slice(0, -1)))
    || entry.type === candidate;
}

export function preferredType(header, produces = [HTML, MARKDOWN]) {
  if (!header) return produces[0] ?? null;
  const entries = parseAccept(header);
  if (!entries.length) return produces[0] ?? null;
  let best = null;
  for (const candidate of produces) {
    const candidates = entries.filter(entry => matches(entry, candidate));
    if (!candidates.length) continue;
    candidates.sort((a, b) => b.specificity - a.specificity || a.position - b.position);
    const match = candidates[0];
    if (match.q <= 0) continue;
    if (!best || match.q > best.q || (match.q === best.q && match.position < best.position)) {
      best = { type: candidate, q: match.q, position: match.position };
    }
  }
  return best?.type ?? null;
}

function appendVaryAccept(headers) {
  const current = headers.get('Vary');
  if (!current) return headers.set('Vary', 'Accept');
  const values = current.split(',').map(value => value.trim().toLowerCase());
  if (!values.includes('accept')) headers.set('Vary', `${current}, Accept`);
}

function documentPath(pathname) {
  return pathname.replace(/\/$/, '') || '/';
}

function markdownPath(pathname) {
  const normalized = documentPath(pathname);
  if (MARKDOWN_PATHS.has(pathname)) return MARKDOWN_PATHS.get(pathname);
  if (MARKDOWN_PATHS.has(normalized)) return MARKDOWN_PATHS.get(normalized);
  if (/^\/learn\/[a-z0-9-]+$/.test(normalized) || /^\/words\/[a-z0-9-]+$/.test(normalized)) {
    return `${normalized}.md`;
  }
  return null;
}

function isDocumentRequest(pathname) {
  return !/\.[a-z0-9]{1,8}$/i.test(pathname) || /\.html?$/i.test(pathname);
}

function responseWithBody(request, body, init) {
  return new Response(request.method === 'HEAD' ? null : body, init);
}

function notAcceptable(request) {
  const headers = new Headers({ 'Content-Type': 'text/plain; charset=utf-8' });
  appendVaryAccept(headers);
  return responseWithBody(request, 'Not Acceptable\n\nAvailable: text/html, text/markdown\n', { status: 406, headers });
}

function notFound(request) {
  const headers = new Headers({
    'Content-Type': 'text/markdown; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  appendVaryAccept(headers);
  const body = `# 404: resource not found

The requested path does not exist on lulzx.com.

- [Site map](https://lulzx.com/sitemap.xml)
- [Agent instructions](https://lulzx.com/llms.txt)
- [Writing index](https://lulzx.com/learn)
- [Developer resources](https://lulzx.com/developers)
- [Home](https://lulzx.com/)
`;
  return responseWithBody(request, body, { status: 404, headers });
}

async function fetchOrigin(request, fetchImpl, pathname = null) {
  const url = new URL(request.url);
  if (pathname) url.pathname = pathname;
  const headers = new Headers(request.headers);
  headers.set('Accept', '*/*');
  return fetchImpl(new Request(url, { method: request.method, headers, redirect: 'follow' }));
}

export async function handleRequest(request, fetchImpl = fetch) {
  const url = new URL(request.url);
  if (!['GET', 'HEAD'].includes(request.method)) return fetchOrigin(request, fetchImpl);
  if (!isDocumentRequest(url.pathname)) return fetchOrigin(request, fetchImpl);

  const accept = request.headers.get('Accept');
  const chosen = preferredType(accept);
  if (accept && chosen === null) return notAcceptable(request);

  const mdPath = markdownPath(url.pathname);
  if (chosen === MARKDOWN && mdPath) {
    const source = await fetchOrigin(request, fetchImpl, mdPath);
    if (source.ok) {
      const headers = new Headers(source.headers);
      headers.set('Content-Type', 'text/markdown; charset=utf-8');
      appendVaryAccept(headers);
      return responseWithBody(request, source.body, { status: source.status, headers });
    }
  }

  let origin = await fetchOrigin(request, fetchImpl);
  const normalized = documentPath(url.pathname);
  if (origin.status === 404 && SPA_INDEX_PATHS.has(normalized)) {
    origin = await fetchOrigin(request, fetchImpl, '/index.html');
  }
  if (origin.status === 404) return notFound(request);

  if (chosen === MARKDOWN) {
    return notAcceptable(request);
  }

  const headers = new Headers(origin.headers);
  appendVaryAccept(headers);
  if (mdPath) {
    const existing = headers.get('Link');
    const alternate = `<${mdPath}>; rel="alternate"; type="text/markdown"`;
    headers.set('Link', existing ? `${existing}, ${alternate}` : alternate);
  }
  return responseWithBody(request, origin.body, { status: origin.status, headers });
}

export default {
  fetch(request) {
    return handleRequest(request);
  },
};
