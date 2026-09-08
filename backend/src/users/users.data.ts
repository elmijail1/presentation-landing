import { MUser } from './models/user.model.js';

export const usersData: MUser[] = [
  { id: '1', name: 'Grumpy Owner', registeredOn: new Date(2026, 8, 8) },
  { id: '2', name: 'Crazy Hamburger', registeredOn: new Date(2026, 8, 8) },
];

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
