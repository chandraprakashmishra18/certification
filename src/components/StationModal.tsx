import React from 'react';
import { ActiveScreen } from '../types';

interface StationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const StationModal: React.FC<StationModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#161619] rounded-2xl border border-[#222225] shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#222225] bg-[#111113]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">
              settings_input_component
            </span>
            <div className="flex flex-col">
              <span className="font-badge-label text-primary uppercase text-[9px] font-black tracking-widest">
                FAST-TRACK STATION 04
              </span>
              <h2 className="font-headline-sm text-primary text-[15px] font-black">
                Verification Station Protocol
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#161619] border border-[#222225] flex items-center justify-center text-on-surface-variant hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 flex flex-col gap-3">
          <p className="font-body-sm text-on-surface-variant text-[12px] leading-relaxed font-medium">
            Station 04 is calibrated and synchronized with the biometric gateway. Select a workflow to begin border screening or review pending dossiers.
          </p>

          <div className="grid grid-cols-1 gap-2 pt-1">
            <button
              onClick={() => {
                onClose();
                onNavigate('new-screening');
              }}
              className="p-3 bg-[#111113] hover:bg-[#1E1E22] rounded-xl border border-[#222225] hover:border-primary/40 flex items-center justify-between text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#161619] border border-[#222225] text-primary flex items-center justify-center font-black">
                  <span className="material-symbols-outlined text-[20px]">document_scanner</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[13px] text-on-surface font-black group-hover:text-primary transition-colors">
                    Launch New Screening Scanner
                  </span>
                  <span className="font-mono-sm text-[10px] text-on-surface-variant font-bold">
                    Optical OCR + 60 FPS Biometrics + 8-Stage Pipeline
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary text-[18px]">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigate('explainable-risk');
              }}
              className="p-3 bg-[#111113] hover:bg-[#1E1E22] rounded-xl border border-[#222225] hover:border-tertiary/40 flex items-center justify-between text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#161619] border border-[#222225] text-tertiary flex items-center justify-center font-black">
                  <span className="material-symbols-outlined text-[20px]">rule_folder</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[13px] text-on-surface font-black group-hover:text-tertiary transition-colors">
                    Inspect Pending Case #IS-8942
                  </span>
                  <span className="font-mono-sm text-[10px] text-on-surface-variant font-bold">
                    SHAP Waterfall + Biometric Pair + Officer Action Center
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-tertiary text-[18px]">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-[#222225] bg-[#111113] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-[#161619] hover:bg-[#222225] text-on-surface hover:text-white font-mono-sm text-[11px] font-bold transition-colors cursor-pointer border border-[#222225]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
