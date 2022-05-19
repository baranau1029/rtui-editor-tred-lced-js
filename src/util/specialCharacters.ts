const tildeShortcuts = {
  'a/~': 'ã',
  'A/~': 'Ã',
  'e/~': 'ẽ',
  'E/~': 'Ẽ',
  'i/~': 'ĩ',
  'I/~': 'Ĩ',
  'n/~': 'ñ',
  'N/~': 'Ñ',
  'o/~': 'õ',
  'O/~': 'Õ',
  'u/~': 'ũ',
  'U/~': 'Ũ',
  'ɛ/~': 'ɛ̃',
  'Ɛ/~': 'Ɛ̃',
  'ɔ/~': 'ɔ̃',
  'Ɔ/~': 'Ɔ̃',
};

const uMalautShortcuts = {
  'a/:': 'ä',
  'A/:': 'Ä',
  'e/:': 'ë',
  'E/:': 'Ë',
  'i/:': 'ï',
  'I/:': 'Ï',
  'o/:': 'ö',
  'O/:': 'Ö',
  'u/:': 'ü',
  'U/:': 'Ü',
};

const graveShortcuts = {
  'a/`': 'à',
  'A/`': 'À',
  'e/`': 'è',
  'E/`': 'È',
  'i/`': 'ì',
  'I/`': 'Ì',
  'o/`': 'ò',
  'O/`': 'Ò',
  'u/`': 'ù',
  'U/`': 'Ù',
};
const accuteShortcuts = {
  "a/'": 'á',
  "A/'": 'Á',
  "e/'": 'é',
  "E/'": 'É',
  "i/'": 'í',
  "I/'": 'Í',
  "n/'": 'ń',
  "N/'": 'Ń',
  "o/'": 'ó',
  "O/'": 'Ó',
  "u/'": 'ú',
  "U/'": 'Ú',
};

const circumFlexShortcuts = {
  'a/^': 'â',
  'A/^': 'Â',
  'e/^': 'ê',
  'E/^': 'Ê',
  'i/^': 'î',
  'I/^': 'Î',
  'n/^': 'ń',
  'N/^': 'Ń',
  'o/^': 'ô',
  'O/^': 'Ô',
  'u/^': 'û',
  'U/^': 'Û',
};

const cedilaShortcuts = {
  'c/,': 'ç',
  'C/,': 'Ç',
};

const dotAboveShortcuts = {
  'e/.': 'ė',
  'E/.': 'Ė',
};

const legiatureShortcuts = {
  'o/e': 'œ',
  'O/E': 'Œ',
};
const emDashShortcuts = {
  '--': '—',
  '...': '…',
};
const caronShortcuts = {
  's/>': 'š',
  'S/>': 'Š',
};
const macronShortcuts = {
  'a/-': 'ā',
  'A/-': 'Ā',
  'e/-': 'ē',
  'E/-': 'Ē',
  'i/-': 'ī',
  'I/-': 'Ĩ',
  'o/-': 'ō',
  'O/-': 'Ō',
  'u/-': 'ū',
  'U/-': 'Ū',
};

const apostropheShortcuts = {
  "/'": '’',
};

const commonShortcuts = {
  'E/E': 'Ɛ',
  'e/e': 'ɛ',
  'F/F': 'Ƒ',
  'f/f': 'ƒ',
  'n/j': 'ŋ',
  'N/J': 'Ŋ',
  'o/c': 'ɔ',
  'O/C': 'Ɔ',
  'd/q': 'ɖ',
  'D/Q': 'Ɖ',
  'v/y': 'ɣ',
  'V/Y': 'Ɣ',
  'v/u': 'ʋ',
  'V/U': 'Ʋ',
};

const allAccentsCharacters: any = {
  ...tildeShortcuts,
  ...uMalautShortcuts,
  ...graveShortcuts,
  ...accuteShortcuts,
  ...circumFlexShortcuts,
  ...cedilaShortcuts,
  ...dotAboveShortcuts,
  ...legiatureShortcuts,
  ...emDashShortcuts,
  ...caronShortcuts,
  ...macronShortcuts,
  ...apostropheShortcuts,
  ...commonShortcuts,
};
export default allAccentsCharacters;
