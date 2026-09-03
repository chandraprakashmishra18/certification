import React from 'react';
import { ActiveScreen } from '../types';
import { APP_ASSETS } from '../data/mockData';

interface HeaderProps {
  activeScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenAlerts?: () => void;
  alertCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  onOpenAlerts,
  alertCount = 3
}) => {
  const getScreenSubtitle = () => {
    switch (activeScreen) {
      case 'command':
        return '// Command Center';
      case 'explainable-risk':
        return '// Forensics & Risk';
      case 'new-screening':
        return '// New Screening';
      case 'history':
        return '// History';
      default:
        return '// Command Center';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-[#222225] shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
      <div className="max-w-7xl mx-auto h-24 px-4 sm:px-6 flex flex-col justify-center gap-1">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => onNavigate('command')}
          >
            <img
              alt="IDENTI-SHIELD Emblem"
              className="h-8 w-auto object-contain shrink-0"
              src={APP_ASSETS.emblem}
            />
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-headline-sm text-[17px] uppercase tracking-wider text-primary font-black">
                  IDENTI-SHIELD
                </span>
                <span className="font-mono-sm text-[12px] text-on-surface-variant font-bold">
                  {getScreenSubtitle()}
                </span>
              </div>
              <span className="font-badge-label text-[10px] tracking-[0.16em] text-on-surface-variant uppercase font-extrabold">
                AI SCREENING PLATFORM
              </span>
            </div>
          </div>

          {/* Officer Info & Action */}
          <div className="flex items-center gap-3">
            {/* Desktop Navigation Quick Switcher */}
            <nav className="hidden md:flex items-center gap-1 bg-[#161619] p-1 rounded-lg border border-[#222225] mr-2">
              <button
                onClick={() => onNavigate('command')}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                  activeScreen === 'command'
                    ? 'bg-primary-container text-on-primary-container font-black shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-semibold'
                }`}
              >
                Command Center
              </button>
              <button
                onClick={() => onNavigate('explainable-risk')}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                  activeScreen === 'explainable-risk'
                    ? 'bg-primary-container text-on-primary-container font-black shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-semibold'
                }`}
              >
                Explainable Risk
              </button>
              <button
                onClick={() => onNavigate('new-screening')}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                  activeScreen === 'new-screening'
                    ? 'bg-primary-container text-on-primary-container font-black shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-semibold'
                }`}
              >
                New Screen
              </button>
              <button
                onClick={() => onNavigate('history')}
                className={`px-3 py-1 rounded text-xs font-mono transition-all cursor-pointer ${
                  activeScreen === 'history'
                    ? 'bg-primary-container text-on-primary-container font-black shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-semibold'
                }`}
              >
                Audit Logs
              </button>
            </nav>

            <div className="hidden sm:flex flex-col items-end leading-tight text-right">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(48,209,88,0.9)] animate-pulse"></span>
                <span className="font-badge-label text-secondary font-black tracking-wider">
                  SYSTEM OPERATIONAL
                </span>
              </div>
              <span className="font-mono-sm text-on-surface font-bold">OFFICER JENKINS • ID: BD-8492</span>
              <span className="font-badge-label text-outline uppercase font-extrabold">AUTHORIZED OFFICER</span>
            </div>

            {/* Officer Avatar / Profile Trigger */}
            <div
              onClick={onOpenAlerts}
              className="relative w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 cursor-pointer shadow-sm hover:ring-2 hover:ring-primary-container transition-all"
              title="Click to view Security Alerts & Audit"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                person
              </span>
              {alertCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-on-error font-badge-label text-[9px] px-1 rounded-full border border-[#0A0A0B] font-black">
                  {alertCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Security / Legal Status Ticker Bar */}
        <div className="flex items-center justify-between px-2.5 py-1 bg-[#161619] rounded border border-[#222225]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-tertiary text-[14px]">
              gavel
            </span>
            <span className="font-badge-label text-tertiary tracking-[0.14em] uppercase font-black">
              CLASSIFIED / DEMO SIMULATION
            </span>
          </div>
          <span className="font-badge-label text-primary tracking-[0.14em] uppercase font-black">
            HUMAN-IN-THE-LOOP MANDATORY
          </span>
        </div>
      </div>
    </header>
  );
};
