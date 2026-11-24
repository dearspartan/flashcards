import type { Flashcard } from '../types';
import { AI_UNIT_1_CARDS } from './aiUnit1';
import { AI_UNIT_2_CARDS } from './aiUnit2';
import { AI_UNIT_3_CARDS } from './aiUnit3';
import { AI_UNIT_4_CARDS } from './aiUnit4';
import { AI_UNIT_5_CARDS } from './aiUnit5';

export const DEFAULT_AI_FLASHCARDS: Flashcard[] = [
  ...AI_UNIT_1_CARDS,
  ...AI_UNIT_2_CARDS,
  ...AI_UNIT_3_CARDS,
  ...AI_UNIT_4_CARDS,
  ...AI_UNIT_5_CARDS,
];
