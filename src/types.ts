export type UnitNumber = 1 | 2 | 3 | 4 | 5;

export type CardDifficulty = 'new' | 'again' | 'hard' | 'good' | 'easy';

export interface Flashcard {
  id: string;
  unit: UnitNumber;
  unitTitle: string;
  topic: string;
  question: string;
  answer: string;
  keyPoints?: string[];
  mnemonic?: string;
  formula?: string;
  tags?: string[];
  // Memorization metadata
  difficulty: CardDifficulty;
  repetitions: number;
  lastReviewed?: number; // timestamp
  nextReview?: number; // timestamp
  isStarred?: boolean;
}

export type ViewMode = 'study' | 'quiz' | 'sheet' | 'stats';

export interface FilterState {
  unit: 'all' | UnitNumber;
  status: 'all' | 'unlearned' | 'learning' | 'mastered' | 'starred';
  searchQuery: string;
}

export interface QuizQuestionState {
  card: Flashcard;
  userSelfRating?: 'correct' | 'incorrect' | 'skipped';
  timeSpentSeconds: number;
}
