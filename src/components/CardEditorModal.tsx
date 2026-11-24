import React, { useState, useEffect } from 'react';
import type { Flashcard, UnitNumber, SubjectConfig, SubjectId } from '../types';
import { SUBJECTS } from '../data/subjects';
import { IconX, IconTrash } from './Icons';

interface CardEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardToEdit: Flashcard | null;
  currentSubject?: SubjectId;
  subjectConfig?: SubjectConfig;
  onSave: (card: Partial<Flashcard>) => void;
  onDelete?: (id: string) => void;
}

export const CardEditorModal: React.FC<CardEditorModalProps> = ({
  isOpen,
  onClose,
  cardToEdit,
  currentSubject = 'cn',
  subjectConfig = SUBJECTS.cn,
  onSave,
  onDelete,
}) => {
  const [unit, setUnit] = useState<UnitNumber>(1);
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [keyPointsText, setKeyPointsText] = useState('');
  const [formula, setFormula] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [diagram, setDiagram] = useState('');

  useEffect(() => {
    if (cardToEdit) {
      setUnit(cardToEdit.unit);
      setTopic(cardToEdit.topic || '');
      setQuestion(cardToEdit.question || '');
      setAnswer(cardToEdit.answer || '');
      setKeyPointsText(cardToEdit.keyPoints ? cardToEdit.keyPoints.join('\n') : '');
      setFormula(cardToEdit.formula || '');
      setMnemonic(cardToEdit.mnemonic || '');
      setDiagram(cardToEdit.diagram || '');
    } else {
      setUnit(1);
      setTopic('');
      setQuestion('');
      setAnswer('');
      setKeyPointsText('');
      setFormula('');
      setMnemonic('');
      setDiagram('');
    }
  }, [cardToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    const keyPoints = keyPointsText
      .split('\n')
      .map((k) => k.trim())
      .filter(Boolean);

    onSave({
      id: cardToEdit?.id,
      subject: cardToEdit?.subject || currentSubject,
      unit,
      unitTitle: subjectConfig.unitNames[unit] || `Unit ${unit}`,
      topic: topic.trim() || 'General',
      question: question.trim(),
      answer: answer.trim(),
      keyPoints: keyPoints.length > 0 ? keyPoints : undefined,
      formula: formula.trim() || undefined,
      mnemonic: mnemonic.trim() || undefined,
      diagram: diagram.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[92dvh]">
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <span>{cardToEdit ? 'Edit Question Card' : 'Add New Question Card'}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {subjectConfig.name}
            </span>
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3.5 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Unit (1 to 5)
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(parseInt(e.target.value, 10) as UnitNumber)}
                className="w-full text-base sm:text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              >
                {([1, 2, 3, 4, 5] as UnitNumber[]).map((u) => (
                  <option key={u} value={u}>
                    Unit {u}: {subjectConfig.unitNames[u]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Topic / Area
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Heuristic Search / OSI"
                className="w-full text-base sm:text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Question *
            </label>
            <textarea
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the exact exam question..."
              rows={3}
              className="w-full text-base sm:text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Answer & Explanation *
            </label>
            <textarea
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the concise viva or exam answer..."
              rows={4}
              className="w-full text-base sm:text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Key Points for Viva / Exam Marks (One per line)
            </label>
            <textarea
              value={keyPointsText}
              onChange={(e) => setKeyPointsText(e.target.value)}
              placeholder={`• First key point\n• Second key point\n• Third key point`}
              rows={3}
              className="w-full text-base sm:text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400 font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Formula (Optional)
              </label>
              <input
                type="text"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="e.g. f(n) = g(n) + h(n)"
                className="w-full text-base sm:text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Mnemonic (Optional)
              </label>
              <input
                type="text"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                placeholder="e.g. APSTNDP"
                className="w-full text-base sm:text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              ASCII Diagram / Visual Flow (Optional)
            </label>
            <textarea
              value={diagram}
              onChange={(e) => setDiagram(e.target.value)}
              placeholder={`[Initial] ---> [Goal]`}
              rows={3}
              className="w-full text-[11px] p-2.5 rounded-xl bg-neutral-950 text-neutral-200 border border-neutral-800 font-mono focus:outline-none focus:ring-1 focus:ring-neutral-500"
            />
          </div>

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            {cardToEdit && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this card?')) {
                    onDelete(cardToEdit.id);
                    onClose();
                  }
                }}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition flex items-center gap-1.5 cursor-pointer"
              >
                <IconTrash size={14} />
                <span>Delete Card</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition shadow-xs cursor-pointer"
              >
                Save Card
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
