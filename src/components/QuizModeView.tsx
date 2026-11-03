import React, { useState } from 'react';
import type { Flashcard, UnitNumber } from '../types';
import {
  IconCheck,
  IconX,
  IconRotate,
  IconActivity,
  IconStar,
  IconZap,
} from './Icons';
import { playSound } from '../utils/audio';

interface QuizModeViewProps {
  cards: Flashcard[];
  currentUnit: 'all' | UnitNumber;
  soundEnabled: boolean;
  onExitQuiz: () => void;
  onToggleStar: (id: string) => void;
}

export const QuizModeView: React.FC<QuizModeViewProps> = ({
  cards,
  currentUnit,
  soundEnabled,
  onExitQuiz,
  onToggleStar,
}) => {
  const [testCards, setTestCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<{ card: Flashcard; score: number }[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [testLength, setTestLength] = useState<number>(10);
  const [hasStarted, setHasStarted] = useState(false);

  // Initialize test with shuffled cards
  const startQuiz = (count: number) => {
    const pool = [...cards].sort(() => 0.5 - Math.random());
    const selected = pool.slice(0, Math.min(count, pool.length));
    setTestCards(selected);
    setCurrentIndex(0);
    setShowAnswer(false);
    setResults([]);
    setIsFinished(false);
    setHasStarted(true);
  };

  const handleScore = (score: number) => {
    playSound(score >= 1 ? 'correct' : score > 0 ? 'click' : 'again', soundEnabled);
    const newResults = [...results, { card: testCards[currentIndex], score }];
    setResults(newResults);

    if (currentIndex + 1 < testCards.length) {
      setCurrentIndex((prev) => prev + 1);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
    }
  };

  // Pre-test setup screen
  if (!hasStarted) {
    return (
      <div className="w-full max-w-xl mx-auto py-12 px-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center mx-auto mb-4">
          <IconZap size={24} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
          Exam Simulation Test
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
          Test your active recall under timed exam conditions from{' '}
          <span className="font-semibold text-neutral-800 dark:text-neutral-200">
            {currentUnit === 'all' ? 'All 5 Units' : `Unit ${currentUnit}`}
          </span>
          . Select question count to begin.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {[5, 10, 20, Math.min(30, cards.length)].map((n) => (
            <button
              key={n}
              onClick={() => setTestLength(n)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                testLength === n
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-transparent shadow-xs'
                  : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {n} Questions
            </button>
          ))}
        </div>

        <button
          onClick={() => startQuiz(testLength)}
          disabled={cards.length === 0}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition shadow-sm"
        >
          Start Rapid-Fire Test →
        </button>
      </div>
    );
  }

  // Finished summary screen
  if (isFinished) {
    const totalScore = results.reduce((acc, r) => acc + r.score, 0);
    const percentage = Math.round((totalScore / results.length) * 100);
    const missedCards = results.filter((r) => r.score < 1).map((r) => r.card);

    return (
      <div className="w-full max-w-2xl mx-auto py-8 px-4">
        {/* Score Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-center mb-6 shadow-sm">
          <div className="inline-flex p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 mb-3">
            <IconActivity size={28} className="text-neutral-800 dark:text-neutral-200" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 mb-1">
            {percentage}% Mastery
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mb-6">
            You scored {totalScore.toFixed(1)} out of {results.length} questions correctly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => startQuiz(testLength)}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition flex items-center gap-1.5"
            >
              <IconRotate size={14} />
              Retake Test
            </button>
            <button
              onClick={onExitQuiz}
              className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              Back to Flashcards
            </button>
          </div>
        </div>

        {/* Missed questions section */}
        {missedCards.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Needs Immediate Revision ({missedCards.length} Questions)
              </h3>
              <span className="text-xs text-neutral-400">Click star to mark for cramming</span>
            </div>

            <div className="space-y-2">
              {missedCards.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-xl border border-rose-200 dark:border-rose-950/60 bg-rose-50/30 dark:bg-rose-950/20 flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 text-rose-700 dark:text-rose-300">
                      Unit {c.unit} • {c.topic}
                    </span>
                    <h4 className="text-xs sm:text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {c.question}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 pt-1">
                      {c.answer}
                    </p>
                  </div>
                  <button
                    onClick={() => onToggleStar(c.id)}
                    className="p-1.5 text-neutral-400 hover:text-amber-500 transition shrink-0"
                  >
                    <IconStar size={16} filled={c.isStarred} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const currentCard = testCards[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      {/* Test Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
          <span>
            Question {currentIndex + 1} of {testCards.length}
          </span>
          <span>Unit {currentCard.unit}</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          <div
            className="h-full bg-neutral-900 dark:bg-neutral-100 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / testCards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm min-h-[300px] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-neutral-400">
              {currentCard.topic}
            </span>
            <button
              onClick={() => onToggleStar(currentCard.id)}
              className="text-neutral-400 hover:text-amber-500 transition"
            >
              <IconStar size={15} filled={currentCard.isStarred} />
            </button>
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
            {currentCard.question}
          </h2>

          {showAnswer && (
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-3 animate-fadeIn">
              <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                {currentCard.answer}
              </p>
              {currentCard.diagram && (
                <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                  <pre className="font-mono text-[10px] sm:text-[11px] leading-tight whitespace-pre overflow-x-auto text-neutral-800 dark:text-neutral-200">
                    {currentCard.diagram}
                  </pre>
                </div>
              )}
              {currentCard.keyPoints && (
                <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1 pl-4 list-disc">
                  {currentCard.keyPoints.slice(0, 3).map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 mt-6">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full py-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition"
            >
              Reveal Answer & Self-Grade
            </button>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleScore(0)}
                className="py-2.5 rounded-xl border border-rose-200 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 transition flex items-center justify-center gap-1.5"
              >
                <IconX size={14} />
                Forgot (0%)
              </button>
              <button
                onClick={() => handleScore(0.5)}
                className="py-2.5 rounded-xl border border-amber-200 dark:border-amber-950 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 text-xs font-semibold hover:bg-amber-100 transition"
              >
                Partial (50%)
              </button>
              <button
                onClick={() => handleScore(1.0)}
                className="py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-950 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold hover:bg-emerald-100 transition flex items-center justify-center gap-1.5"
              >
                <IconCheck size={14} />
                Nailed it (100%)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
