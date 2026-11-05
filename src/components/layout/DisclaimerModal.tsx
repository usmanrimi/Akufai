'use client';

import React, { useEffect } from 'react';
import { X, ShieldAlert } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  hasAccepted: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export default function DisclaimerModal({
  isOpen,
  hasAccepted,
  onAccept,
  onClose,
}: DisclaimerModalProps) {
  // Lock background page scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && hasAccepted) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, hasAccepted, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#041f12]/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-modal-title"
      aria-describedby="disclaimer-modal-description"
      onClick={() => {
        if (hasAccepted) onClose();
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-b from-[#fffdf7] via-[#fcf6e3] to-[#f8efcf] border-2 border-[#b6960b] shadow-[0_28px_70px_-12px_rgba(0,0,0,0.65),0_0_32px_rgba(182,150,11,0.28)] overflow-hidden transition-all"
      >
        {/* Top Brand Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#036c3e] via-[#d4b429] to-[#036c3e]" />

        {/* Header Row */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 border-b border-[#dec668]/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4b429] to-[#b6960b] text-[#042f1b] flex items-center justify-center shadow-xs shrink-0">
              <ShieldAlert className="w-4 h-4 stroke-[2.2]" />
            </div>
            <h2
              id="disclaimer-modal-title"
              className="text-xl sm:text-2xl font-serif font-bold text-[#9e8109] tracking-tight"
            >
              Disclaimer
            </h2>
          </div>

          {hasAccepted && (
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-[#042f1b] hover:bg-[#f3e4b2]/60 transition-colors cursor-pointer"
              aria-label="Close disclaimer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body Content (Exact Text from Provided Screenshot) */}
        <div className="px-6 sm:px-8 py-6 sm:py-7">
          <p
            id="disclaimer-modal-description"
            className="text-sm sm:text-[15.5px] text-[#1e293b] leading-[1.75] font-normal"
          >
            The views and opinions expressed on this website are solely those of the authors and are provided for informational purposes only. They should not be relied upon as financial or investment advice. Akufai Capital &amp; Equities shall not be held liable for any decisions or actions taken based on the content of this website. Users are strongly encouraged to conduct their own research and consult a qualified financial advisor before making any investment or financial decisions.
          </p>
        </div>

        {/* Footer / Action Row */}
        <div className="px-6 sm:px-8 py-4 sm:py-5 bg-[#f7ebc4]/55 border-t border-[#dec668]/70 flex items-center justify-end">
          <button
            type="button"
            onClick={onAccept}
            className="w-full sm:w-auto min-w-[168px] px-7 py-3 rounded-lg bg-gradient-to-r from-[#c4a20e] via-[#b6960b] to-[#9e8109] hover:from-[#036c3e] hover:via-[#02522f] hover:to-[#042f1b] text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_6px_18px_-4px_rgba(182,150,11,0.55)] hover:shadow-[0_8px_22px_-4px_rgba(3,108,62,0.5)] border border-[#e5c846]/60 transition-all duration-300 active:scale-[0.98] cursor-pointer"
          >
            I UNDERSTAND
          </button>
        </div>
      </div>
    </div>
  );
}
