import React, { useState } from 'react';
import type { Flashcard } from '../types';
import { parseImportText } from '../utils/storage';
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
  onImportCards: (newCards: Flashcard[], mode: 'append' | 'replace') => void;
  onResetDefaults: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  cards,
  onImportCards,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'reset'>('import');
  const [importText, setImportText] = useState('');
  const [parsedPreview, setParsedPreview] = useState<Flashcard[]>([]);
  const [copiedExport, setCopiedExport] = useState(false);

  if (!isOpen) return null;

  const handleTextChange = (text: string) => {
    setImportText(text);
    const parsed = parseImportText(text);
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
    a.download = `cn-200-flashcards-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[92dvh]">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <h3 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Question Manager & Importer
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {cards.length} Loaded
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
          >
            <IconX size={18} />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-3 sm:px-6 bg-neutral-50/50 dark:bg-neutral-950/30 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('import')}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition shrink-0 ${
              activeTab === 'import'
                ? 'border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            Paste / Upload Questions
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition shrink-0 ${
              activeTab === 'export'
                ? 'border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            Export Backup (JSON)
          </button>
          <button
            onClick={() => setActiveTab('reset')}
            className={`py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition shrink-0 ${
              activeTab === 'reset'
                ? 'border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100'
                : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            Reset Defaults
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {activeTab === 'import' && (
            <div className="space-y-4">
              <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Paste your Computer Networks questions below. The parser automatically detects:
                <ul className="list-disc pl-4 mt-1 space-y-0.5 text-neutral-500">
                  <li>
                    <strong className="text-neutral-700 dark:text-neutral-300">Q & A blocks:</strong>{' '}
                    <code className="text-[10px]">Q: What is TCP? \n A: It is... \n Unit: 4</code>
                  </li>
                  <li>
                    <strong className="text-neutral-700 dark:text-neutral-300">Delimited format:</strong>{' '}
                    <code className="text-[10px]">Question ::: Answer ::: Unit(1-5) ::: Topic</code>
                  </li>
                  <li>
                    <strong className="text-neutral-700 dark:text-neutral-300">Raw JSON Array:</strong>{' '}
                    <code className="text-[10px]">[&#123; "question": "...", "answer": "...", "unit": 1 &#125;]</code>
                  </li>
                </ul>
              </div>

              {/* Textarea */}
              <textarea
                value={importText}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={`Example Q&A Format:

Q: What is the primary purpose of ARP?
A: ARP maps a known IP address to a physical MAC address on a local area network.
Unit: 3
Topic: Network Layer

Q: What is the transmission time in CSMA/CD?
A: T_trans must be greater than or equal to 2 * T_prop to ensure collision detection.
Unit: 2
Topic: MAC Protocols`}
                rows={8}
                className="w-full text-base sm:text-xs font-mono p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600"
              />

              {/* Upload file alternative */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-1 gap-1.5">
                <label className="cursor-pointer inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 font-medium">
                  <IconUpload size={14} />
                  <span>Upload .txt or .json file</span>
                  <input
                    type="file"
                    accept=".txt,.json,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {parsedPreview.length > 0 && (
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ Detected {parsedPreview.length} valid cards!
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
                <button
                  onClick={() => handleDoImport('append')}
                  disabled={parsedPreview.length === 0}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 disabled:opacity-50 transition"
                >
                  Append to Existing ({parsedPreview.length} Cards)
                </button>
                <button
                  onClick={() => handleDoImport('replace')}
                  disabled={parsedPreview.length === 0}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:opacity-50 transition"
                >
                  Replace All Cards ({parsedPreview.length} Cards)
                </button>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Export all {cards.length} questions as a backup file. You can download the JSON or copy it to your clipboard.
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
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center gap-1.5"
                >
                  {copiedExport ? <IconCheck size={14} className="text-emerald-500" /> : <IconCopy size={14} />}
                  {copiedExport ? 'Copied to Clipboard!' : 'Copy JSON'}
                </button>
                <button
                  onClick={handleDownloadFile}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition flex items-center gap-1.5"
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
                This will restore the original 50+ curated high-yield Computer Networks questions across Units 1 to 5, and reset all study repetition counters. Any custom questions will be overwritten unless exported first.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onResetDefaults();
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition flex items-center gap-1.5"
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
