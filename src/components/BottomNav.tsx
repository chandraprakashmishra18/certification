import React from 'react';
import { ActiveScreen } from '../types';

interface BottomNavProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenAlerts: () => void;
  alertCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onNavigate,
  onOpenAlerts,
  alertCount = 3
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#0A0A0B]/95 backdrop-blur-xl border-t border-[#222225] shadow-[0_-4px_24px_rgba(0,0,0,0.7)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {/* Tab 1: New Screen */}
        <button
          onClick={() => onNavigate('new-screening')}
          className={`flex flex-col items-center justify-center min-w-[58px] min-h-[44px] transition-colors cursor-pointer ${
            activeScreen === 'new-screening'
              ? 'text-primary font-black'
              : 'text-on-surface-variant hover:text-on-surface font-bold'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            document_scanner
          </span>
          <span className="font-badge-label mt-1 uppercase tracking-[0.12em] font-extrabold">
            New Screen
          </span>
        </button>

        {/* Tab 2: Command Center (Initial Screen) */}
        <button
          onClick={() => onNavigate('command')}
          className={`flex flex-col items-center justify-center min-w-[58px] min-h-[44px] transition-colors cursor-pointer ${
            activeScreen === 'command'
              ? 'text-primary font-black'
              : 'text-on-surface-variant hover:text-on-surface font-bold'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            dashboard
          </span>
          <span className="font-badge-label mt-1 uppercase tracking-[0.12em] font-extrabold">
            Command
          </span>
        </button>

        {/* Tab 3: Forensics / Explainable Risk */}
        <button
          onClick={() => onNavigate('explainable-risk')}
          className={`flex flex-col items-center justify-center min-w-[58px] min-h-[44px] transition-colors cursor-pointer relative ${
            activeScreen === 'explainable-risk'
              ? 'text-primary font-black'
              : 'text-on-surface-variant hover:text-on-surface font-bold'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            radar
          </span>
          <span className="font-badge-label mt-1 uppercase tracking-[0.12em] font-extrabold">
            Forensics
          </span>
          {activeScreen === 'explainable-risk' && (
            <span className="w-1.5 h-1.5 rounded-full bg-primary absolute -bottom-1"></span>
          )}
        </button>

        {/* Tab 4: History */}
        <button
          onClick={() => onNavigate('history')}
          className={`flex flex-col items-center justify-center min-w-[58px] min-h-[44px] transition-colors cursor-pointer ${
            activeScreen === 'history'
              ? 'text-primary font-black'
              : 'text-on-surface-variant hover:text-on-surface font-bold'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">
            history
          </span>
          <span className="font-badge-label mt-1 uppercase tracking-[0.12em] font-extrabold">
            History
          </span>
        </button>

        {/* Tab 5: Alerts (Interactive Drawer Trigger) */}
        <button
          onClick={onOpenAlerts}
          className="flex flex-col items-center justify-center min-w-[58px] min-h-[44px] text-on-surface-variant hover:text-primary transition-colors cursor-pointer relative"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[22px]">
              notifications
            </span>
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-error text-on-error font-badge-label text-[9px] px-1 rounded-full leading-tight font-black">
                {alertCount}
              </span>
            )}
          </div>
          <span className="font-badge-label mt-1 uppercase tracking-[0.12em] font-extrabold">
            Alerts
          </span>
        </button>
      </div>
    </nav>
  );
};
