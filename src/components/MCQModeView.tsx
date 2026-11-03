import React, { useState } from 'react';
import type { Flashcard } from '../types';
import {
  IconCheck,
  IconX,
  IconRotate,
  IconActivity,
  IconZap,
} from './Icons';
import { playSound } from '../utils/audio';

interface MCQModeViewProps {
  cards: Flashcard[];
  soundEnabled: boolean;
  onExitMCQ: () => void;
  onRecordStudy: () => void;
}

interface QuestionMCQ {
  card: Flashcard;
  options: string[];
  correctAnswer: string;
}

export const MCQModeView: React.FC<MCQModeViewProps> = ({
  cards,
  soundEnabled,
  onExitMCQ,
  onRecordStudy,
}) => {
  const [questions, setQuestions] = useState<QuestionMCQ[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [quizSize, setQuizSize] = useState(10);
  const [hasStarted, setHasStarted] = useState(false);

  // Helper to generate 4 options for a card using other cards as distractors
  const generateMCQQuestions = (cardPool: Flashcard[], count: number): QuestionMCQ[] => {
    const shuffledPool = [...cardPool].sort(() => 0.5 - Math.random());
    const selectedCards = shuffledPool.slice(0, Math.min(count, shuffledPool.length));

    return selectedCards.map((card) => {
      // Find candidate distractors (prefer same unit or topic)
      const otherAnswers = cardPool
        .filter((c) => c.id !== card.id && c.answer !== card.answer)
        .map((c) => c.answer);

      // Shuffle other answers and pick 3
      const shuffledOthers = otherAnswers.sort(() => 0.5 - Math.random());
      const distractors = shuffledOthers.slice(0, 3);

      // Combine and shuffle 4 options
      const options = [card.answer, ...distractors].sort(() => 0.5 - Math.random());

      return {
        card,
        options,
        correctAnswer: card.answer,
      };
    });
  };

  const startQuiz = (count: number) => {
    const mcqList = generateMCQQuestions(cards, count);
    setQuestions(mcqList);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreakCount(0);
    setIsFinished(false);
    setHasStarted(true);
  };

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);
    onRecordStudy();

    const currentQ = questions[currentIndex];
    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      playSound('correct', soundEnabled);
      setScore((s) => s + 1);
      setStreakCount((st) => st + 1);
    } else {
      playSound('again', soundEnabled);
      setStreakCount(0);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  // Pre-test configuration screen
  if (!hasStarted) {
    return (
      <div className="w-full max-w-xl mx-auto py-12 px-4 text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
          <IconZap size={24} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
          Multiple Choice (MCQ) Practice
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-6 max-w-md mx-auto">
          Test your rapid recognition. 4 dynamically generated multiple-choice options will be created from your deck.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {[5, 10, 20, Math.min(30, cards.length)].map((n) => (
            <button
              key={n}
              onClick={() => setQuizSize(n)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                quizSize === n
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-transparent shadow-xs'
                  : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {n} MCQs
            </button>
          ))}
        </div>

        <button
          onClick={() => startQuiz(quizSize)}
          disabled={cards.length < 4}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-semibold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition shadow-sm disabled:opacity-50"
        >
          Start MCQ Test →
        </button>
      </div>
    );
  }

  // Summary screen
  if (isFinished) {
    const pct = Math.round((score / questions.length) * 100);

    return (
      <div className="w-full max-w-xl mx-auto py-10 px-4 text-center">
        <div className="p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <IconActivity size={28} />
          </div>
          <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-1">
            {pct}% Score
          </h2>
          <p className="text-sm text-neutral-500 mb-6">
            You answered {score} out of {questions.length} questions correctly!
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => startQuiz(quizSize)}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition flex items-center gap-1.5"
            >
              <IconRotate size={14} />
              Play Again
            </button>
            <button
              onClick={onExitMCQ}
              className="px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              Return to Flashcards
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-4">
      {/* Top Header: Progress & Streak */}
      <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
        <div className="flex items-center gap-2 font-mono">
          <span>
            Question {currentIndex + 1} / {questions.length}
          </span>
          <span>•</span>
          <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
            Unit {currentQ.card.unit}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono">
          {streakCount > 1 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold border border-amber-200 dark:border-amber-900 text-[11px]">
              🔥 {streakCount} Streak
            </span>
          )}
          <span>Score: {score}</span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden mb-6">
        <div
          className="h-full bg-neutral-900 dark:bg-neutral-100 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm mb-4">
        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block mb-2">
          {currentQ.card.topic}
        </span>
        <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
          {currentQ.card.question}
        </h3>
      </div>

      {/* 4 Multiple Choice Options */}
      <div className="space-y-2.5">
        {currentQ.options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D
          let optionStyles = 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700';

          if (isAnswered) {
            if (option === currentQ.correctAnswer) {
              optionStyles = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500';
            } else if (option === selectedOption) {
              optionStyles = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-1 ring-rose-500';
            } else {
              optionStyles = 'opacity-40 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-500';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(option)}
              disabled={isAnswered}
              className={`w-full p-3.5 sm:p-4 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-start gap-3 select-none active:scale-[0.99] touch-manipulation min-h-[48px] ${optionStyles}`}
            >
              <span className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-mono text-xs text-neutral-600 dark:text-neutral-400 shrink-0 font-bold">
                {letter}
              </span>
              <span className="flex-1 leading-relaxed">{option}</span>

              {isAnswered && option === currentQ.correctAnswer && (
                <IconCheck size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              )}
              {isAnswered && option === selectedOption && option !== currentQ.correctAnswer && (
                <IconX size={18} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Answer Explanation & Next Button */}
      {isAnswered && (
        <div className="mt-5 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="text-xs text-neutral-600 dark:text-neutral-400 flex-1">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100 block mb-0.5">
              {selectedOption === currentQ.correctAnswer ? '🎉 Correct!' : '❌ Not quite!'}
            </span>
            <span>{currentQ.card.keyPoints?.[0] || 'Review this card in your flashcard deck.'}</span>
          </div>

          <button
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition shrink-0"
          >
            {currentIndex + 1 < questions.length ? 'Next Question →' : 'See Results →'}
          </button>
        </div>
      )}
    </div>
  );
};
