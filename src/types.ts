export type SubjectId = 'cn' | 'ai';

export interface SubjectConfig {
  id: SubjectId;
  name: string;
  shortName: string;
  code: string;
  subtitle: string;
  badge: string;
  totalCards: number;
  unitNames: Record<number, string>;
  unitDetails: Record<number, { title: string; desc: string }>;
}

export type UnitNumber = 1 | 2 | 3 | 4 | 5;

export type CardDifficulty = 'new' | 'again' | 'hard' | 'good' | 'easy';

export interface Flashcard {
  id: string;
  subject?: SubjectId;
  unit: UnitNumber;
  unitTitle: string;
  topic: string;
  question: string;
  answer: string;
  keyPoints?: string[];
  mnemonic?: string;
  formula?: string;
  diagram?: string;
  diagramTitle?: string;
  tags?: string[];
  // Memorization metadata
  difficulty: CardDifficulty;
  repetitions: number;
  lastReviewed?: number; // timestamp
  nextReview?: number; // timestamp
  isStarred?: boolean;
  isKnown?: boolean; // Mark as Known vs Unknown
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  unit?: UnitNumber | 'all';
  cardIds: string[];
  folder?: string;
  color?: string;
  createdAt: number;
}

export interface DailyProgress {
  streak: number;
  lastStudiedDate: string; // YYYY-MM-DD
  cardsStudiedToday: number;
  dailyGoal: number; // e.g. 20
  totalReviewedAllTime: number;
}

export type ViewMode = 'study' | 'decks' | 'mcq' | 'quiz' | 'sheet' | 'stats';

export interface FilterState {
  deckId: string;
  unit: 'all' | UnitNumber;
  status: 'all' | 'unknown' | 'known' | 'unlearned' | 'learning' | 'mastered' | 'starred';
  searchQuery: string;
}

export interface QuizQuestionState {
  card: Flashcard;
  userSelfRating?: 'correct' | 'incorrect' | 'skipped';
  timeSpentSeconds: number;
}
