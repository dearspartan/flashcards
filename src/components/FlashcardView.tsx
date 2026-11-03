import React, { useState, useEffect, useRef } from 'react';
import type { Flashcard, CardDifficulty } from '../types';
import {
  IconChevronLeft,
  IconChevronRight,
  IconRotate,
  IconStar,
  IconVolume,
  IconShuffle,
  IconEdit,
  IconMaximize,
  IconMinimize,
  IconKeyboard,
  IconCheck,
  IconCheckCircle,
  IconCopy,
  IconX,
} from './Icons';
import { playSound } from '../utils/audio';

interface FlashcardViewProps {
  card: Flashcard;
  currentIndex: number;
  totalCards: number;
  onNext: () => void;
  onPrev: () => void;
  onRate: (rating: CardDifficulty) => void;
  onMarkKnown: (isKnown: boolean) => void;
  onToggleStar: (id: string) => void;
  onEditCard: (card: Flashcard) => void;
  isShuffled: boolean;
  onToggleShuffle: () => void;
  soundEnabled: boolean;
  blurtingEnabled: boolean;
  onToggleBlurting: () => void;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  card,
  currentIndex,
  totalCards,
  onNext,
  onPrev,
  onRate,
  onMarkKnown,
  onToggleStar,
  onEditCard,
  isShuffled,
  onToggleShuffle,
  soundEnabled,
  blurtingEnabled,
  onToggleBlurting,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [blurtText, setBlurtText] = useState('');
  const [isZenMode, setIsZenMode] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [copiedDiagram, setCopiedDiagram] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const blurtInputRef = useRef<HTMLTextAreaElement>(null);

  // Reset flip state and blurt text when card changes
  useEffect(() => {
    setIsFlipped(false);
    setBlurtText('');
  }, [card.id]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

      // Space flips the card
      if (e.code === 'Space' && !isInput) {
        e.preventDefault();
        toggleFlip();
        return;
      }

      if (isInput) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          toggleFlip();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
        case 'h':
          e.preventDefault();
          onPrev();
          break;
        case 'ArrowRight':
        case 'l':
          e.preventDefault();
          onNext();
          break;
        case '1':
          onRate('again');
          break;
        case '2':
          onRate('hard');
          break;
        case '3':
          onRate('good');
          break;
        case '4':
          onRate('easy');
          break;
        case 's':
        case 'S':
          onToggleStar(card.id);
          break;
        case 'z':
        case 'Z':
          setIsZenMode((prev) => !prev);
          break;
        case 'b':
        case 'B':
          onToggleBlurting();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, card.id]);

  const toggleFlip = () => {
    playSound('flip', soundEnabled);
    setIsFlipped((prev) => !prev);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const textToRead = isFlipped ? card.answer : card.question;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const copyDiagram = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!card.diagram) return;
    navigator.clipboard.writeText(card.diagram);
    setCopiedDiagram(true);
    setTimeout(() => setCopiedDiagram(false), 2000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX.current;
    const diffY = touchEndY - touchStartY.current;

    // Filter out vertical scrolls: only trigger if horizontal displacement exceeds threshold
    // and is significantly larger than vertical movement
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
      if (diffX > 0) {
        onPrev();
      } else {
        onNext();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyword match helper for active blurting recall
  const calculateKeywordMatch = () => {
    if (!blurtText.trim()) return null;
    const answerWords = new Set(
      card.answer
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 3)
    );
    const userWords = blurtText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 3);

    const matches = userWords.filter((w) => answerWords.has(w));
    const uniqueMatches = Array.from(new Set(matches));
    return {
      matchCount: uniqueMatches.length,
      matchedWords: uniqueMatches,
    };
  };

  const recallResult = isFlipped ? calculateKeywordMatch() : null;

  return (
    <div
      className={`transition-all duration-300 ${
        isZenMode
          ? 'fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-xl flex flex-col justify-center items-center p-4 sm:p-8'
          : 'w-full max-w-3xl mx-auto py-4 px-3 sm:px-0'
      }`}
    >
      {/* Top Header Row above card */}
      <div className="w-full flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-neutral-700 dark:text-neutral-300 font-medium">
            {currentIndex + 1} / {totalCards}
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 font-medium">
            Unit {card.unit}
          </span>
          <span className="truncate max-w-[140px] sm:max-w-xs">{card.topic}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleShuffle}
            title={isShuffled ? 'Shuffle: ON' : 'Shuffle: OFF'}
            className={`p-1.5 rounded-md transition ${
              isShuffled
                ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
            }`}
          >
            <IconShuffle size={14} />
          </button>

          <button
            onClick={() => onToggleStar(card.id)}
            title={card.isStarred ? 'Unstar Question' : 'Star Question for Cramming'}
            className={`p-1.5 rounded-md transition ${
              card.isStarred
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                : 'text-neutral-400 hover:text-amber-500'
            }`}
          >
            <IconStar size={15} filled={card.isStarred} />
          </button>

          <button
            onClick={() => onEditCard(card)}
            title="Edit Question"
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
          >
            <IconEdit size={14} />
          </button>

          <button
            onClick={() => setIsZenMode(!isZenMode)}
            title={isZenMode ? 'Exit Zen Mode (Esc/Z)' : 'Zen Focus Mode (Z)'}
            className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
          >
            {isZenMode ? <IconMinimize size={15} /> : <IconMaximize size={15} />}
          </button>
        </div>
      </div>

      {/* 3D Animated Flip Card Container */}
      <div
        className="flip-card-container w-full h-[54vh] min-h-[380px] max-h-[540px] sm:h-[500px]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}
          onClick={toggleFlip}
          role="button"
          tabIndex={0}
          aria-label="Flashcard. Press Space or tap to flip."
        >
          {/* ================= FRONT SIDE (QUESTION) ================= */}
          <div className="flip-card-front bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-7 flex flex-col justify-between shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 transition cursor-pointer select-none">
            {/* Top Indicator Ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neutral-300 via-neutral-500 to-neutral-400 dark:from-neutral-800 dark:via-neutral-600 dark:to-neutral-800" />

            <div>
              {/* Question Tag Row */}
              <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                    QUESTION
                  </span>
                  {card.diagram && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                      📊 Diagram
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {card.repetitions > 0 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 flex items-center gap-1">
                      <IconCheck size={10} />
                      Reps: {card.repetitions}
                    </span>
                  )}
                  <button
                    onClick={handleSpeak}
                    title="Read Aloud (TTS)"
                    className={`p-1.5 rounded-md transition ${
                      speaking
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 animate-pulse'
                        : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                    }`}
                  >
                    <IconVolume size={14} />
                  </button>
                </div>
              </div>

              {/* Main Question Text */}
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-base sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight leading-snug">
                  {card.question}
                </h2>

                {card.formula && (
                  <div className="p-2 sm:p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                    <span className="text-neutral-400 select-none mr-2">Formula hint:</span>
                    {card.formula}
                  </div>
                )}

                {/* Active Blurting Area */}
                {blurtingEnabled && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-neutral-800"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                        Active Recall Blurt Box (Test yourself before flipping):
                      </label>
                      <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">Ctrl+Enter to Flip</span>
                    </div>
                    <textarea
                      ref={blurtInputRef}
                      value={blurtText}
                      onChange={(e) => setBlurtText(e.target.value)}
                      placeholder="Type keywords, key definitions, or formulas here to test recall..."
                      rows={2}
                      className="w-full text-base sm:text-xs p-2.5 sm:p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 resize-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Flip Hint */}
            <div className="pt-3 sm:pt-4 flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-100 dark:border-neutral-800/60 mt-auto">
              <span className="inline-flex items-center gap-1.5">
                <IconRotate size={13} className="text-neutral-400 shrink-0" />
                <span className="hidden sm:inline">Press <strong>Space</strong> or click card to flip to Answer</span>
                <span className="sm:hidden">Tap card to flip to Answer</span>
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hidden sm:inline">
                Space / Enter
              </span>
            </div>
          </div>

          {/* ================= BACK SIDE (ANSWER & DIAGRAM) ================= */}
          <div className="flip-card-back bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-7 flex flex-col justify-between shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 transition cursor-pointer select-none">
            {/* Top Indicator Ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />

            <div className="space-y-3 sm:space-y-4">
              {/* Header row */}
              <div className="flex items-center justify-between gap-2 mb-1 sm:mb-2">
                <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
                  ANSWER & CONCEPTS
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSpeak}
                    title="Read Aloud Answer"
                    className={`p-1.5 rounded-md transition ${
                      speaking
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 animate-pulse'
                        : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
                    }`}
                  >
                    <IconVolume size={14} />
                  </button>
                </div>
              </div>

              {/* Definitive Answer */}
              <div className="text-xs sm:text-sm md:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed font-normal">
                {card.answer}
              </div>

              {/* Visual Diagram Box if available */}
              {card.diagram && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-2.5 sm:p-3 text-neutral-800 dark:text-neutral-200 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase text-neutral-500 pb-1 border-b border-neutral-200 dark:border-neutral-800">
                    <span className="font-semibold flex items-center gap-1.5 text-[10px] sm:text-[11px]">
                      📊 Concept / Topology Diagram
                    </span>
                    <button
                      onClick={copyDiagram}
                      title="Copy Diagram"
                      className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-0.5"
                    >
                      {copiedDiagram ? <IconCheck size={13} className="text-emerald-500" /> : <IconCopy size={13} />}
                    </button>
                  </div>
                  <pre className="font-mono text-[10px] sm:text-xs leading-tight whitespace-pre overflow-x-auto text-neutral-700 dark:text-neutral-300 py-1 scrollbar-thin">
                    {card.diagram}
                  </pre>
                </div>
              )}

              {/* Key Exam Points */}
              {card.keyPoints && card.keyPoints.length > 0 && (
                <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                  <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold flex items-center gap-1.5">
                    <IconCheckCircle size={12} className="text-neutral-400 shrink-0" />
                    Key Points for Viva / Exam Marks:
                  </div>
                  <ul className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 space-y-1 pl-4 list-disc marker:text-neutral-400">
                    {card.keyPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mnemonic / Formula */}
              {card.mnemonic && (
                <div className="p-2 sm:p-2.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                  <span className="font-mono uppercase font-bold text-[10px] px-1.5 py-0.5 rounded bg-amber-200/50 dark:bg-amber-900/50 shrink-0">
                    Mnemonic
                  </span>
                  <p className="leading-relaxed">{card.mnemonic}</p>
                </div>
              )}

              {/* Blurting feedback */}
              {recallResult && recallResult.matchCount > 0 && (
                <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <span className="font-semibold shrink-0">Recall Match:</span>
                  <span>
                    {recallResult.matchCount} terms ({recallResult.matchedWords.slice(0, 4).join(', ')})
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Flip Back Hint */}
            <div className="pt-3 sm:pt-4 flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-100 dark:border-neutral-800/60 mt-auto">
              <span className="inline-flex items-center gap-1.5">
                <IconRotate size={13} className="text-neutral-400 shrink-0" />
                <span className="hidden sm:inline">Press <strong>Space</strong> or click card to flip back</span>
                <span className="sm:hidden">Tap card to flip back</span>
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hidden sm:inline">
                Space / Enter
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Known / Unknown & Spaced Repetition Rating Buttons */}
      <div className="mt-3 sm:mt-4 space-y-2">
        {/* Quick Mark Known / Unknown buttons */}
        <div className="flex items-center gap-2 w-full">
          <button
            onClick={() => {
              playSound('again', soundEnabled);
              onMarkKnown(false);
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-[0.98] min-h-[44px] ${
              card.isKnown === false
                ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500'
                : 'border-neutral-200 dark:border-neutral-800 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <IconX size={14} className="text-rose-500 shrink-0" />
            <span className="truncate">Need Review</span>
          </button>
          <button
            onClick={() => {
              playSound('correct', soundEnabled);
              onMarkKnown(true);
            }}
            className={`flex-1 py-2 sm:py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition active:scale-[0.98] min-h-[44px] ${
              card.isKnown === true
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500'
                : 'border-neutral-200 dark:border-neutral-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <IconCheck size={14} className="text-emerald-500 shrink-0" />
            <span className="truncate">Mastered</span>
          </button>
        </div>

        {/* 4 Leitner Rating Options + Navigation */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
          <button
            onClick={onPrev}
            title="Previous Card (← or H)"
            className="p-2 sm:p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition min-h-[44px] min-w-[38px] sm:min-w-[42px] flex items-center justify-center active:scale-[0.96] shrink-0"
          >
            <IconChevronLeft size={16} />
          </button>

          <div className="grid grid-cols-4 gap-1 sm:gap-2 flex-1">
            <button
              onClick={() => {
                playSound('again', soundEnabled);
                onRate('again');
              }}
              className="flex flex-col items-center justify-center py-1 sm:py-2 px-1 rounded-xl border border-rose-200 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-rose-700 dark:text-rose-400 transition min-h-[44px] active:scale-[0.97]"
            >
              <span className="text-[11px] sm:text-xs font-semibold">Again</span>
              <span className="text-[9px] sm:text-[10px] text-rose-500 font-mono">1</span>
            </button>

            <button
              onClick={() => {
                playSound('click', soundEnabled);
                onRate('hard');
              }}
              className="flex flex-col items-center justify-center py-1 sm:py-2 px-1 rounded-xl border border-amber-200 dark:border-amber-950 bg-amber-50/50 dark:bg-amber-950/20 hover:bg-amber-100 dark:hover:bg-amber-950/40 text-amber-700 dark:text-amber-400 transition min-h-[44px] active:scale-[0.97]"
            >
              <span className="text-[11px] sm:text-xs font-semibold">Hard</span>
              <span className="text-[9px] sm:text-[10px] text-amber-500 font-mono">2</span>
            </button>

            <button
              onClick={() => {
                playSound('click', soundEnabled);
                onRate('good');
              }}
              className="flex flex-col items-center justify-center py-1 sm:py-2 px-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800/60 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition min-h-[44px] active:scale-[0.97]"
            >
              <span className="text-[11px] sm:text-xs font-semibold">Good</span>
              <span className="text-[9px] sm:text-[10px] text-neutral-500 font-mono">3</span>
            </button>

            <button
              onClick={() => {
                playSound('easy', soundEnabled);
                onRate('easy');
              }}
              className="flex flex-col items-center justify-center py-1 sm:py-2 px-1 rounded-xl border border-emerald-200 dark:border-emerald-950 bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 transition min-h-[44px] active:scale-[0.97]"
            >
              <span className="text-[11px] sm:text-xs font-semibold">Easy</span>
              <span className="text-[9px] sm:text-[10px] text-emerald-500 font-mono">4</span>
            </button>
          </div>

          <button
            onClick={onNext}
            title="Next Card (→ or L)"
            className="p-2 sm:p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition min-h-[44px] min-w-[38px] sm:min-w-[42px] flex items-center justify-center active:scale-[0.96] shrink-0"
          >
            <IconChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Quick memorization helper toggles bar */}
      <div className="mt-5 pt-3 border-t border-neutral-150 dark:border-neutral-900 flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleBlurting}
            className={`flex items-center gap-1.5 transition ${
              blurtingEnabled ? 'text-neutral-900 dark:text-neutral-100 font-medium' : 'hover:text-neutral-700'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${blurtingEnabled ? 'bg-emerald-500' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
            Active Recall Blurt Mode (B)
          </button>
        </div>

        <button
          onClick={() => setShowKeyboardHelp(!showKeyboardHelp)}
          className="flex items-center gap-1 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
        >
          <IconKeyboard size={13} />
          Shortcuts
        </button>
      </div>

      {/* Keyboard Shortcuts Drawer */}
      {showKeyboardHelp && (
        <div className="mt-3 p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 font-mono text-[10px]">
              Space
            </kbd>{' '}
            3D Flip Card
          </div>
          <div>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 font-mono text-[10px]">
              ← / →
            </kbd>{' '}
            Prev / Next
          </div>
          <div>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 font-mono text-[10px]">
              1 - 4
            </kbd>{' '}
            Rate Difficulty
          </div>
          <div>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 font-mono text-[10px]">
              S
            </kbd>{' '}
            Star Question
          </div>
        </div>
      )}
    </div>
  );
};
