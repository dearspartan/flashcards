import type { Flashcard, CardDifficulty, UnitNumber, Deck, DailyProgress, SubjectId } from '../types';
import { DEFAULT_FLASHCARDS } from '../data/defaultCards';
import { DEFAULT_AI_FLASHCARDS } from '../data/aiCards';
import { SUBJECTS } from '../data/subjects';

const CURRENT_SUBJECT_KEY = 'flashcards_active_subject_v1';
const STORAGE_KEY_CN = 'cn_flashcards_data_v3_204';
const STORAGE_KEY_AI = 'ai_flashcards_data_v1_250';
const SETTINGS_KEY = 'cn_flashcards_settings_v3';
const DECKS_KEY_CN = 'cn_flashcards_decks_v3';
const DECKS_KEY_AI = 'ai_flashcards_decks_v1';
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

// ================= SUBJECT MANAGEMENT =================

export const loadSelectedSubject = (): SubjectId => {
  if (typeof window === 'undefined') return 'cn';
  try {
    const saved = localStorage.getItem(CURRENT_SUBJECT_KEY);
    if (saved === 'ai' || saved === 'cn') return saved;
    return 'cn';
  } catch {
    return 'cn';
  }
};

export const saveSelectedSubject = (subject: SubjectId) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CURRENT_SUBJECT_KEY, subject);
  } catch (err) {
    console.error('Failed to save selected subject:', err);
  }
};

// ================= FLASHCARDS STORAGE =================

export const loadFlashcards = (subject: SubjectId = 'cn'): Flashcard[] => {
  if (typeof window === 'undefined') {
    return subject === 'ai' ? DEFAULT_AI_FLASHCARDS : DEFAULT_FLASHCARDS;
  }

  const key = subject === 'ai' ? STORAGE_KEY_AI : STORAGE_KEY_CN;
  const defaultList = subject === 'ai' ? DEFAULT_AI_FLASHCARDS : DEFAULT_FLASHCARDS;
  const minExpected = subject === 'ai' ? 240 : 200;

  try {
    const saved = localStorage.getItem(key);
    if (!saved) {
      saveFlashcards(defaultList, subject);
      return defaultList;
    }
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length >= minExpected) {
      return parsed;
    }
    // Auto-update to full master list if previous version was partial
    saveFlashcards(defaultList, subject);
    return defaultList;
  } catch {
    return defaultList;
  }
};

export const saveFlashcards = (cards: Flashcard[], subject: SubjectId = 'cn') => {
  if (typeof window === 'undefined') return;
  const key = subject === 'ai' ? STORAGE_KEY_AI : STORAGE_KEY_CN;
  try {
    localStorage.setItem(key, JSON.stringify(cards));
  } catch (err) {
    console.error(`Failed to save flashcards for ${subject}:`, err);
  }
};

// ================= USER SETTINGS =================

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

export const getDefaultDecks = (cards: Flashcard[], subject: SubjectId = 'cn'): Deck[] => {
  const getIdsByUnit = (u: UnitNumber) => cards.filter((c) => c.unit === u).map((c) => c.id);

  if (subject === 'ai') {
    return [
      {
        id: 'deck-ai-all',
        name: 'Full AI Master Deck (PCC301COM)',
        description: 'Complete deck of 250 AI quick revision questions across Units I to V with comprehensive answers.',
        unit: 'all',
        cardIds: cards.map((c) => c.id),
        folder: 'Artificial Intelligence',
        color: '#10b981',
        createdAt: 1700000000000,
      },
      {
        id: 'deck-ai-u1',
        name: 'Unit I: Intro to AI & Intelligent Agents',
        description: 'Turing test, AI foundations, history, agent architectures, PEAS, rationality, and environment properties.',
        unit: 1,
        cardIds: getIdsByUnit(1),
        folder: 'AI Units',
        color: '#3b82f6',
        createdAt: 1700000000001,
      },
      {
        id: 'deck-ai-u2',
        name: 'Unit II: Problem Solving & Search Strategies',
        description: 'State space, Tower of Hanoi, BFS, DFS, IDS, A*, Greedy BFS, heuristics, and local search.',
        unit: 2,
        cardIds: getIdsByUnit(2),
        folder: 'AI Units',
        color: '#06b6d4',
        createdAt: 1700000000002,
      },
      {
        id: 'deck-ai-u3',
        name: 'Unit III: Adversarial Search & Game Theory',
        description: 'Minimax, Alpha-Beta pruning, MCTS, stochastic games, and CSPs (AC-3, N-Queens, cryptarithmetic).',
        unit: 3,
        cardIds: getIdsByUnit(3),
        folder: 'AI Units',
        color: '#8b5cf6',
        createdAt: 1700000000003,
      },
      {
        id: 'deck-ai-u4',
        name: 'Unit IV: Knowledge Representation & Logic',
        description: 'KB agents, propositional logic, truth tables, CNF, resolution refutation, and First-Order Logic (FOL).',
        unit: 4,
        cardIds: getIdsByUnit(4),
        folder: 'AI Units',
        color: '#f59e0b',
        createdAt: 1700000000004,
      },
      {
        id: 'deck-ai-u5',
        name: 'Unit V: Planning & Industrial Applications',
        description: 'Blocks world, goal stack planning, Sussman anomaly, partial-order/HTN, and real-world industrial AI.',
        unit: 5,
        cardIds: getIdsByUnit(5),
        folder: 'AI Units',
        color: '#ec4899',
        createdAt: 1700000000005,
      },
    ];
  }

  // Default CN Decks
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

export const loadDecks = (cards: Flashcard[], subject: SubjectId = 'cn'): Deck[] => {
  if (typeof window === 'undefined') return getDefaultDecks(cards, subject);
  const key = subject === 'ai' ? DECKS_KEY_AI : DECKS_KEY_CN;
  try {
    const saved = localStorage.getItem(key);
    if (!saved) {
      const defaults = getDefaultDecks(cards, subject);
      saveDecks(defaults, subject);
      return defaults;
    }
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return getDefaultDecks(cards, subject);
  } catch {
    return getDefaultDecks(cards, subject);
  }
};

export const saveDecks = (decks: Deck[], subject: SubjectId = 'cn') => {
  if (typeof window === 'undefined') return;
  const key = subject === 'ai' ? DECKS_KEY_AI : DECKS_KEY_CN;
  try {
    localStorage.setItem(key, JSON.stringify(decks));
  } catch (err) {
    console.error(`Failed to save decks for ${subject}:`, err);
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
export const parseImportText = (rawText: string, currentSubject: SubjectId = 'cn'): Flashcard[] => {
  const trimmed = rawText.trim();
  if (!trimmed) return [];

  const subjectConfig = SUBJECTS[currentSubject];

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map((item, idx) => {
          const uNum = (Number(item.unit) >= 1 && Number(item.unit) <= 5 ? Number(item.unit) : 1) as UnitNumber;
          return {
            id: item.id || `custom-${currentSubject}-${Date.now()}-${idx}`,
            subject: currentSubject,
            unit: uNum,
            unitTitle: item.unitTitle || subjectConfig.unitNames[uNum] || `Unit ${uNum}`,
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
          };
        }).filter((c) => c.question && c.answer);
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
          id: `custom-${currentSubject}-${Date.now()}-${idx}`,
          subject: currentSubject,
          unit: validUnit,
          unitTitle: subjectConfig.unitNames[validUnit] || `Unit ${validUnit}`,
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
      const topic = topicMatch ? topicMatch[1].trim() : subjectConfig.name;

      if (q && a) {
        results.push({
          id: `custom-${currentSubject}-${Date.now()}-${idx}`,
          subject: currentSubject,
          unit: uNum,
          unitTitle: subjectConfig.unitNames[uNum] || `Unit ${uNum}`,
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
