import React, { useState } from 'react';
import { PanelData } from '../types';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';

interface ContrastViewProps {
  panels: PanelData[];
  onSelectPanel: (index: number) => void;
  onOpenLightbox: (panel: PanelData) => void;
}

export const ContrastView: React.FC<ContrastViewProps> = ({
  panels,
  onSelectPanel,
  onOpenLightbox,
}) => {
  const [selectedSection, setSelectedSection] = useState<string>('ALL');

  const filteredPanels = selectedSection === 'ALL'
    ? panels
    : panels.filter((p) => p.sectionNumber === selectedSection);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Title & Section Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-stone-100">
            Doctrinal Contrasts & Transformations
          </h2>
          <p className="font-reading text-stone-300 text-sm sm:text-base mt-1">
            Analyzing the direct reversal from worldly archetypes of dominion to Christ’s doctrine of grace and service.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-900 rounded-xl border border-stone-800 text-xs font-sans-ui">
          <button
            id="filter-all"
            onClick={() => setSelectedSection('ALL')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedSection === 'ALL'
                ? 'bg-amber-600/30 text-amber-200 font-semibold border border-amber-500/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            All 7 Shifts
          </button>
          <button
            id="filter-sec-1"
            onClick={() => setSelectedSection('I')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedSection === 'I'
                ? 'bg-amber-600/30 text-amber-200 font-semibold border border-amber-500/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            I. Architecture
          </button>
          <button
            id="filter-sec-2"
            onClick={() => setSelectedSection('II')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedSection === 'II'
                ? 'bg-amber-600/30 text-amber-200 font-semibold border border-amber-500/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            II. Regalia
          </button>
          <button
            id="filter-sec-3"
            onClick={() => setSelectedSection('III')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedSection === 'III'
                ? 'bg-amber-600/30 text-amber-200 font-semibold border border-amber-500/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            III. Ideology
          </button>
        </div>
      </div>

      {/* Comparison Rows */}
      <div className="space-y-6">
        {filteredPanels.map((panel) => {
          const panelIndex = panels.findIndex((p) => p.id === panel.id);

          return (
            <div
              key={panel.id}
              id={`contrast-row-${panel.id}`}
              className="rounded-2xl border border-stone-800 bg-stone-900/40 overflow-hidden shadow-lg hover:border-stone-700 transition-all"
            >
              {/* Card Header Strip */}
              <div className="px-5 py-3 bg-stone-900/90 border-b border-stone-800/80 flex items-center justify-between text-xs font-sans-ui">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                    Panel {panel.id}
                  </span>
                  <span className="text-stone-400 font-medium">
                    Section {panel.sectionNumber}: {panel.sectionTitle}
                  </span>
                </div>
                <button
                  id={`btn-contrast-view-panel-${panel.id}`}
                  onClick={() => onSelectPanel(panelIndex)}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <span>Explore Walkthrough</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Juxtaposition Grid */}
              <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left: Worldly Paradigm (4 cols) */}
                <div className="lg:col-span-4 p-4 rounded-xl bg-red-950/20 border border-red-900/30 space-y-2">
                  <div className="text-[11px] font-sans-ui font-semibold uppercase tracking-wider text-red-300/80 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                    Worldly Paradigm
                  </div>
                  <h4 className="text-lg font-bold font-serif-title text-stone-200">
                    {panel.originalConcept}
                  </h4>
                  <div className="text-xs text-stone-400 font-sans-ui">
                    Subtype: {panel.originalConceptSubtitle}
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed pt-2 border-t border-red-900/20">
                    {panel.contrastHighlights.former}
                  </p>
                </div>

                {/* Center: Shift Icon & Thumbnail (4 cols) */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="relative w-full max-w-xs aspect-video rounded-xl overflow-hidden border border-stone-700 shadow-md group cursor-pointer"
                       onClick={() => onOpenLightbox(panel)}>
                    <img
                      src={panel.imageSrc}
                      alt={panel.replacementTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="px-2 py-1 rounded bg-black/75 text-[10px] text-stone-200 font-sans-ui opacity-0 group-hover:opacity-100 transition-opacity">
                        Click to enlarge
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest font-sans-ui">
                    <span>Replaced By Doctrine</span>
                    <ArrowRight className="w-4 h-4 text-amber-400 animate-pulse" />
                  </div>
                </div>

                {/* Right: Jesus's Doctrinal Replacement (4 cols) */}
                <div className="lg:col-span-4 p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 space-y-2">
                  <div className="text-[11px] font-sans-ui font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Jesus’s Doctrine
                  </div>
                  <h4 className="text-lg font-bold font-serif-title text-amber-200">
                    {panel.replacementTitle}
                  </h4>
                  <div className="text-xs text-amber-300/80 font-sans-ui">
                    Manifestation: {panel.replacementConcept}
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed pt-2 border-t border-amber-900/30">
                    {panel.contrastHighlights.renewed}
                  </p>
                </div>
              </div>

              {/* Bottom Scriptural Quote */}
              <div className="px-6 py-3 bg-stone-950/60 border-t border-stone-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-stone-400 font-sans-ui">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-reading italic text-amber-200/90">{panel.scriptureReference}</span>
                </div>
                <div className="text-stone-500 font-sans-ui text-[11px] shrink-0">
                  Ref: {panel.scriptureContext}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
