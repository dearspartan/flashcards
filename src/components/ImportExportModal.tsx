import React, { useState } from 'react';
import type { Flashcard, SubjectId } from '../types';
import { parseImportText } from '../utils/storage';
import { SUBJECTS } from '../data/subjects';
import {
  IconX,
  IconDownload,
  IconUpload,
  IconCheck,
  IconCopy,
  IconRotate,
} from './Icons';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: Flashcard[];
  currentSubject?: SubjectId;
  onImportCards: (newCards: Flashcard[], mode: 'append' | 'replace') => void;
  onResetDefaults: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  cards,
  currentSubject = 'cn',
  onImportCards,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'reset'>('import');
  const [importText, setImportText] = useState('');
  const [parsedPreview, setParsedPreview] = useState<Flashcard[]>([]);
  const [copiedExport, setCopiedExport] = useState(false);

  const subjectConfig = SUBJECTS[currentSubject] || SUBJECTS.cn;

  if (!isOpen) return null;

  const handleTextChange = (text: string) => {
    setImportText(text);
    const parsed = parseImportText(text, currentSubject);
    setParsedPreview(parsed);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleTextChange(content);
    };
    reader.readAsText(file);
  };

  const handleDoImport = (mode: 'append' | 'replace') => {
    if (parsedPreview.length === 0) return;
    onImportCards(parsedPreview, mode);
    setImportText('');
    setParsedPreview([]);
    onClose();
  };

  const exportJsonString = JSON.stringify(cards, null, 2);

  const handleCopyExport = () => {
    navigator.clipboard.writeText(exportJsonString);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([exportJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subjectConfig.shortName.toLowerCase()}_flashcards_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span>Import & Export Questions</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                {subjectConfig.name}
              </span>
            </h3>
            <p className="text-xs text-neutral-500">
              Backup your questions, upload JSON files, or paste custom notes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition cursor-pointer"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-6 gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('import')}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === 'import'
                ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
            }`}
          >
            Import Questions
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === 'export'
                ? 'border-neutral-900 dark:border-white text-neutral-900 dark:text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
            }`}
          >
            Export Backup ({cards.length})
          </button>
          <button
            onClick={() => setActiveTab('reset')}
            className={`py-3 border-b-2 transition cursor-pointer ${
              activeTab === 'reset'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
            }`}
          >
            Reset Defaults
          </button>
        </div>

        {/* Tab contents */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === 'import' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                  Paste JSON or Delimited Text (Q: ... A: ... or Question ::: Answer)
                </span>
                <label className="cursor-pointer text-xs font-semibold text-neutral-900 dark:text-neutral-100 hover:underline flex items-center gap-1.5">
                  <IconUpload size={14} />
                  <span>Upload .json/.txt</span>
                  <input
                    type="file"
                    accept=".json,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <textarea
                value={importText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={`Example:
Q: What is a heuristic search?
A: A search algorithm guided by domain-specific knowledge to reach the goal.
Unit: 2
Topic: Informed Search

Or paste raw JSON array of Flashcard objects.`}
                rows={8}
                className="w-full text-xs font-mono p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />

              {parsedPreview.length > 0 && (
                <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconCheck size={16} />
                    <span>
                      Successfully parsed <strong>{parsedPreview.length}</strong> questions!
                    </span>
                  </div>
                  <span className="font-mono text-[10px]">
                    Previewing 1 of {parsedPreview.length}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => handleDoImport('append')}
                  disabled={parsedPreview.length === 0}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 transition cursor-pointer"
                >
                  Append to Existing ({parsedPreview.length} Cards)
                </button>
                <button
                  onClick={() => handleDoImport('replace')}
                  disabled={parsedPreview.length === 0}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 transition cursor-pointer"
                >
                  Replace All Cards ({parsedPreview.length} Cards)
                </button>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Export all {cards.length} {subjectConfig.name} questions as a backup file. You can download the JSON or copy it to your clipboard.
              </p>

              <textarea
                readOnly
                value={exportJsonString}
                rows={10}
                className="w-full text-[11px] font-mono p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 focus:outline-none"
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={handleCopyExport}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedExport ? <IconCheck size={14} className="text-emerald-500" /> : <IconCopy size={14} />}
                  {copiedExport ? 'Copied to Clipboard!' : 'Copy JSON'}
                </button>
                <button
                  onClick={handleDownloadFile}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <IconDownload size={14} />
                  Download Backup File
                </button>
              </div>
            </div>
          )}

          {activeTab === 'reset' && (
            <div className="space-y-4 py-2">
              <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-300 text-xs leading-relaxed">
                <h4 className="font-semibold mb-1">Reset to Default Question Bank?</h4>
                This will restore the original curated {subjectConfig.totalCards} questions for{' '}
                <strong>{subjectConfig.name}</strong> ({subjectConfig.code}) across Units 1 to 5, and reset all study repetition counters. Any custom cards will be overwritten unless exported first.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onResetDefaults();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition flex items-center gap-1.5 cursor-pointer"
                >
                  <IconRotate size={14} />
                  Confirm Reset to Defaults
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
