import React from 'react';
import { ViewMode } from '../types';
import { Eye, LayoutGrid, Columns2, FileText, Sparkles, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isContemplative: boolean;
  setIsContemplative: (val: boolean) => void;
  isPlayingPresentation: boolean;
  setIsPlayingPresentation: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  isContemplative,
  setIsContemplative,
  isPlayingPresentation,
  setIsPlayingPresentation,
  soundEnabled,
  setSoundEnabled,
}) => {
  return (
    <header className="border-b border-stone-800/80 bg-[#12141a]/95 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title & Badge */}
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-10 h-10 rounded-lg bg-stone-900 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-[10px] font-sans-ui tracking-wider uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300/90 border border-amber-500/20 font-semibold">
                7-Panel Sequence
              </span>
              <span className="text-[11px] text-stone-400 font-sans-ui hidden sm:inline">
                Theological & Visual Replacements
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold font-serif-title tracking-wide text-stone-100">
              Doctrinal Visual Replacements
            </h1>
          </div>
        </div>

        {/* Center / Navigation tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-900/90 rounded-xl border border-stone-800 text-xs font-sans-ui overflow-x-auto max-w-full">
          <button
            id="tab-walkthrough"
            onClick={() => setViewMode('walkthrough')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              viewMode === 'walkthrough'
                ? 'bg-amber-600/20 text-amber-200 font-semibold border border-amber-500/40 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Walkthrough
          </button>

          <button
            id="tab-overview"
            onClick={() => setViewMode('overview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              viewMode === 'overview'
                ? 'bg-amber-600/20 text-amber-200 font-semibold border border-amber-500/40 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Gallery (7 Panels)
          </button>

          <button
            id="tab-comparison"
            onClick={() => setViewMode('comparison')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              viewMode === 'comparison'
                ? 'bg-amber-600/20 text-amber-200 font-semibold border border-amber-500/40 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            <Columns2 className="w-3.5 h-3.5" />
            Doctrinal Shifts
          </button>

          <button
            id="tab-prompt-sheet"
            onClick={() => setViewMode('prompt-sheet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              viewMode === 'prompt-sheet'
                ? 'bg-amber-600/20 text-amber-200 font-semibold border border-amber-500/40 shadow-sm'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Prompts & Study
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {viewMode === 'walkthrough' && (
            <button
              id="btn-presentation-mode"
              onClick={() => setIsPlayingPresentation(!isPlayingPresentation)}
              title={isPlayingPresentation ? 'Pause presentation' : 'Play auto presentation'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-sans-ui border transition-all ${
                isPlayingPresentation
                  ? 'bg-amber-500/20 border-amber-400 text-amber-200 animate-pulse'
                  : 'bg-stone-900 border-stone-800 text-stone-300 hover:bg-stone-800'
              }`}
            >
              {isPlayingPresentation ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Auto-play</span>
                </>
              )}
            </button>
          )}

          <button
            id="btn-contemplative-mode"
            onClick={() => setIsContemplative(!isContemplative)}
            title="Toggle contemplative viewing atmosphere"
            className={`p-1.5 rounded-lg border text-xs transition-all ${
              isContemplative
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
          >
            <span className="text-xs px-1">Warm Light</span>
          </button>

          <button
            id="btn-sound-toggle"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute chimes' : 'Enable peaceful chime on transitions'}
            className={`p-1.5 rounded-lg border text-xs transition-all ${
              soundEnabled
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-stone-900 text-stone-500 border-stone-800 hover:text-stone-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
