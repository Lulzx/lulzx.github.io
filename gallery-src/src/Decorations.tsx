import type { CSSProperties } from 'react'

// Small ink drawings, each tied to its chapter rather than a repeated sticker.
const drawings = [
  'M8 65 39 20 57 48 78 11 115 65M27 38l12-18 10 15M64 32l14-21 14 23M8 72q45-7 108 0',
  'M9 48q13-12 26 0t26 0t26 0t26 0M9 61q13-12 26 0t26 0t26 0t26 0M44 34h38l-8 9H51zM61 9v25M63 12l17 19H63',
  'M27 69V19M11 47l16-28 17 28M13 59l14-28 17 28M75 71V9M52 44 75 9l25 35M51 60l24-37 27 37M8 74q49-9 108 0',
  'M12 64c38 17 7-44 47-32s17 28 43-13M8 61l8 1-4 8M96 15l13-5-2 14M52 9l9 4-9 4z',
  'M8 69h108M16 68V35h23v33M45 68V16h27v52M80 68V28h22v40M23 43h8m-8 9h8M52 26h12m-12 10h12m-12 10h12M87 37h8m-8 11h8',
  'M14 40 60 9l47 31M24 34v36h73V33M46 69V43h23v26M80 44h10v11H80zM31 44h9v11h-9zM16 74h93',
  'M28 27h56v27q-2 18-28 18T28 54zM85 33h12q16 16-13 22M17 74q41 9 79 0M41 19q-8-7 0-15M58 19q-8-7 0-15M74 19q-8-7 0-15',
  'M24 13h77v46H24zM29 18h67v34H29zM24 59 10 72h105l-14-13M50 65h24M42 30l-9 6 9 6m35-12 9 6-9 6M63 27l-8 20',
  'M43 45q18-17 36 0l12 16q1 16-20 10l-11-4-12 4q-23 6-20-10zM27 25c-14-19-23 7-8 14s16-4 8-14M49 14c-8-21-24-4-15 11s19 9 15-11M76 15c8-22 22-4 14 10s-20 10-14-10M98 28c14-19 22 6 9 13s-17-4-9-13',
  'M29 75Q64 50 90 8M48 60Q13 39 34 24q23 3 21 28M62 44Q52 9 72 10q14 17-3 29M74 30q31-9 37 8-5 19-43 4M45 63q27-5 32 11-14 12-32-11',
  'M17 31h90v42H17zM35 31l8-14h29l10 14M48 53a15 15 0 1 0 30 0 15 15 0 1 0-30 0M88 41h10M23 24l6-12m-14 9L7 18',
  'M42 42a21 21 0 1 0 42 0 21 21 0 1 0-42 0M63 8V1M63 76v7M28 42h-9M98 42h9M38 17l-7-7M88 17l7-7M38 67l-7 7M88 67l7 7',
  'M75 8c-26 9-30 42-3 57-36 13-64-32-34-52 10-7 23-9 37-5M95 22v14m-7-7h14M104 51v9m-5-4h10',
]
const notes = ['a little further', 'follow the water', 'take the long path', 'on the way', 'look around', 'through the window', 'a place to pause', 'desk with a view', 'hello, you', 'look closer', 'keep this bit', 'one more before dark', 'after hours']

function Sketch({ chapter }: { chapter: number }) {
  return <svg viewBox="0 0 124 88" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={drawings[chapter % drawings.length]} /></svg>
}

export function AlbumMark() {
  return <div className="album-mark" aria-hidden="true"><svg viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 65c45-67 85 47 127-10s27-42 53-35" strokeDasharray="4 5"/><path d="m172 17 19-5-6 19-4-11z"/><circle cx="12" cy="53" r="5"/></svg><span>little pieces of elsewhere</span></div>
}

export function ChapterKeepsake({ chapter }: { chapter: number }) {
  return <div className={`chapter-keepsake keepsake-${chapter % 3}`} aria-hidden="true">
    {chapter === 6 && <span className="coffee-ring"/>}
    <div className="postage"><span>THE LONG WAY ROUND</span><Sketch chapter={chapter}/><small>from the scrapbook</small></div>
    <svg className="postmark" viewBox="0 0 140 90" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="40" cy="44" r="30"/><circle cx="40" cy="44" r="25"/><path d="M72 26q13-7 29 0t35 0M72 36q13-7 29 0t35 0M72 46q13-7 29 0t35 0M72 56q13-7 29 0t35 0"/><path d="m27 44 9 9 18-21"/></svg>
  </div>
}

export function PrintDetails({ chapter, index }: { chapter: number; index: number }) {
  const position = index % 10
  return <>
    {position === 1 && <span className="margin-note" aria-hidden="true">{Math.floor(index / 10) % 2 ? 'another little piece' : notes[chapter % notes.length]}<svg viewBox="0 0 90 35"><path d="M5 8q40 27 73 8m-10-5 12 4-8 9"/></svg></span>}
    {position === 4 && <span className="pressed-sprig" aria-hidden="true" style={{ '--leaf-turn': `${chapter % 2 ? -22 : 16}deg` } as CSSProperties}><svg viewBox="0 0 65 140"><path className="stem" d="M20 135Q40 65 37 6"/>{[0,1,2,3,4].map(n=><g key={n} transform={`translate(${n%2 ? 3 : 0},${n*23})`}><path className="leaf" d={n%2 ? 'M35 22Q3 3 11 0q27-3 24 22' : 'M37 23Q66 6 56 0q-23 0-19 23'}/><path className="vein" d={n%2 ? 'M35 22 13 2' : 'M37 23 54 3'}/></g>)}</svg></span>}
    {position === 6 && <span className="pencil-stars" aria-hidden="true"><svg viewBox="0 0 65 65" fill="none"><path d="m28 6 5 17 18 2-15 10 5 18-14-11-15 11 5-18L3 25l18-2zM53 4v12m-6-6h12M54 48v10m-5-5h10"/></svg></span>}
    {position === 8 && <span className="paperclip" aria-hidden="true"/>}
    {position === 3 && <><span className="photo-corner corner-top" aria-hidden="true"/><span className="photo-corner corner-bottom" aria-hidden="true"/></>}
  </>
}
