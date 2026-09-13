import React, { useState, useEffect, useCallback } from 'react';
import { ViewMode, PanelData } from './types';
import { PANELS } from './data/panels';
import { Header } from './components/Header';
import { WalkthroughView } from './components/WalkthroughView';
import { OverviewGallery } from './components/OverviewGallery';
import { ContrastView } from './components/ContrastView';
import { PromptSheetView } from './components/PromptSheetView';
import { LightboxModal } from './components/LightboxModal';
import { chimePlayer } from './utils/audio';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('walkthrough');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isContemplative, setIsContemplative] = useState<boolean>(false);
  const [isPlayingPresentation, setIsPlayingPresentation] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [lightboxPanel, setLightboxPanel] = useState<PanelData | null>(null);

  const handleSelectPanel = useCallback((index: number) => {
    setCurrentIndex(index);
    if (soundEnabled) {
      chimePlayer.playReflectionChime(index);
    }
  }, [soundEnabled]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : PANELS.length - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev < PANELS.length - 1 ? prev + 1 : 0));
      } else if (e.key >= '1' && e.key <= '7') {
        const targetIdx = parseInt(e.key, 10) - 1;
        if (targetIdx >= 0 && targetIdx < PANELS.length) {
          handleSelectPanel(targetIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSelectPanel]);

  // Auto presentation timer
  useEffect(() => {
    if (!isPlayingPresentation) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev < PANELS.length - 1 ? prev + 1 : 0;
        if (soundEnabled) {
          chimePlayer.playReflectionChime(next);
        }
        return next;
      });
    }, 8500);

    return () => clearInterval(timer);
  }, [isPlayingPresentation, soundEnabled]);

  const handleOpenLightbox = (panel: PanelData) => {
    setLightboxPanel(panel);
  };

  const handleCloseLightbox = () => {
    setLightboxPanel(null);
  };

  const handleLightboxPrev = () => {
    if (!lightboxPanel) return;
    const curIdx = PANELS.findIndex((p) => p.id === lightboxPanel.id);
    const prevIdx = curIdx > 0 ? curIdx - 1 : PANELS.length - 1;
    setLightboxPanel(PANELS[prevIdx]);
    if (soundEnabled) chimePlayer.playReflectionChime(prevIdx);
  };

  const handleLightboxNext = () => {
    if (!lightboxPanel) return;
    const curIdx = PANELS.findIndex((p) => p.id === lightboxPanel.id);
    const nextIdx = curIdx < PANELS.length - 1 ? curIdx + 1 : 0;
    setLightboxPanel(PANELS[nextIdx]);
    if (soundEnabled) chimePlayer.playReflectionChime(nextIdx);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans-ui transition-colors duration-500 ${
        isContemplative
          ? 'bg-[#0a0c0f] text-[#f7efe6] selection:bg-amber-800/50'
          : 'bg-[#0e1014] text-[#f1f3f7]'
      }`}
    >
      {/* Header Bar */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        isContemplative={isContemplative}
        setIsContemplative={setIsContemplative}
        isPlayingPresentation={isPlayingPresentation}
        setIsPlayingPresentation={setIsPlayingPresentation}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {viewMode === 'walkthrough' && (
          <WalkthroughView
            panels={PANELS}
            currentIndex={currentIndex}
            onSelectPanel={handleSelectPanel}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {viewMode === 'overview' && (
          <OverviewGallery
            panels={PANELS}
            onSelectPanel={(index) => {
              handleSelectPanel(index);
              setViewMode('walkthrough');
            }}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {viewMode === 'comparison' && (
          <ContrastView
            panels={PANELS}
            onSelectPanel={(index) => {
              handleSelectPanel(index);
              setViewMode('walkthrough');
            }}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {viewMode === 'prompt-sheet' && (
          <PromptSheetView
            panels={PANELS}
            onSelectPanel={(index) => {
              handleSelectPanel(index);
              setViewMode('walkthrough');
            }}
          />
        )}
      </main>

      {/* Lightbox Modal */}
      <LightboxModal
        panel={lightboxPanel}
        onClose={handleCloseLightbox}
        onPrev={handleLightboxPrev}
        onNext={handleLightboxNext}
      />

      {/* Exhibition Footer */}
      <footer className="border-t border-stone-800/80 bg-[#090b0e] py-6 px-4 sm:px-6 text-center text-xs text-stone-400 font-sans-ui">
        <div className="max-w-5xl mx-auto space-y-2">
          <p className="font-serif-title font-semibold text-stone-300">
            Doctrinal Visual Replacements: A 7-Panel Sequence
          </p>
          <p className="font-reading text-stone-400 text-xs">
            Seven concise visual reversals based on the doctrine of Jesus Christ — subverting architectural height, royal regalia, and personal dominion into divine grace, sacrificial suffering, and servant love.
          </p>
          <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-stone-500">
            <span>Section I: Architecture (1–2)</span>
            <span>•</span>
            <span>Section II: Regalia (3–5)</span>
            <span>•</span>
            <span>Section III: Ideology (6–7)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
