import React from 'react';
import { SECURITY_ALERTS } from '../data/mockData';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAlertCase?: (caseId: string) => void;
}

export const AlertsModal: React.FC<AlertsModalProps> = ({
  isOpen,
  onClose,
  onSelectAlertCase
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#161619] rounded-2xl border border-[#222225] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#222225] bg-[#111113]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-[20px]">
              notifications_active
            </span>
            <div className="flex flex-col">
              <h2 className="font-headline-sm text-primary text-[15px] font-black">
                Security Alert Center
              </h2>
              <span className="font-mono-sm text-[10px] text-on-surface-variant font-bold">
                LIVE CLUSTER FEED • 3 ACTIVE DISCREPANCIES
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#161619] border border-[#222225] flex items-center justify-center text-on-surface-variant hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex flex-col gap-3">
          {SECURITY_ALERTS.map((alert) => (
            <div
              key={alert.id}
              onClick={() => {
                if (alert.tagId.includes('#IS-9002') && onSelectAlertCase) {
                  onSelectAlertCase('#IS-8940');
                  onClose();
                }
              }}
              className="flex flex-col p-3.5 bg-[#111113] rounded-xl border border-[#222225] hover:border-[#71717A] transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      alert.severity === 'high'
                        ? 'bg-error text-white font-black'
                        : alert.severity === 'medium'
                        ? 'bg-tertiary text-[#0A0A0B] font-black'
                        : 'bg-[#1E1E22] text-primary font-black'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {alert.severity === 'high'
                        ? 'priority_high'
                        : alert.severity === 'medium'
                        ? 'fingerprint'
                        : 'sync'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-badge-label font-black tracking-widest uppercase text-[9px] ${
                          alert.severity === 'high'
                            ? 'text-error'
                            : alert.severity === 'medium'
                            ? 'text-tertiary'
                            : 'text-primary'
                        }`}
                      >
                        {alert.category}
                      </span>
                      <span className="font-mono-sm text-[10px] text-on-surface-variant font-bold">
                        {alert.timeAgo}
                      </span>
                    </div>
                    <p className="font-body-sm text-on-surface mt-0.5 leading-snug font-bold text-[12px]">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="font-mono-sm text-primary bg-[#161619] border border-[#222225] px-1.5 py-0.5 rounded text-[10px] font-black">
                        {alert.tagId}
                      </span>
                      <span className="font-badge-label text-on-surface-variant text-[9px] font-bold">
                        {alert.detail}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-[#222225] bg-[#111113] flex items-center justify-between">
          <span className="font-mono-sm text-[10px] text-outline font-bold">
            AUTHORIZATION: LEVEL 3 CHIEF INSPECTOR
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-[#E0E0E0] hover:bg-white text-[#0A0A0B] font-mono-sm text-[11px] font-black transition-colors cursor-pointer"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
