// Caption every gallery image with a small local vision model (ollama, qwen3-vl:2b).
// Resumable: writes gallery/captions.json after each image, keyed by image id.
//   node scripts/caption-gallery.mjs [--model qwen3-vl:2b]
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const ORIGIN = 'https://kek3141.pages.dev'
const MODEL = process.argv.includes('--model') ? process.argv[process.argv.indexOf('--model') + 1] : 'hf.co/LiquidAI/LFM2.5-VL-450M-GGUF'
const OUT = new URL('../gallery/captions.json', import.meta.url)
const images = JSON.parse(readFileSync(new URL('../gallery/images.json', import.meta.url), 'utf8'))
const captions = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {}

const PROMPT = `Describe this photograph for a caption writer. Be concrete and literal: what is in the frame, the setting, light, colours, time of day, weather, any people (never guess identities), animals, food, objects, text visible. Two or three plain sentences. Then classify it.`
const schema = {
  type: 'object',
  properties: {
    description: { type: 'string' },
    subject: { type: 'string', description: 'one or two words: the main subject' },
    setting: { type: 'string', enum: ['indoor', 'outdoor', 'street', 'nature', 'water', 'mountain', 'city', 'home', 'restaurant', 'vehicle', 'sky', 'other'] },
    time: { type: 'string', enum: ['day', 'golden hour', 'night', 'dawn', 'dusk', 'unknown'] },
    mood: { type: 'string', description: 'one word' },
    tags: { type: 'array', items: { type: 'string' }, minItems: 3, maxItems: 6 },
    people: { type: 'integer' },
  },
  required: ['description', 'subject', 'setting', 'time', 'mood', 'tags', 'people'],
}

const idOf = img => img.medium.split('/').pop().replace(/\.\w+$/, '')
let done = 0, t0 = Date.now()
for (const img of images) {
  const id = idOf(img)
  if (captions[id]) continue
  const bytes = Buffer.from(await (await fetch(ORIGIN + img.medium)).arrayBuffer())
  const res = await fetch('http://127.0.0.1:11434/api/generate', {
    method: 'POST',
    body: JSON.stringify({ model: MODEL, prompt: PROMPT, images: [bytes.toString('base64')], stream: false, format: schema, keep_alive: '30m', options: { temperature: 0.2, num_predict: 400 } }),
  })
  if (!res.ok) { console.error(id, res.status, await res.text()); continue }
  const { response } = await res.json()
  try { captions[id] = { month: img.medium.split('/')[2], ...JSON.parse(response) } }
  catch { console.error(id, 'bad json', response.slice(0, 120)); continue }
  writeFileSync(OUT, JSON.stringify(captions, null, 1))
  done++
  const left = images.length - Object.keys(captions).length
  console.log(`${Object.keys(captions).length}/${images.length}  ${(Date.now() - t0) / done / 1000 | 0}s/img  ~${(left * (Date.now() - t0) / done / 60000) | 0}m left  ${captions[id].subject}`)
}
console.log('done')
