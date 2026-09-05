import * as React from 'react'
import { Lightbox, LightboxTrigger, type Entry } from '@/registry/base-nova/ui/lightbox'

// The gallery reads as a book: chapters of prose with figures and groups of images
// between the paragraphs. gallery/story.json is generated from gallery-src/story.md
// by scripts/build-story.mjs. Images are served from the original Cloudflare Pages
// origin; medium renditions are 3x the thumbnail.
const ORIGIN = 'https://kek3141.pages.dev'
const SCALE = 3

type Img = { id: string; thumb: string; medium: string; w: number; h: number }
type Block =
  | { type: 'text'; text: string }
  | { type: 'figure'; caption: string; image: Img }
  | { type: 'group'; images: Img[] }
type Chapter = { title: string; blocks: Block[] }
type Story = { title: string; preface: string[]; chapters: Chapter[] }

const kicker = (n: number, title: string) => `${String(n).padStart(2, '0')} · ${title}`

function toEntry(img: Img, caption: React.ReactNode): Entry {
  return {
    id: img.id,
    caption,
    media: {
      kind: 'image',
      alt: typeof caption === 'string' ? caption : '',
      source: { src: ORIGIN + img.thumb, full: ORIGIN + img.medium, width: img.w * SCALE, height: img.h * SCALE, blur: '#101011' },
    },
  }
}

export function App() {
  const [story, setStory] = React.useState<Story | null>(null)
  const [failed, setFailed] = React.useState(false)
  React.useEffect(() => {
    // absolute path: /gallery (no trailing slash) would otherwise resolve a
    // relative fetch to /story.json and get the SPA 404 page.
    fetch('/gallery/story.json')
      .then(r => { if (!r.ok) throw new Error(String(r.status)); return r.json() })
      .then(setStory)
      .catch(() => setFailed(true))
  }, [])

  // One flat list of entries in reading order, so the lightbox walks the book.
  const entries = React.useMemo(() => {
    const out = new Map<string, Entry>()
    story?.chapters.forEach((ch, i) => {
      for (const b of ch.blocks) {
        if (b.type === 'figure') out.set(b.image.id, toEntry(b.image, b.caption || kicker(i + 1, ch.title)))
        if (b.type === 'group') for (const img of b.images) out.set(img.id, toEntry(img, kicker(i + 1, ch.title)))
      }
    })
    return out
  }, [story])

  if (failed) return <div className="loading">could not load the story.</div>
  if (!story) return <div className="loading">Loading&hellip;</div>
  return (
    <Lightbox entries={[...entries.values()]} history loop label="gallery">
      <article className="book">
        {story.preface.length > 0 && (
          <section className="chapter preface">
            {story.preface.map((p, i) => <p key={i} className="ch-p">{p}</p>)}
          </section>
        )}
        {story.chapters.map((ch, i) => (
          <section className="chapter" key={i} id={`ch-${i + 1}`}>
            <h2 className="ch-kicker"><a href={`#ch-${i + 1}`}>{kicker(i + 1, ch.title)}</a></h2>
            {ch.blocks.map((b, j) => {
              if (b.type === 'text') return <p key={j} className="ch-p">{b.text}</p>
              if (b.type === 'figure') return (
                <figure key={j} className="figure">
                  <Tile img={b.image} entry={entries.get(b.image.id)!} />
                  {b.caption && <figcaption>{b.caption}</figcaption>}
                </figure>
              )
              return (
                <div key={j} className="group" data-n={b.images.length} style={{ '--n': Math.min(b.images.length, 3) } as React.CSSProperties}>
                  {b.images.map(img => <Tile key={img.id} img={img} entry={entries.get(img.id)!} square />)}
                </div>
              )
            })}
          </section>
        ))}
        <footer className="colophon">{story.title}</footer>
      </article>
    </Lightbox>
  )
}

function Tile({ img, entry, square }: { img: Img; entry: Entry; square?: boolean }) {
  const [loaded, setLoaded] = React.useState(false)
  const ref = React.useRef<HTMLImageElement>(null)
  React.useEffect(() => { if (ref.current?.complete) setLoaded(true) }, [])
  return (
    <LightboxTrigger
      entry={entry}
      render={<a className="tile" href={ORIGIN + img.medium} aria-label={typeof entry.caption === 'string' ? entry.caption : 'Open image'} style={{ '--ar': square ? '1 / 1' : `${img.w} / ${img.h}` } as React.CSSProperties} />}
    >
      <img ref={ref} src={ORIGIN + img.thumb} alt="" loading="lazy" decoding="async" className={loaded ? 'ld' : undefined} onLoad={() => setLoaded(true)} onError={() => setLoaded(true)} />
    </LightboxTrigger>
  )
}
