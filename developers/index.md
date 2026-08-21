# lulzx Developer Resources

lulzx is a personal software engineering site and public digital garden. It does not expose a transactional product API. Its developer surface is stable content URLs, a source repository, an XML sitemap, agent instructions, and Markdown representations.

## Machine-readable entry points

- [Agent instructions](https://lulzx.com/llms.txt)
- [XML sitemap](https://lulzx.com/sitemap.xml)
- [Site source](https://github.com/Lulzx/lulzx.github.io)
- Markdown negotiation: send `Accept: text/markdown` to a content URL.

## Content routes

- Notes: `https://lulzx.com/learn/<id>`
- Words: `https://lulzx.com/words/<id>`
- Projects: `https://lulzx.com/projects`

## Integration boundary

There is no public OpenAPI document, authentication flow, webhook contract, SDK, or MCP server for lulzx.com because the site has no write operations or authenticated services. Use the public content and follow project links to their repositories. Use [contact](https://lulzx.com/contact) when a human decision is required.
