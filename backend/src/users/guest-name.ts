const ADJECTIVES = [
  'Pink',
  'Red',
  'Purple',
  'Golden',
  'Silent',
  'Curious',
  'Swift',
  'Lucky',
];
const NOUNS = [
  'Elephant',
  'Apple',
  'Bandicoot',
  'Falcon',
  'Otter',
  'Comet',
  'Maple',
  'Panther',
];
export function generateGuestName(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adjective} ${noun}`;
}
