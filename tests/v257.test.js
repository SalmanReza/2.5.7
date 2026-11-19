import test from 'node:test';
import assert from 'node:assert/strict';
import { APP_VERSION } from '../src/branding.js';
import { readText } from './helpers/read-text.js';

const app = readText('../src/app.js', import.meta.url);
const css = readText('../src/styles.css', import.meta.url);

test('v2.5.7 keeps the prohibited countdown moving and groups the night prayer', () => {
  assert.equal(APP_VERSION, '2.5.7');
  assert.match(app, /function atMs\(value\)/);
  assert.doesNotMatch(app, /paused\.end\.getTime/);
  assert.match(app, /atMs\(paused\.end\)/);
  assert.match(app, /Remaining in this prohibited time/);
  assert.match(app, /clock-pane clock-main/);
  assert.match(app, /nightFamilyLiveHtml/);
  assert.match(app, /nightVoluntaryHtml/);
  assert.match(css, /body \.clock-pane \{/);
  assert.match(css, /body \.night-family \{/);
  assert.match(css, /border-radius: var\(--radius\)/);
});
