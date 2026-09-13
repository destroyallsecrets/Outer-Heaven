import React, { useState } from 'react';
import { PanelData } from '../types';
import { Copy, Check, Sparkles, FileCode, Download, BookText } from 'lucide-react';

interface PromptSheetViewProps {
  panels: PanelData[];
  onSelectPanel: (index: number) => void;
}

export const PromptSheetView: React.FC<PromptSheetViewProps> = ({
  panels,
  onSelectPanel,
}) => {
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopyIndividual = async (id: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyAllMarkdown = async () => {
    const fullMarkdown = `# 7-Panel Sequence: Doctrinal Visual Replacements Based on Jesus's Doctrine\n\n` +
      panels.map((p) => (
        `### Panel ${p.id}: ${p.replacementTitle}\n` +
        `**Section**: ${p.sectionNumber}. ${p.sectionTitle}\n` +
        `**Transition**: ${p.originalConcept} (${p.originalConceptSubtitle}) → ${p.replacementConcept}\n` +
        `**Visual Description / Prompt**:\n${p.prompt}\n\n` +
        `**Doctrinal Thesis**: ${p.doctrinalThesis}\n` +
        `**Scriptural Anchor**: ${p.scriptureReference}\n\n---\n`
      )).join('\n');

    try {
      await navigator.clipboard.writeText(fullMarkdown);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadMarkdown = () => {
    const fullMarkdown = `# 7-Panel Sequence: Doctrinal Visual Replacements Based on Jesus's Doctrine\n\n` +
      panels.map((p) => (
        `### Panel ${p.id}: ${p.replacementTitle}\n` +
        `**Section**: ${p.sectionNumber}. ${p.sectionTitle}\n` +
        `**Transition**: ${p.originalConcept} (${p.originalConceptSubtitle}) → ${p.replacementConcept}\n` +
        `**Visual Description / Prompt**:\n${p.prompt}\n\n` +
        `**Doctrinal Thesis**: ${p.doctrinalThesis}\n` +
        `**Scriptural Anchor**: ${p.scriptureReference}\n\n---\n`
      )).join('\n');

    const blob = new Blob([fullMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'doctrinal-visual-replacements-7-panels.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header & Export Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans-ui mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prompt Sheet & Theological Codex</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-stone-100">
            Visual Descriptions & Prompts
          </h2>
          <p className="font-reading text-stone-300 text-sm sm:text-base mt-1">
            The complete 7-panel prompt sequence formatted for generative art platforms (Midjourney, DALL-E, Imagen) and theological study.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            id="btn-copy-all-prompts"
            onClick={handleCopyAllMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs font-sans-ui transition-all shadow-md"
          >
            {copiedAll ? (
              <>
                <Check className="w-4 h-4 text-stone-950" />
                <span>Copied All Markdown</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Full Sequence</span>
              </>
            )}
          </button>

          <button
            id="btn-download-markdown"
            onClick={handleDownloadMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white text-xs font-sans-ui transition-all"
            title="Download as Markdown file"
          >
            <Download className="w-4 h-4" />
            <span>Export .md</span>
          </button>
        </div>
      </div>

      {/* Prompts Listing */}
      <div className="space-y-6">
        {panels.map((panel, idx) => (
          <div
            key={panel.id}
            id={`prompt-block-${panel.id}`}
            className="p-5 sm:p-6 rounded-2xl bg-stone-900/60 border border-stone-800/80 space-y-4 hover:border-stone-700 transition-all"
          >
            {/* Top Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-800/80">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold font-sans-ui border border-amber-500/30">
                  {panel.id}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-sans-ui">
                  Section {panel.sectionNumber}: {panel.sectionTitle}
                </span>
                <span className="text-stone-600 hidden sm:inline">•</span>
                <span className="text-xs text-stone-300 font-serif-title font-semibold">
                  {panel.replacementTitle}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id={`btn-jump-panel-${panel.id}`}
                  onClick={() => onSelectPanel(idx)}
                  className="text-xs text-stone-400 hover:text-amber-300 font-sans-ui transition-colors px-2 py-1 rounded bg-stone-800/60"
                >
                  View Artwork
                </button>
                <button
                  id={`btn-copy-prompt-single-${panel.id}`}
                  onClick={() => handleCopyIndividual(panel.id, panel.prompt)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-sans-ui border border-stone-700 transition-all"
                >
                  {copiedId === panel.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Prompt Text Box */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-sans-ui uppercase tracking-wider text-amber-400/90 font-semibold">
                Prompt / Written Description:
              </div>
              <div className="p-4 rounded-xl bg-[#0b0c10] border border-stone-800/80 font-sans-ui text-stone-200 text-xs sm:text-sm leading-relaxed select-all">
                {panel.prompt}
              </div>
            </div>

            {/* Core Doctrinal Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800/60">
                <span className="font-semibold text-stone-400 block mb-1 font-sans-ui">
                  Doctrinal Thesis:
                </span>
                <span className="font-reading text-stone-300">
                  {panel.doctrinalThesis}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-stone-950/60 border border-stone-800/60">
                <span className="font-semibold text-stone-400 block mb-1 font-sans-ui">
                  Scriptural Anchor:
                </span>
                <span className="font-reading italic text-amber-200/90">
                  {panel.scriptureReference}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
