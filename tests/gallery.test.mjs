import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
test('scrapbook places every original photograph exactly once, with accessible descriptions', () => {
  const manifest = JSON.parse(read('gallery/images.json'));
  const story = JSON.parse(read('gallery/story.json'));
  const labels = JSON.parse(read('gallery/labels.json'));
  const placed = story.chapters.flatMap(ch => ch.blocks.flatMap(b => b.type === 'figure' ? [b.image] : b.type === 'group' ? b.images : []));
  assert.equal(placed.length, manifest.length);
  assert.equal(new Set(placed.map(img => img.id)).size, manifest.length);
  assert.deepEqual(placed.map(img => img.medium).sort(), manifest.map(img => img.medium).sort());
  for (const img of placed) assert.ok(labels[img.id]?.alt.length > 10, img.id);
  assert.doesNotMatch(read('gallery-src/story.md'), /\bthe walker\b|made-up story/i);
});
