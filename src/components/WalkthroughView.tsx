import React, { useState } from 'react';
import { PanelData } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Maximize2, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WalkthroughViewProps {
  panels: PanelData[];
  currentIndex: number;
  onSelectPanel: (index: number) => void;
  onOpenLightbox: (panel: PanelData) => void;
}

export const WalkthroughView: React.FC<WalkthroughViewProps> = ({
  panels,
  currentIndex,
  onSelectPanel,
  onOpenLightbox,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const currentPanel = panels[currentIndex];

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(currentPanel.prompt);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelectPanel(currentIndex - 1);
    } else {
      onSelectPanel(panels.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < panels.length - 1) {
      onSelectPanel(currentIndex + 1);
    } else {
      onSelectPanel(0);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Top Section & Pagination Tracker */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-stone-800/80">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-stone-900 border border-amber-500/30 text-amber-300 font-sans-ui">
            Section {currentPanel.sectionNumber}
          </span>
          <span className="text-sm font-medium text-stone-300 font-sans-ui">
            {currentPanel.sectionTitle}
          </span>
        </div>

        {/* 7-Step Sequence Tracker */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {panels.map((p, idx) => (
            <button
              key={p.id}
              id={`step-dot-${p.id}`}
              onClick={() => onSelectPanel(idx)}
              className={`group relative flex items-center justify-center transition-all ${
                idx === currentIndex
                  ? 'w-8 h-8 rounded-full bg-amber-500 text-stone-950 font-bold text-xs shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40'
                  : 'w-7 h-7 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700 text-xs'
              }`}
              title={`Panel ${p.id}: ${p.replacementTitle}`}
            >
              <span>{p.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Panel Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPanel.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* Title & Transformation Banner */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900/80 border border-stone-800 text-xs text-stone-400 font-sans-ui">
              <span className="line-through decoration-stone-500 text-stone-400 font-normal">
                {currentPanel.originalConcept} ({currentPanel.originalConceptSubtitle})
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-500/70" />
              <span className="text-amber-400 font-semibold uppercase tracking-wider">
                Doctrinal Replacement
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-serif-title tracking-wide text-amber-100 flex flex-wrap items-center gap-3">
              <span>{currentPanel.replacementTitle}</span>
              <span className="text-sm font-normal text-stone-400 font-sans-ui py-1 px-2.5 rounded bg-stone-900 border border-stone-800">
                Panel {currentPanel.id} of 7
              </span>
            </h2>

            <p className="text-base sm:text-lg font-reading text-amber-200/90 italic max-w-4xl">
              "{currentPanel.doctrinalThesis}"
            </p>
          </div>

          {/* Core Visual Artwork Showcase */}
          <div className="relative group rounded-2xl overflow-hidden border border-stone-800 bg-[#0d0f13] shadow-2xl">
            <div className="aspect-[16/9] w-full relative overflow-hidden bg-stone-950 flex items-center justify-center">
              <img
                src={currentPanel.imageSrc}
                alt={currentPanel.replacementTitle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-black/20 pointer-events-none" />

              {/* Overlay Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-stone-700/60 text-xs font-sans-ui font-medium text-stone-200 flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Visual Masterwork
                </span>
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  id={`btn-lightbox-${currentPanel.id}`}
                  onClick={() => onOpenLightbox(currentPanel)}
                  className="px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 backdrop-blur-md border border-stone-700 text-stone-200 hover:text-white text-xs font-sans-ui flex items-center gap-1.5 transition-all shadow-md"
                  title="Expand to Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Fullscreen
                </button>
              </div>

              {/* Bottom bar inside image */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-black/70 backdrop-blur-md border border-stone-800/80">
                <div className="text-xs text-stone-300 font-sans-ui">
                  <span className="font-semibold text-amber-300">Composition:</span> {currentPanel.visualMotif}
                </div>
                <button
                  id={`btn-quick-inspect-${currentPanel.id}`}
                  onClick={() => onOpenLightbox(currentPanel)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0 font-medium"
                >
                  <Eye className="w-3.5 h-3.5" /> View High-Res
                </button>
              </div>
            </div>
          </div>

          {/* Split Two-Column Breakdown: Doctrinal Reflection & Detailed Prompt */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Theological & Doctrinal Insight (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Doctrinal Reflection Card */}
              <div className="p-6 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs uppercase tracking-wider font-semibold font-sans-ui">
                  <BookOpen className="w-4 h-4" />
                  Theological & Doctrinal Meaning
                </div>
                <p className="font-reading text-stone-200 text-base leading-relaxed">
                  {currentPanel.theologicalReflection}
                </p>

                {/* Scriptural Foundation */}
                <div className="pt-3 border-t border-stone-800/80 space-y-2">
                  <div className="text-xs text-stone-400 font-sans-ui font-medium">
                    Scriptural Anchor:
                  </div>
                  <blockquote className="border-l-2 border-amber-500/60 pl-3 py-0.5 font-reading text-amber-200/90 text-sm italic">
                    {currentPanel.scriptureReference}
                  </blockquote>
                  <div className="text-[11px] text-stone-400 font-sans-ui">
                    Supporting references: {currentPanel.scriptureContext}
                  </div>
                </div>
              </div>

              {/* Contrast Juxtaposition Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-stone-950/70 border border-stone-800/80">
                <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-900/30 space-y-1">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-red-300/80 font-sans-ui">
                    Former / Worldly Concept
                  </div>
                  <div className="text-xs font-semibold text-stone-200">
                    {currentPanel.originalConcept}: {currentPanel.originalConceptSubtitle}
                  </div>
                  <p className="text-xs text-stone-400 leading-normal">
                    {currentPanel.contrastHighlights.former}
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-amber-950/25 border border-amber-800/40 space-y-1">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-amber-300/90 font-sans-ui">
                    Doctrinal Replacement
                  </div>
                  <div className="text-xs font-semibold text-amber-200">
                    {currentPanel.replacementTitle}
                  </div>
                  <p className="text-xs text-amber-100/80 leading-normal">
                    {currentPanel.contrastHighlights.renewed}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Prompt Details & Generation Specs (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-xl bg-stone-900/60 border border-stone-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-300 font-sans-ui">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Visual Description / Prompt
                  </div>
                  <button
                    id={`btn-copy-prompt-${currentPanel.id}`}
                    onClick={handleCopyPrompt}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-sans-ui transition-all border border-stone-700"
                  >
                    {copiedPrompt ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0b0c10] border border-stone-800 text-stone-300 text-xs leading-relaxed font-sans-ui select-all">
                  {currentPanel.prompt}
                </div>

                <div className="text-[11px] text-stone-400 space-y-1">
                  <div className="flex justify-between py-1 border-b border-stone-800/60">
                    <span className="text-stone-400">Sequence Position:</span>
                    <span className="text-stone-200 font-semibold">Panel #{currentPanel.id}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-800/60">
                    <span className="text-stone-400">Formal Title:</span>
                    <span className="text-amber-300 font-serif-title">{currentPanel.replacementTitle}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-400">Aspect Ratio:</span>
                    <span className="text-stone-200">16:9 Landscape Exhibition</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-800/80">
            <button
              id="btn-prev-panel"
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 hover:text-white text-sm font-sans-ui transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Panel</span>
            </button>

            <div className="text-xs text-stone-400 font-sans-ui hidden sm:block">
              Use <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">←</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">→</kbd> to navigate
            </div>

            <button
              id="btn-next-panel"
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm font-sans-ui transition-all shadow-md shadow-amber-500/10"
            >
              <span>Next Panel</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="pt-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-sans-ui mb-3">
              Sequence Overview (Jump to any panel):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {panels.map((p, idx) => (
                <button
                  key={p.id}
                  id={`thumb-panel-${p.id}`}
                  onClick={() => onSelectPanel(idx)}
                  className={`group relative text-left rounded-lg overflow-hidden border transition-all ${
                    idx === currentIndex
                      ? 'border-amber-400 ring-2 ring-amber-400/30'
                      : 'border-stone-800 hover:border-stone-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-[16/10] w-full relative bg-stone-900">
                    <img
                      src={p.imageSrc}
                      alt={p.replacementTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-amber-300">
                      {p.id}
                    </div>
                  </div>
                  <div className="p-1.5 bg-stone-900/90 truncate">
                    <div className="text-[10px] font-medium text-stone-200 truncate font-serif-title">
                      {p.replacementTitle}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
