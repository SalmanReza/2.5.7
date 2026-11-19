/* Qiyam al-Layl is the voluntary night prayer from Isha until Fajr.
   Tahajjud and Witr are kinds of it. The reverse is not true:
   night prayer before sleep is not Tahajjud, and an even pair is not Witr.
   Recording one never fills the others — a part is not the whole night. */

export const QIYAM_KEY = 'qiyam';
export const QIYAM_PART_KEYS = Object.freeze(['tahajjud', 'witr']);
export const NIGHT_KEYS = Object.freeze(['qiyam', 'tahajjud', 'witr']);

export function isNightKey(key) {
  return NIGHT_KEYS.includes(key);
}

export function isQiyamPart(key) {
  return key === 'tahajjud' || key === 'witr';
}

/** True when `part` is the same prayer as `whole`, or a named kind of Qiyam. */
export function isKindOf(part, whole) {
  if (part === whole) return true;
  return whole === QIYAM_KEY && isQiyamPart(part);
}

/** A tick on one night prayer never completes another. */
export function recordImplies(from, to) {
  return from === to;
}

export function nightRelation(language = 'en') {
  if (language === 'bn') {
    return 'বিতর ও তাহাজ্জুদ দুটোই কিয়ামুল লাইল। কিয়ামুল লাইল রাতের নফল সালাত, তাই তা শুধু বিতর বা তাহাজ্জুদ নয়। একটি রেকর্ড করলে অন্যটি হয় না।';
  }
  return 'Witr and Tahajjud are both Qiyam al-Layl. Qiyam al-Layl is the night prayer, so it is not only Witr or Tahajjud. Recording one does not record the others.';
}

export function partKicker(key, language = 'en') {
  const bn = language === 'bn';
  if (key === 'tahajjud') return bn ? 'কিয়ামের অংশ · ঘুমের পর' : 'PART OF QIYAM · AFTER SLEEP';
  if (key === 'witr') return bn ? 'কিয়ামের অংশ · বিজোড় সমাপ্তি' : 'PART OF QIYAM · ODD CLOSE';
  return bn ? 'রাতের সালাত · শুধু এই দুটি নয়' : 'THE NIGHT PRAYER · NOT ONLY THESE';
}
