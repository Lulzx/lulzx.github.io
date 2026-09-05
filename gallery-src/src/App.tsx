import * as React from 'react'
import { Lightbox, LightboxTrigger, type Entry } from '@/registry/base-nova/ui/lightbox'

// Images are served from the original Cloudflare Pages origin; the local manifest
// carries each thumbnail's dimensions so tiles reserve their exact height up front.
// Medium renditions are 3x the thumbnail.
const ORIGIN = 'https://kek3141.pages.dev'
const SCALE = 3
type Item = { thumb: string; medium: string; w?: number; h?: number }

function toEntry(img: Item, i: number): Entry {
  const w = img.w ?? 400
  const h = img.h ?? 400
  const id = img.medium.split('/').pop()!.replace(/\.\w+$/, '')
  return {
    id,
    media: {
      kind: 'image',
      alt: `photo ${i + 1}`,
      source: { src: ORIGIN + img.thumb, full: ORIGIN + img.medium, width: w * SCALE, height: h * SCALE, blur: '#101011' },
    },
  }
}

export function App() {
  const [items, setItems] = React.useState<Item[] | null>(null)
  const [failed, setFailed] = React.useState(false)
  React.useEffect(() => {
    // absolute path: /gallery (no trailing slash) would otherwise resolve a
    // relative fetch to /images.json and get the SPA 404 page.
    fetch('/gallery/images.json')
      .then(r => { if (!r.ok) throw new Error(String(r.status)); return r.json() })
      .then(setItems)
      .catch(() => setFailed(true))
  }, [])
  const entries = React.useMemo(() => (items ?? []).map(toEntry), [items])

  if (failed) return <div className="loading">could not load images.</div>
  if (!items) return <div className="loading">Loading images&hellip;</div>
  return (
    <Lightbox entries={entries} history loop label="gallery">
      <div className="grid">
        {entries.map((entry, i) => {
          const img = items[i]
          return (
            <LightboxTrigger
              key={entry.id}
              entry={entry}
              render={<a className="grid-item" href={entry.media.kind === 'image' ? entry.media.source.full : '#'} aria-label={`Open photo ${i + 1} of ${items.length}`} style={img.w && img.h ? ({ '--ar': `${img.w} / ${img.h}` } as React.CSSProperties) : undefined} />}
            >
              <Thumb src={ORIGIN + img.thumb} />
            </LightboxTrigger>
          )
        })}
      </div>
    </Lightbox>
  )
}

function Thumb({ src }: { src: string }) {
  const [loaded, setLoaded] = React.useState(false)
  const ref = React.useRef<HTMLImageElement>(null)
  React.useEffect(() => { if (ref.current?.complete) setLoaded(true) }, [])
  return <img ref={ref} src={src} alt="" loading="lazy" decoding="async" className={loaded ? 'ld' : undefined} onLoad={() => setLoaded(true)} onError={() => setLoaded(true)} />
}
