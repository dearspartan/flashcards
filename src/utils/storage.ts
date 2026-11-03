import type { Flashcard, CardDifficulty, UnitNumber, Deck, DailyProgress } from '../types';
import { DEFAULT_FLASHCARDS } from '../data/defaultCards';

const STORAGE_KEY = 'cn_flashcards_data_v3_204';
const SETTINGS_KEY = 'cn_flashcards_settings_v3';
const DECKS_KEY = 'cn_flashcards_decks_v3';
const PROGRESS_KEY = 'cn_flashcards_progress_v3';

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
    if (Array.isArray(parsed) && parsed.length >= 200) {
      return parsed;
    }
    // Auto-update to full 204 if previous version was partial
    saveFlashcards(DEFAULT_FLASHCARDS);
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

// ================= DECK MANAGEMENT =================

export const getDefaultDecks = (cards: Flashcard[]): Deck[] => {
  const getIdsByUnit = (u: UnitNumber) => cards.filter((c) => c.unit === u).map((c) => c.id);

  return [
    {
      id: 'deck-all',
      name: 'Full CN Viva Master Deck',
      description: 'Comprehensive deck of all 204 Computer Networks viva questions across all 5 units.',
      unit: 'all',
      cardIds: cards.map((c) => c.id),
      folder: 'Computer Networks',
      color: '#6366f1',
      createdAt: 1700000000000,
    },
    {
      id: 'deck-u1',
      name: 'Unit 1: Physical Layer & Topologies',
      description: 'OSI vs TCP/IP models, transmission media, switching, cabling, and network topologies.',
      unit: 1,
      cardIds: getIdsByUnit(1),
      folder: 'Unit-Wise Decks',
      color: '#3b82f6',
      createdAt: 1700000000001,
    },
    {
      id: 'deck-u2',
      name: 'Unit 2: Data Link Layer & MAC',
      description: 'Framing, CRC error detection, Hamming code, Wireshark, Go-Back-N, and Selective Repeat.',
      unit: 2,
      cardIds: getIdsByUnit(2),
      folder: 'Unit-Wise Decks',
      color: '#10b981',
      createdAt: 1700000000002,
    },
    {
      id: 'deck-u3',
      name: 'Unit 3: Network Layer & Routing',
      description: 'IPv4/IPv6, Subnetting & CIDR, Dijkstra, Bellman-Ford, OSPF, RIP, BGP, ARP, and ICMP.',
      unit: 3,
      cardIds: getIdsByUnit(3),
      folder: 'Unit-Wise Decks',
      color: '#f59e0b',
      createdAt: 1700000000003,
    },
    {
      id: 'deck-u4',
      name: 'Unit 4: Transport Layer & Congestion',
      description: 'TCP vs UDP, 3-way handshake, socket programming, port numbers, flags, and latency.',
      unit: 4,
      cardIds: getIdsByUnit(4),
      folder: 'Unit-Wise Decks',
      color: '#ec4899',
      createdAt: 1700000000004,
    },
    {
      id: 'deck-u5',
      name: 'Unit 5: Application Layer & Security',
      description: 'DNS, HTTP/HTTPS, FTP, SMTP/IMAP, DHCP (DORA), Cryptography, TLS/SSL, and IPsec (AH/ESP).',
      unit: 5,
      cardIds: getIdsByUnit(5),
      folder: 'Unit-Wise Decks',
      color: '#8b5cf6',
      createdAt: 1700000000005,
    },
  ];
};

export const loadDecks = (cards: Flashcard[]): Deck[] => {
  if (typeof window === 'undefined') return getDefaultDecks(cards);
  try {
    const saved = localStorage.getItem(DECKS_KEY);
    if (!saved) {
      const defaults = getDefaultDecks(cards);
      saveDecks(defaults);
      return defaults;
    }
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return getDefaultDecks(cards);
  } catch {
    return getDefaultDecks(cards);
  }
};

export const saveDecks = (decks: Deck[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
  } catch (err) {
    console.error('Failed to save decks:', err);
  }
};

// ================= PROGRESS & STREAK TRACKING =================

export const getTodayDateString = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const loadDailyProgress = (): DailyProgress => {
  const today = getTodayDateString();
  const defaultProgress: DailyProgress = {
    streak: 1,
    lastStudiedDate: today,
    cardsStudiedToday: 0,
    dailyGoal: 20,
    totalReviewedAllTime: 0,
  };

  if (typeof window === 'undefined') return defaultProgress;

  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (!saved) {
      saveDailyProgress(defaultProgress);
      return defaultProgress;
    }
    const parsed: DailyProgress = JSON.parse(saved);

    // Check if new day
    if (parsed.lastStudiedDate !== today) {
      const last = new Date(parsed.lastStudiedDate);
      const curr = new Date(today);
      const diffDays = Math.round((curr.getTime() - last.getTime()) / (1000 * 3600 * 24));

      let newStreak = parsed.streak;
      if (diffDays === 1) {
        // Consecutive day - streak continues!
      } else if (diffDays > 1) {
        // Streak broken
        newStreak = 1;
      }

      const updated: DailyProgress = {
        ...parsed,
        lastStudiedDate: today,
        cardsStudiedToday: 0,
        streak: newStreak,
      };
      saveDailyProgress(updated);
      return updated;
    }

    return parsed;
  } catch {
    return defaultProgress;
  }
};

export const saveDailyProgress = (progress: DailyProgress) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save daily progress:', err);
  }
};

export const recordStudySession = (): DailyProgress => {
  const current = loadDailyProgress();
  const updated: DailyProgress = {
    ...current,
    cardsStudiedToday: current.cardsStudiedToday + 1,
    totalReviewedAllTime: (current.totalReviewedAllTime || 0) + 1,
  };
  saveDailyProgress(updated);
  return updated;
};

// ================= REPETITION & LEITNER =================

export const updateCardRepetition = (card: Flashcard, rating: CardDifficulty): Flashcard => {
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  let newReps = card.repetitions || 0;
  let intervalDays = 1;
  let isKnown = card.isKnown;

  if (rating === 'again') {
    newReps = 0;
    intervalDays = 0;
    isKnown = false;
  } else if (rating === 'hard') {
    newReps = Math.max(1, newReps);
    intervalDays = 1;
    isKnown = false;
  } else if (rating === 'good') {
    newReps += 1;
    intervalDays = Math.pow(2, newReps);
    isKnown = true;
  } else if (rating === 'easy') {
    newReps += 2;
    intervalDays = Math.pow(2.5, newReps + 1);
    isKnown = true;
  }

  return {
    ...card,
    difficulty: rating,
    repetitions: newReps,
    lastReviewed: now,
    nextReview: now + intervalDays * ONE_DAY,
    isKnown,
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
          diagram: item.diagram || undefined,
          tags: Array.isArray(item.tags) ? item.tags : undefined,
          difficulty: 'new' as CardDifficulty,
          repetitions: 0,
        })).filter((c) => c.question && c.answer);
      }
    } catch {
      // fallback to text parse
    }
  }

  const results: Flashcard[] = [];

  if (trimmed.includes(':::')) {
    const lines = trimmed.split('\n');
    lines.forEach((line, idx) => {
      const parts = line.split(':::').map((s) => s.trim());
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
          difficulty: 'new' as CardDifficulty,
          repetitions: 0,
          tags: parts[3] ? [parts[3]] : [],
        });
      }
    });
    if (results.length > 0) return results;
  }

  const blocks = trimmed.split(/(?=^Q\s*[:\-])/gim);
  blocks.forEach((block, idx) => {
    const qMatch = block.match(/(?:^|\n)Q\s*[:\-]\s*([\s\S]*?)(?=(?:\n[AUau]\s*[:\-]|$))/i);
    const aMatch = block.match(/(?:^|\n)A\s*[:\-]\s*([\s\S]*?)(?=(?:\n(?:Q|Unit|Topic)\s*[:\-]|$))/i);
    const unitMatch = block.match(/(?:^|\n)Unit\s*[:\-]\s*([1-5])/i);
    const topicMatch = block.match(/(?:^|\n)Topic\s*[:\-]\s*([^\n]+)/i);

    if (qMatch && aMatch) {
      const q = qMatch[1].trim();
      const a = aMatch[1].trim();
      const uNum = unitMatch ? (parseInt(unitMatch[1], 10) as UnitNumber) : 1;
      const topic = topicMatch ? topicMatch[1].trim() : 'Computer Networks';

      if (q && a) {
        results.push({
          id: `custom-${Date.now()}-${idx}`,
          unit: uNum,
          unitTitle: `Unit ${uNum}`,
          topic,
          question: q,
          answer: a,
          difficulty: 'new' as CardDifficulty,
          repetitions: 0,
          tags: [topic],
        });
      }
    }
  });

  return results;
};
