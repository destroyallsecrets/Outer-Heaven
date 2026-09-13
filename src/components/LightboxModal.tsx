import React, { useEffect } from 'react';
import { PanelData } from '../types';
import { X, ChevronLeft, ChevronRight, Copy, Check, Sparkles, BookOpen } from 'lucide-react';

interface LightboxModalProps {
  panel: PanelData | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  panel,
  onClose,
  onPrev,
  onNext,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!panel) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(panel.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      {/* Close button */}
      <button
        id="btn-close-lightbox"
        onClick={onClose}
        className="fixed top-4 right-4 z-50 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors"
        title="Close (Esc)"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Nav buttons */}
      <button
        id="btn-lightbox-prev"
        onClick={onPrev}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors hidden sm:flex items-center justify-center"
        title="Previous (Left Arrow)"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        id="btn-lightbox-next"
        onClick={onNext}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700 transition-colors hidden sm:flex items-center justify-center"
        title="Next (Right Arrow)"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content Container */}
      <div className="w-full max-w-5xl my-auto space-y-4">
        {/* Main Artwork Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 shadow-2xl flex items-center justify-center max-h-[75vh]">
          <img
            src={panel.imageSrc}
            alt={panel.replacementTitle}
            referrerPolicy="no-referrer"
            className="w-full max-h-[75vh] object-contain"
          />
        </div>

        {/* Info card beneath */}
        <div className="p-5 rounded-xl bg-stone-900/90 border border-stone-800 text-stone-200 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-stone-800">
            <div>
              <div className="text-xs text-amber-400 font-sans-ui font-semibold uppercase tracking-wider">
                Panel {panel.id} of 7 • Section {panel.sectionNumber}: {panel.sectionTitle}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-stone-100">
                {panel.replacementTitle}
              </h3>
            </div>

            <button
              id="btn-lightbox-copy-prompt"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-sans-ui border border-stone-700 transition-all shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Prompt</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>

          <p className="font-reading text-sm sm:text-base text-stone-300 italic">
            "{panel.doctrinalThesis}"
          </p>

          <div className="text-xs text-stone-400 font-sans-ui bg-stone-950/80 p-3 rounded-lg border border-stone-800/80">
            <span className="text-amber-300 font-semibold mr-1">Visual Prompt:</span>
            {panel.prompt}
          </div>
        </div>
      </div>
    </div>
  );
};
