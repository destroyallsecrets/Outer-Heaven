import React, { useState } from 'react';
import { PanelData } from '../types';
import { SECTION_GROUPINGS } from '../data/panels';
import { ArrowRight, Copy, Check, Eye, Maximize2, Sparkles, BookOpen } from 'lucide-react';

interface OverviewGalleryProps {
  panels: PanelData[];
  onSelectPanel: (index: number) => void;
  onOpenLightbox: (panel: PanelData) => void;
}

export const OverviewGallery: React.FC<OverviewGalleryProps> = ({
  panels,
  onSelectPanel,
  onOpenLightbox,
}) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopyPrompt = async (panel: PanelData, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(panel.prompt);
      setCopiedId(panel.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Hero Exhibition Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-amber-500/30 text-xs text-amber-300 font-sans-ui">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>7-Panel Thematic Progression</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-title tracking-wide text-stone-100">
          The Sequence of Divine Reversals
        </h2>
        <p className="font-reading text-stone-300 text-base sm:text-lg leading-relaxed">
          Explore the concise visual and doctrinal replacements based on Jesus’s teachings—tracing the progression from monumental stone architecture to royal regalia, down to the inner disposition of the human heart.
        </p>
      </div>

      {/* Sections Breakdown */}
      {SECTION_GROUPINGS.map((sec) => {
        const sectionPanels = panels.filter((p) => sec.panelIds.includes(p.id));

        return (
          <section key={sec.number} className="space-y-6">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-3 border-b border-stone-800/80 gap-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-stone-900 border border-amber-500/30 flex items-center justify-center font-bold text-amber-300 font-serif-title text-sm">
                  {sec.number}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-stone-100">
                    {sec.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 font-sans-ui">
                    {sec.subtitle}
                  </p>
                </div>
              </div>
              <span className="text-xs text-stone-400 font-sans-ui self-start sm:self-auto">
                {sectionPanels.length} {sectionPanels.length === 1 ? 'Panel' : 'Panels'}
              </span>
            </div>

            {/* Panels Grid */}
            <div className={`grid grid-cols-1 ${sectionPanels.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6`}>
              {sectionPanels.map((panel) => {
                const panelIndex = panels.findIndex((p) => p.id === panel.id);

                return (
                  <div
                    key={panel.id}
                    id={`gallery-card-${panel.id}`}
                    className="group rounded-2xl overflow-hidden bg-stone-900/50 border border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-2xl"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950">
                      <img
                        src={panel.imageSrc}
                        alt={panel.replacementTitle}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

                      {/* Number Tag */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-stone-700 text-xs font-bold text-amber-300 font-sans-ui">
                        Panel {panel.id}
                      </div>

                      {/* Lightbox Trigger */}
                      <button
                        id={`btn-card-expand-${panel.id}`}
                        onClick={() => onOpenLightbox(panel)}
                        className="absolute top-3 right-3 p-1.5 rounded-md bg-black/70 hover:bg-black/90 backdrop-blur-md border border-stone-700 text-stone-300 hover:text-white transition-colors"
                        title="View Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Doctrinal Shift Badge */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-sans-ui">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/70 backdrop-blur-md border border-stone-800 text-stone-300 truncate max-w-full">
                          <span className="line-through decoration-stone-500 text-stone-400 truncate">
                            {panel.originalConcept}
                          </span>
                          <ArrowRight className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="text-amber-300 font-semibold truncate">
                            {panel.replacementConcept}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="text-[11px] text-amber-400/90 font-semibold tracking-wider uppercase font-sans-ui">
                          {panel.originalConceptSubtitle} → Doctrinal Replacement
                        </div>
                        <h4 className="text-lg font-bold font-serif-title text-stone-100 group-hover:text-amber-200 transition-colors">
                          {panel.replacementTitle}
                        </h4>
                        <p className="font-reading text-stone-300 text-xs line-clamp-3 leading-relaxed">
                          {panel.doctrinalThesis}
                        </p>
                      </div>

                      {/* Action Footer */}
                      <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                        <button
                          id={`btn-copy-card-prompt-${panel.id}`}
                          onClick={(e) => handleCopyPrompt(panel, e)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700/80 text-stone-300 hover:text-white text-xs font-sans-ui transition-colors border border-stone-700/60"
                          title="Copy written description / image prompt"
                        >
                          {copiedId === panel.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Prompt</span>
                            </>
                          )}
                        </button>

                        <button
                          id={`btn-inspect-walkthrough-${panel.id}`}
                          onClick={() => onSelectPanel(panelIndex)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold font-sans-ui border border-amber-500/30 transition-colors"
                        >
                          <span>Explore Panel</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
