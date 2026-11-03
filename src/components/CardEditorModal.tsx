import React, { useState, useEffect } from 'react';
import type { Flashcard, UnitNumber } from '../types';
import { IconX, IconTrash } from './Icons';

interface CardEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardToEdit: Flashcard | null;
  onSave: (card: Partial<Flashcard>) => void;
  onDelete?: (id: string) => void;
}

export const CardEditorModal: React.FC<CardEditorModalProps> = ({
  isOpen,
  onClose,
  cardToEdit,
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
      unit,
      topic: topic.trim() || 'General CN',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            {cardToEdit ? 'Edit Question Card' : 'Add New Question Card'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
          >
            <IconX size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Unit (1 to 5)
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(parseInt(e.target.value, 10) as UnitNumber)}
                className="w-full text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              >
                <option value={1}>Unit 1: Physical Layer</option>
                <option value={2}>Unit 2: Data Link Layer</option>
                <option value={3}>Unit 3: Network Layer</option>
                <option value={4}>Unit 4: Transport Layer</option>
                <option value={5}>Unit 5: Application & Security</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Topic / Protocol
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. TCP 3-Way Handshake"
                className="w-full text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
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
              className="w-full text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Definitive Answer *
            </label>
            <textarea
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Core concise answer..."
              rows={4}
              className="w-full text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Key Points for Exam Scoring (one per line)
            </label>
            <textarea
              value={keyPointsText}
              onChange={(e) => setKeyPointsText(e.target.value)}
              placeholder={`Point 1 to write in exam\nPoint 2 to write in exam\nPoint 3...`}
              rows={3}
              className="w-full text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Formula (Optional)
              </label>
              <input
                type="text"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="e.g. 2B log2(1 + SNR)"
                className="w-full text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Mnemonic / Memory Hook (Optional)
              </label>
              <input
                type="text"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                placeholder="e.g. Please Do Not Touch Steve's..."
                className="w-full text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Visual Diagram / ASCII Flow (Optional)
            </label>
            <textarea
              value={diagram}
              onChange={(e) => setDiagram(e.target.value)}
              placeholder="e.g. [Client] --- SYN ---> [Server]"
              rows={3}
              className="w-full text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400 font-mono"
            />
          </div>

          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
            {cardToEdit && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  onDelete(cardToEdit.id);
                  onClose();
                }}
                className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition flex items-center gap-1.5"
              >
                <IconTrash size={14} />
                Delete Card
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-xl transition"
              >
                Save Flashcard
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
