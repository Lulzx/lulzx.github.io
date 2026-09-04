import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';
const read = p => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const index = read('index.html');
test('every project has a distinct illustration independent of colour', () => {
  const source = index.slice(index.indexOf('const PROJECT_LINES ='), index.indexOf('const About ='));
  const { items, count } = vm.runInNewContext(source + '; ({items: ProjectsIndex.data().groups.flatMap(g => g.items), count: PROJECT_LINES.length})');
  assert.equal(items.length, count);
  const drawings = new Map();
  for (const p of items) {
    const drawing = p.drawing.replace(/#[a-f0-9]{6}/gi, 'COLOR');
    assert.ok(!drawings.has(drawing), `${p.name} repeats ${drawings.get(drawing)}`);
    drawings.set(drawing, p.name);
  }
});
test('home navigation points to the root', () => {
  assert.match(index, /to: '\/', label: 'home'/);
  assert.match(index, /<router-link to="\/">home<\/router-link>/);
  assert.doesNotMatch(index, /(?:href|to)="\/landing"/);
});
test('static pages and SPA share the cabinet style', () => {
  assert.equal(index.match(/<style id="cabinet-shared">\n([\s\S]*?)<\/style>/)[1], read('assets/cabinet.css'));
  for (const dir of ['words', 'learn']) {
    for (const name of readdirSync(new URL('../' + dir, import.meta.url)).filter(n => n.endsWith('.html') && n !== 'index.html')) {
      assert.ok(read(`${dir}/${name}`).includes('href="/assets/cabinet.css"'), `${dir}/${name}`);
    }
  }
  for (const dir of ['about','contact','privacy','developers','gallery']) assert.ok(read(`${dir}/index.html`).includes('href="/assets/cabinet.css"'), dir);
});
