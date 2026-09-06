import * as React from 'react'
import { AlbumMark, ChapterKeepsake, PrintDetails } from './Decorations'
import { Lightbox, LightboxTrigger, type Entry } from '@/registry/base-nova/ui/lightbox'

// The scrapbook keeps an explicit editorial image order in story.md. gallery/story.json is generated from gallery-src/story.md
// by scripts/build-story.mjs. Images are served from the original Cloudflare Pages
// origin; medium renditions are 3x the thumbnail.
const ORIGIN = 'https://kek3141.pages.dev'
const SCALE = 3

type Label = { label: string; alt: string }
type Img = { id: string; thumb: string; medium: string; w: number; h: number }
type Block =
  | { type: 'text'; text: string }
  | { type: 'figure'; caption: string; image: Img }
  | { type: 'group'; images: Img[] }
type Chapter = { title: string; blocks: Block[] }
type Story = { title: string; preface: string[]; chapters: Chapter[] }

const kicker = (n: number, title: string) => `${String(n).padStart(2, '0')} · ${title}`

function toEntry(img: Img, caption: React.ReactNode, alt?: string): Entry {
  return {
    id: img.id,
    caption,
    media: {
      kind: 'image',
      alt: alt || (typeof caption === 'string' ? caption : ''),
      source: { src: ORIGIN + img.thumb, full: ORIGIN + img.medium, width: img.w * SCALE, height: img.h * SCALE, blur: '#101011' },
    },
  }
}

export function App() {
  const [story, setStory] = React.useState<Story | null>(null)
  const [labels, setLabels] = React.useState<Record<string, Label>>({})
  const [failed, setFailed] = React.useState(false)
  React.useEffect(() => {
    // absolute path: /gallery (no trailing slash) would otherwise resolve a
    // relative fetch to /story.json and get the SPA 404 page.
    const controller = new AbortController()
    const read = (url: string) => fetch(url, { signal: controller.signal }).then(r => { if (!r.ok) throw new Error(String(r.status)); return r.json() })
    Promise.all([read('/gallery/story.json'), read('/gallery/labels.json')])
      .then(([nextStory, nextLabels]) => { setStory(nextStory); setLabels(nextLabels) })
      .catch(error => { if (error.name !== 'AbortError') setFailed(true) })
    return () => controller.abort()
  }, [])

  // One flat list of entries in reading order, so the lightbox walks the book.
  const entries = React.useMemo(() => {
    const out = new Map<string, Entry>()
    story?.chapters.forEach((ch, i) => {
      for (const b of ch.blocks) {
        if (b.type === 'figure') out.set(b.image.id, toEntry(b.image, labels[b.image.id]?.label || b.caption || kicker(i + 1, ch.title), labels[b.image.id]?.alt))
        if (b.type === 'group') for (const img of b.images) out.set(img.id, toEntry(img, labels[img.id]?.label || kicker(i + 1, ch.title), labels[img.id]?.alt))
      }
    })
    return out
  }, [story, labels])

  if (failed) return <div className="loading" role="alert">The photographs couldn’t load. <button onClick={() => window.location.reload()}>Try again</button></div>
  if (!story) return <div className="loading" aria-live="polite">Opening the scrapbook…<div className="loading-print" /></div>
  return (
    <Lightbox entries={[...entries.values()]} history loop label="gallery">
      <article className="book" id="top" aria-label="The Long Way Round, a traveller’s scrapbook">
        <h1 className="sr-only">The Long Way Round: a traveller’s scrapbook</h1>
        <div className="book-intro"><span>{entries.size} photographs / {story.chapters.length} chapters</span><span>Tap a print to look closer</span></div>
        <AlbumMark />
        <div className="scrapbook-preface">{story.preface.map((p, i) => <p key={i}>{p}</p>)}</div>
        <details className="contents"><summary>Find a page <span>+</span></summary><nav aria-label="Scrapbook chapters">{story.chapters.map((ch, i) => <a key={i} href={`#ch-${i + 1}`}><span>{String(i + 1).padStart(2, '0')}</span>{ch.title}</a>)}</nav></details>
        {story.chapters.map((ch, i) => {
          const photos = ch.blocks.flatMap(b => b.type === 'figure' ? [b.image] : b.type === 'group' ? b.images : [])
          return <section className="chapter" key={i} id={`ch-${i + 1}`}>
            <ChapterKeepsake chapter={i} />
            <header className="chapter-heading"><span className="chapter-number">{String(i + 1).padStart(2, '0')}</span><h2>{ch.title}</h2><span className="chapter-count">{photos.length} prints</span></header>
            {ch.blocks.filter(b => b.type === 'text').map((b, j) => b.type === 'text' && <p className="chapter-prose" key={j}>{b.text}</p>)}
            <div className="scrap-photos">
              {photos.map((img, j) => <figure className={`print print-${j % 6}`} style={{ '--span': [5, 3, 4, 3, 3, 3, 3, 4, 5, 3][j % 10] } as React.CSSProperties} key={img.id}>
                <PrintDetails chapter={i} index={j} />
                <Tile img={img} entry={entries.get(img.id)!} eager={i === 0 && j < 3} />
                <figcaption><span>{String(i + 1).padStart(2, '0')} / {String(j + 1).padStart(2, '0')}</span><span className="print-mark">{labels[img.id]?.label}</span></figcaption>
              </figure>)}
            </div>
          </section>
        })}
        <footer className="colophon"><span className="handwritten">{story.title}</span><a href="#top">Back to the first page ↑</a></footer>
      </article>
    </Lightbox>
  )
}

function Tile({ img, entry, eager }: { img: Img; entry: Entry; eager?: boolean }) {
  const [loaded, setLoaded] = React.useState(false)
  const [failed, setFailed] = React.useState(false)
  const ref = React.useRef<HTMLImageElement>(null)
  React.useEffect(() => { if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true) }, [])
  return (
    <LightboxTrigger
      entry={entry}
      render={<a className="tile" href={ORIGIN + img.medium} aria-label={`Open photograph: ${typeof entry.caption === 'string' ? entry.caption : img.id}`} style={{ '--ar': `${img.w} / ${img.h}` } as React.CSSProperties} />}
    >
      <img ref={ref} src={ORIGIN + img.thumb} srcSet={`${ORIGIN + img.thumb} 400w, ${ORIGIN + img.medium} 1200w`} sizes="(max-width: 767px) 85vw, (max-width: 1099px) 40vw, 430px" width={img.w} height={img.h} alt={entry.media.kind === 'image' ? entry.media.alt : ''} loading={eager ? 'eager' : 'lazy'} decoding="async" className={loaded ? 'ld' : undefined} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
      {failed && <span className="image-error">This print couldn’t load.<br />Tap to open the original.</span>}
    </LightboxTrigger>
  )
}
