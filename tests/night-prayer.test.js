import test from 'node:test';
import assert from 'node:assert/strict';
import { isKindOf, isNightKey, isQiyamPart, recordImplies, nightRelation } from '../src/night-prayer.js';
import { buildTimeline } from '../src/day-timeline.js';
import { activeIntervals } from '../src/interval-rows.js';

test('Witr and Tahajjud are Qiyam, and Qiyam is not only those two', () => {
  assert.equal(isKindOf('witr', 'qiyam'), true);
  assert.equal(isKindOf('tahajjud', 'qiyam'), true);
  assert.equal(isKindOf('qiyam', 'witr'), false);
  assert.equal(isKindOf('qiyam', 'tahajjud'), false);
  assert.equal(isKindOf('witr', 'tahajjud'), false);
  assert.equal(isKindOf('tahajjud', 'witr'), false);
  assert.equal(isQiyamPart('witr'), true);
  assert.equal(isNightKey('qiyam'), true);
  assert.equal(isNightKey('duha'), false);
});

test('recording one night prayer does not record another', () => {
  for (const from of ['qiyam', 'tahajjud', 'witr']) {
    for (const to of ['qiyam', 'tahajjud', 'witr']) {
      assert.equal(recordImplies(from, to), from === to);
    }
  }
});

test('Witr and Tahajjud are not their own next event', () => {
  const at = Date.parse('2026-11-19T18:30:00Z');
  const later = at + 3 * 3600000;
  const timeline = buildTimeline([{
    fard: [{ key: 'isha', start: at }],
    voluntary: [
      { key: 'qiyam', start: at },
      { key: 'witr', start: at },
      { key: 'tahajjud', start: later }
    ]
  }]);
  assert.deepEqual(timeline.map(item => item.key), ['isha']);
});

test('a prohibited interval end is a number, and the countdown uses that number', () => {
  const start = Date.parse('2026-11-19T05:38:00Z');
  const end = Date.parse('2026-11-19T05:50:00Z');
  const now = start + 60 * 1000;
  const paused = activeIntervals([{ key: 'zawal', start, end }], now)[0];
  assert.equal(typeof paused.end, 'number');
  assert.equal(typeof paused.end.getTime, 'undefined');
  const until = paused.end;
  assert.equal(until - now, 11 * 60 * 1000);
});

test('the relation is stated in both languages', () => {
  assert.match(nightRelation('en'), /not only Witr or Tahajjud/);
  assert.match(nightRelation('bn'), /কিয়ামুল লাইল/);
  assert.doesNotMatch(nightRelation('bn'), /[0-9]/);
});
