// gallery-src/story.md -> gallery/story.json
//
//   # Title                      the book's title (first line)
//   > one paragraph              epigraph / preface (may repeat)
//   ## chapter title             starts a chapter (numbered in order)
//   plain paragraphs             prose; blank line separates
//   ![caption](id)               one figure with its caption (caption may be empty)
//   [[ id id id ]]               a group of images, laid out as a row set
//
// An image is named by its id or by #N, its 1-based position in chronological
// order (by month, then manifest order); #3-#9 in a group is a range.
//
// Every image in gallery/images.json must be placed exactly once. Any left over
// are appended to a closing chapter so nothing in the collection is lost.
import { readFileSync, writeFileSync } from 'node:fs'

const root = new URL('../', import.meta.url)
const images = JSON.parse(readFileSync(new URL('gallery/images.json', root), 'utf8'))
const byId = new Map(images.map(img => [img.medium.split('/').pop().replace(/\.\w+$/, ''), img]))
const src = readFileSync(new URL('gallery-src/story.md', root), 'utf8')
const chrono = images.map((img, i) => ({ id: img.medium.split('/').pop().replace(/\.\w+$/, ''), month: img.medium.split('/')[2], i }))
  .sort((a, b) => a.month.localeCompare(b.month) || a.i - b.i).map(x => x.id)
const resolve = ref => {
  const m = ref.match(/^#(\d+)(?:-#?(\d+))?$/)
  if (!m) return [ref]
  const [a, b] = [Number(m[1]), Number(m[2] ?? m[1])]
  if (a < 1 || b > chrono.length || b < a) throw new Error(`bad reference ${ref}`)
  return chrono.slice(a - 1, b)
}

const story = { title: '', preface: [], chapters: [] }
const seen = new Map()
let chapter = null
const place = (id, where) => {
  if (!byId.has(id)) throw new Error(`${where}: unknown image ${id}`)
  if (seen.has(id)) throw new Error(`${where}: ${id} already placed in "${seen.get(id)}"`)
  seen.set(id, chapter?.title ?? 'preface')
  const img = byId.get(id)
  return { id, thumb: img.thumb, medium: img.medium, w: img.w ?? 400, h: img.h ?? 400 }
}
const push = block => { if (!chapter) throw new Error('content before first chapter'); chapter.blocks.push(block) }

for (const para of src.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)) {
  if (para.startsWith('# ')) { story.title = para.slice(2).trim(); continue }
  if (para.startsWith('> ')) { story.preface.push(para.replace(/^> ?/gm, '').replace(/\n/g, ' ')); continue }
  if (para.startsWith('## ')) { chapter = { title: para.slice(3).trim(), blocks: [] }; story.chapters.push(chapter); continue }
  const fig = para.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
  if (fig) { push({ type: 'figure', caption: fig[1].trim(), image: place(resolve(fig[2].trim())[0], chapter?.title) }); continue }
  const grp = para.match(/^\[\[([\s\S]*)\]\]$/)
  if (grp) { push({ type: 'group', images: grp[1].split(/\s+/).filter(Boolean).flatMap(resolve).map(id => place(id, chapter?.title)) }); continue }
  push({ type: 'text', text: para.replace(/\n/g, ' ') })
}

const left = [...byId.keys()].filter(id => !seen.has(id))
if (left.length) {
  chapter = { title: 'loose pages', blocks: [{ type: 'text', text: 'What did not fit anywhere and belongs all the same.' }] }
  story.chapters.push(chapter)
  for (let i = 0; i < left.length; i += 6) push({ type: 'group', images: left.slice(i, i + 6).map(id => place(id, 'loose pages')) })
  console.warn(`${left.length} images were not placed; appended as "loose pages"`)
}
writeFileSync(new URL('gallery/story.json', root), JSON.stringify(story))
console.log(`${story.chapters.length} chapters, ${seen.size}/${byId.size} images`)
