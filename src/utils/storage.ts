import type { Flashcard, CardDifficulty, UnitNumber } from '../types';
import { DEFAULT_FLASHCARDS } from '../data/defaultCards';

const STORAGE_KEY = 'cn_flashcards_data_v3_204';
const SETTINGS_KEY = 'cn_flashcards_settings_v3';

export interface UserSettings {
  soundEnabled: boolean;
  theme: 'dark' | 'light';
  autoFlipOnRating: boolean;
  blurtingMode: boolean; // Active recall prompt before seeing answer
  shuffle: boolean;
}

export const DEFAULT_SETTINGS: UserSettings = {
  soundEnabled: true,
  theme: 'dark',
  autoFlipOnRating: true,
  blurtingMode: false,
  shuffle: false,
};

export const loadFlashcards = (): Flashcard[] => {
  if (typeof window === 'undefined') return DEFAULT_FLASHCARDS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      saveFlashcards(DEFAULT_FLASHCARDS);
      return DEFAULT_FLASHCARDS;
    }
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_FLASHCARDS;
  } catch {
    return DEFAULT_FLASHCARDS;
  }
};

export const saveFlashcards = (cards: Flashcard[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (err) {
    console.error('Failed to save flashcards:', err);
  }
};

export const loadSettings = (): UserSettings => {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings: UserSettings) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings:', err);
  }
};

// Spaced repetition progression calculation
export const updateCardRepetition = (card: Flashcard, rating: CardDifficulty): Flashcard => {
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  let newReps = card.repetitions || 0;
  let intervalDays = 1;

  if (rating === 'again') {
    newReps = 0;
    intervalDays = 0; // immediate review needed
  } else if (rating === 'hard') {
    newReps = Math.max(1, newReps);
    intervalDays = 1;
  } else if (rating === 'good') {
    newReps += 1;
    intervalDays = Math.pow(2, newReps);
  } else if (rating === 'easy') {
    newReps += 2;
    intervalDays = Math.pow(2.5, newReps + 1);
  }

  return {
    ...card,
    difficulty: rating,
    repetitions: newReps,
    lastReviewed: now,
    nextReview: now + intervalDays * ONE_DAY,
  };
};

/**
 * Intelligent parser supporting:
 * 1) Raw JSON Array
 * 2) Plain text Q&A:
 *    Q: Question here
 *    A: Answer here
 *    Unit: 1 (optional)
 *    Topic: Topic (optional)
 * 3) Delimited format:
 *    Question ::: Answer ::: Unit(1-5) ::: Topic
 */
export const parseImportText = (rawText: string): Flashcard[] => {
  const trimmed = rawText.trim();
  if (!trimmed) return [];

  // Try JSON first
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((item, idx) => ({
          id: item.id || `custom-${Date.now()}-${idx}`,
          unit: (Number(item.unit) >= 1 && Number(item.unit) <= 5 ? Number(item.unit) : 1) as UnitNumber,
          unitTitle: item.unitTitle || `Unit ${item.unit || 1}`,
          topic: item.topic || 'General',
          question: String(item.question || item.q || '').trim(),
          answer: String(item.answer || item.a || '').trim(),
          keyPoints: Array.isArray(item.keyPoints) ? item.keyPoints : undefined,
          mnemonic: item.mnemonic || undefined,
          formula: item.formula || undefined,
          tags: Array.isArray(item.tags) ? item.tags : undefined,
          difficulty: 'new' as CardDifficulty,
          repetitions: 0,
        })).filter(c => c.question && c.answer);
      }
    } catch {
      // fallback to text parse
    }
  }

  const results: Flashcard[] = [];

  // Check if delimited with :::
  if (trimmed.includes(':::')) {
    const lines = trimmed.split('\n');
    lines.forEach((line, idx) => {
      const parts = line.split(':::').map(s => s.trim());
      if (parts.length >= 2 && parts[0] && parts[1]) {
        const uNum = (parts[2] ? parseInt(parts[2], 10) : 1) as UnitNumber;
        const validUnit: UnitNumber = (uNum >= 1 && uNum <= 5 ? uNum : 1);
        results.push({
          id: `custom-${Date.now()}-${idx}`,
          unit: validUnit,
          unitTitle: `Unit ${validUnit}`,
          topic: parts[3] || 'General',
          question: parts[0],
          answer: parts[1],
          difficulty: 'new',
          repetitions: 0,
          tags: parts[3] ? [parts[3]] : [],
        });
      }
    });
    if (results.length > 0) return results;
  }

  // Check Q: and A: block format
  const blocks = trimmed.split(/(?=^Q\s*[:\-])/gim);
  blocks.forEach((block, idx) => {
    const qMatch = block.match(/(?:^|\n)Q\s*[:\-]\s*([\s\S]*?)(?=(?:\n[AUau]\s*[:\-]|$))/i);
    const aMatch = block.match(/(?:^|\n)A\s*[:\-]\s*([\s\S]*?)(?=(?:\n(?:Q|Unit|Topic)\s*[:\-]|$))/i);
    const unitMatch = block.match(/(?:^|\n)Unit\s*[:\-]\s*([1-5])/i);
    const topicMatch = block.match(/(?:^|\n)Topic\s*[:\-]\s*([^\n]+)/i);

    if (qMatch && aMatch) {
      const q = qMatch[1].trim();
      const a = aMatch[1].trim();
      const uNum = unitMatch ? parseInt(unitMatch[1], 10) as UnitNumber : 1;
      const topic = topicMatch ? topicMatch[1].trim() : 'Computer Networks';

      if (q && a) {
        results.push({
          id: `custom-${Date.now()}-${idx}`,
          unit: uNum,
          unitTitle: `Unit ${uNum}`,
          topic,
          question: q,
          answer: a,
          difficulty: 'new',
          repetitions: 0,
          tags: [topic],
        });
      }
    }
  });

  return results;
};
