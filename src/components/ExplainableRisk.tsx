import React, { useState } from 'react';
import { ScreeningCase, ActiveScreen } from '../types';
import { APP_ASSETS } from '../data/mockData';

interface ExplainableRiskProps {
  currentCase: ScreeningCase;
  onNavigate: (screen: ActiveScreen) => void;
  onCaseUpdate?: (updatedCase: ScreeningCase) => void;
}

export const ExplainableRisk: React.FC<ExplainableRiskProps> = ({
  currentCase,
  onNavigate,
  onCaseUpdate
}) => {
  const [selectedDecision, setSelectedDecision] = useState<'SECONDARY' | 'CLEAR' | 'INTERDICT'>('SECONDARY');
  const [officerNotes, setOfficerNotes] = useState(
    'Physical UV light examination required on crest watermark region. Discrepancy logged at Secondary Desk B.'
  );
  const [pinAuth, setPinAuth] = useState('••••');
  const [logToPostgres, setLogToPostgres] = useState(true);
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    detail: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle disposition transmission
  const handleCommitDecision = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const actionText =
        selectedDecision === 'SECONDARY'
          ? 'Secondary Physical Inspection Initiated'
          : selectedDecision === 'CLEAR'
          ? 'Passenger Cleared with Supervisor Signoff'
          : 'Interdiction Dispatched to Tactical Team';

      setToastMessage({
        title: 'Disposition Transmitted',
        detail: `${actionText} • Audit Block #8942-A written to ledger.`
      });

      if (onCaseUpdate) {
        onCaseUpdate({
          ...currentCase,
          status: selectedDecision === 'CLEAR' ? 'CLOSED' : 'ESCALATED',
          disposition:
            selectedDecision === 'SECONDARY'
              ? 'SECONDARY'
              : selectedDecision === 'CLEAR'
              ? 'CLEARED'
              : 'INTERDICTED'
        });
      }

      setTimeout(() => {
        setToastMessage(null);
      }, 5000);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 sm:px-5 gap-4 pb-28 pt-2">
      {/* Back to Command Center Navigation bar */}
      <div className="flex items-center justify-between py-1">
        <button
          onClick={() => onNavigate('command')}
          className="flex items-center gap-1 text-primary hover:text-white font-mono-sm text-[12px] font-bold transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>&lt; Command Center</span>
        </button>
        <span className="font-badge-label text-outline uppercase text-[10px] font-black tracking-widest">
          STATION 04 // BOOTH #4
        </span>
      </div>

      {/* 1. DOSSIER HEADER */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="font-badge-label tracking-[0.16em] text-primary font-black uppercase">
            DOSSIER {currentCase.id || '#IS-2025-08942'}
          </span>
          <span className="font-mono-sm text-on-surface-variant flex items-center gap-1 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            LIVE FEED ENCRYPTED
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-headline-lg text-primary font-black tracking-tight text-[24px]">
            {currentCase.name || 'DEMO CITIZEN, ALEXANDER'}
          </span>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-on-surface-variant font-mono-sm text-[11px] mt-0.5 font-bold">
            <span>TODAY 14:26:12 UTC</span>
            <span>•</span>
            <span>PORT OF ENTRY BOOTH #4</span>
            <span>•</span>
            <span className="text-primary font-black">ICAO DOC 9303</span>
          </div>
        </div>

        {/* Demo Alert Banner */}
        <div className="flex items-center gap-2.5 p-3 bg-[#161619] rounded-xl text-tertiary border border-[#222225]">
          <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0">
            verified_user
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-badge-label tracking-[0.12em] font-black text-[10px]">
              DEMO SIMULATION ENVIRONMENT
            </span>
            <span className="font-body-sm text-on-surface-variant text-[11px] font-medium">
              HITL Decision Support Pipeline Active • Synthetic Identity Record
            </span>
          </div>
        </div>
      </div>

      {/* 2. TRI-CARD SHOWCASE BANNER */}
      <div className="flex flex-col gap-3">
        {/* Centerpiece Risk Gauge */}
        <div className="flex flex-col bg-[#161619] rounded-xl p-4 shadow-xl border border-[#222225] relative overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-[20px]">
                warning
              </span>
              <span className="font-headline-sm text-primary uppercase font-black text-[15px]">
                Risk Assessment
              </span>
            </div>
            <span className="font-badge-label px-2.5 py-1 rounded-full bg-[#1E1E22] text-tertiary border border-tertiary/40 uppercase tracking-wider font-black text-[10px]">
              MEDIUM RISK • ELEVATED
            </span>
          </div>

          {/* Score & Status */}
          <div className="flex items-baseline justify-between py-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[42px] text-tertiary font-black tracking-tight leading-none">
                {currentCase.riskScore || 67}
              </span>
              <span className="font-mono-md text-on-surface-variant text-[15px] font-bold">
                / 100
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-badge-label text-secondary font-black text-[11px]">
                94.2% CONFIDENCE
              </span>
              <span className="font-mono-sm text-on-surface-variant text-[10px] font-bold">
                6 Layers Synthesized
              </span>
            </div>
          </div>

          {/* Tri-Color Continuum Track */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="h-3 w-full rounded-full bg-[#111113] border border-[#222225] relative overflow-hidden flex shadow-inner">
              <div className="h-full bg-secondary w-[35%] opacity-80"></div>
              <div className="h-full bg-tertiary w-[30%] opacity-90"></div>
              <div className="h-full bg-error w-[35%] opacity-90"></div>
              {/* Indicator Pin */}
              <div
                className="absolute top-0 bottom-0 w-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                style={{ left: `${currentCase.riskScore || 67}%` }}
              ></div>
            </div>
            <div className="flex justify-between font-mono-sm text-[11px] text-on-surface-variant px-0.5 font-bold">
              <span className="text-secondary font-black">0-35 Low</span>
              <span className="text-tertiary font-black">36-65 Medium</span>
              <span className="text-error font-black">66-100 High</span>
            </div>
          </div>
        </div>

        {/* Face Similarity Comparison Card */}
        <div className="flex flex-col bg-[#161619] rounded-xl p-4 shadow-xl border border-[#222225] gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]">
                face
              </span>
              <span className="font-headline-sm text-primary uppercase font-black text-[15px]">
                Biometric Match
              </span>
            </div>
            <span className="font-badge-label px-2.5 py-1 rounded-full bg-[#1E1E22] text-secondary border border-secondary/40 uppercase font-black text-[10px]">
              HIGH MATCH
            </span>
          </div>

          {/* Side by Side Photos */}
          <div className="grid grid-cols-2 gap-2.5 relative pt-1">
            {/* Document Photo */}
            <div className="flex flex-col gap-1">
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#111113] border border-[#222225]">
                <img
                  className="w-full h-full object-cover"
                  src={APP_ASSETS.alexanderDocPhoto}
                  alt="Government passport headshot"
                />
                {/* Mon Mon Mon Landmark Wireframe Overlay */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none text-primary/70"
                  fill="currentColor"
                  viewBox="0 0 100 125"
                >
                  <circle cx="36" cy="48" r="1.5"></circle>
                  <circle cx="64" cy="48" r="1.5"></circle>
                  <circle cx="50" cy="62" r="1.5"></circle>
                  <circle cx="42" cy="78" r="1.5"></circle>
                  <circle cx="58" cy="78" r="1.5"></circle>
                  <line
                    stroke="currentColor"
                    strokeDasharray="1 1"
                    strokeWidth="0.5"
                    x1="36"
                    x2="64"
                    y1="48"
                    y2="48"
                  ></line>
                  <line
                    stroke="currentColor"
                    strokeDasharray="1 1"
                    strokeWidth="0.5"
                    x1="36"
                    x2="50"
                    y1="48"
                    y2="62"
                  ></line>
                  <line
                    stroke="currentColor"
                    strokeDasharray="1 1"
                    strokeWidth="0.5"
                    x1="64"
                    x2="50"
                    y1="48"
                    y2="62"
                  ></line>
                  <line
                    stroke="currentColor"
                    strokeDasharray="1 1"
                    strokeWidth="0.5"
                    x1="50"
                    x2="42"
                    y1="62"
                    y2="78"
                  ></line>
                  <line
                    stroke="currentColor"
                    strokeDasharray="1 1"
                    strokeWidth="0.5"
                    x1="50"
                    x2="58"
                    y1="62"
                    y2="78"
                  ></line>
                </svg>
                <span className="absolute bottom-1 left-1 font-badge-label bg-[#0A0A0B]/90 text-on-surface px-1.5 py-0.5 rounded text-[9px] font-black">
                  E-PASSPORT CHIP
                </span>
              </div>
            </div>

            {/* Live Presented Face */}
            <div className="flex flex-col gap-1">
              <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden bg-[#111113] border border-[#222225]">
                <img
                  className="w-full h-full object-cover"
                  src={APP_ASSETS.alexanderLiveFeed}
                  alt="Live checkpoint gate camera feed"
                />
                {/* Biometric Overlay Target Ring */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none text-secondary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  viewBox="0 0 100 125"
                >
                  <circle cx="50" cy="56" r="30" strokeDasharray="3 2"></circle>
                  <path d="M 46 56 L 54 56 M 50 52 L 50 60"></path>
                </svg>
                <span className="absolute bottom-1 left-1 font-badge-label bg-[#0A0A0B]/90 text-secondary px-1.5 py-0.5 rounded text-[9px] font-black">
                  BOOTH CAM 4 (LIVE)
                </span>
              </div>
            </div>

            {/* Floating Similarity Metric Pill in Center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#0A0A0B] border border-[#222225] text-secondary px-2.5 py-1 rounded-full shadow-xl">
              <span className="material-symbols-outlined text-[15px]">
                fingerprint
              </span>
              <span className="font-mono-md text-[13px] font-black tracking-tight">
                94.7%
              </span>
            </div>
          </div>

          {/* Legal Advisory Note */}
          <div className="flex items-center gap-1.5 pt-1 text-on-surface-variant font-mono-sm text-[11px] font-bold">
            <span className="material-symbols-outlined text-[14px] text-primary">
              info
            </span>
            <span>Analytical signal only. Must be interpreted by authorized officer.</span>
          </div>
        </div>
      </div>

      {/* 3. EXPLAINABILITY MODULE (SHAP-STYLE WATERFALL) */}
      <div className="flex flex-col bg-[#161619] rounded-xl p-4 shadow-xl border border-[#222225] gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">
              psychology
            </span>
            <span className="font-headline-sm text-primary uppercase font-black text-[15px]">
              Feature Attribution
            </span>
          </div>
          <span className="font-badge-label text-primary uppercase tracking-[0.14em] text-[10px] font-black">
            SHAP / LIME EXPLAINABILITY PIPELINE • WHY THIS RISK SCORE?
          </span>
        </div>

        {/* Natural Language Executive Summary */}
        <div className="bg-[#111113] p-3 rounded-lg text-on-surface font-body-sm text-[12px] leading-relaxed border border-[#222225]">
          <span className="text-tertiary font-black">Risk elevated (+42 pts)</span> primarily
          due to detected text-region inconsistency and micro-font compression artifacts in
          document forensics. Reassuring signals include valid MRZ structure (
          <span className="text-secondary font-black">-5 pts</span>) and facial biometric
          alignment (<span className="text-secondary font-black">-8 pts</span>). Officer
          physical UV inspection is advised.
        </div>

        {/* Waterfall Contribution Bars */}
        <div className="flex flex-col gap-2.5 pt-1">
          {/* Feature 1 */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-on-surface text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-error text-[16px]">
                  emergency
                </span>
                <span className="font-bold">Text-region inconsistency</span>
              </div>
              <span className="font-mono-md text-error font-black text-[12px]">
                +24 pts
              </span>
            </div>
            <div className="h-2.5 w-full bg-[#111113] rounded-full overflow-hidden flex border border-[#222225]">
              <div className="h-full bg-error rounded-full" style={{ width: '58%' }}></div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-on-surface text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-tertiary text-[16px]">
                  warning
                </span>
                <span className="font-bold">Compression artifact near issuing stamp</span>
              </div>
              <span className="font-mono-md text-tertiary font-black text-[12px]">
                +18 pts
              </span>
            </div>
            <div className="h-2.5 w-full bg-[#111113] rounded-full overflow-hidden flex border border-[#222225]">
              <div
                className="h-full bg-tertiary rounded-full"
                style={{ width: '44%' }}
              ></div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-on-surface text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">
                  check_circle
                </span>
                <span className="font-bold">Face similarity match 94.7%</span>
              </div>
              <span className="font-mono-md text-secondary font-black text-[12px]">
                -8 pts
              </span>
            </div>
            <div className="h-2.5 w-full bg-[#111113] rounded-full overflow-hidden flex justify-end border border-[#222225]">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: '22%' }}
              ></div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-on-surface text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">
                  check_circle
                </span>
                <span className="font-bold">Valid MRZ structure & checksum</span>
              </div>
              <span className="font-mono-md text-secondary font-black text-[12px]">
                -5 pts
              </span>
            </div>
            <div className="h-2.5 w-full bg-[#111113] rounded-full overflow-hidden flex justify-end border border-[#222225]">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: '15%' }}
              ></div>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-on-surface text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">
                  check_circle
                </span>
                <span className="font-bold">Biometric passport chip match</span>
              </div>
              <span className="font-mono-md text-secondary font-black text-[12px]">
                -3 pts
              </span>
            </div>
            <div className="h-2.5 w-full bg-[#111113] rounded-full overflow-hidden flex justify-end border border-[#222225]">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: '10%' }}
              ></div>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-on-surface text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">
                  check_circle
                </span>
                <span className="font-bold">Expiry & issue date consistency</span>
              </div>
              <span className="font-mono-md text-secondary font-black text-[12px]">
                -2 pts
              </span>
            </div>
            <div className="h-2.5 w-full bg-[#111113] rounded-full overflow-hidden flex justify-end border border-[#222225]">
              <div
                className="h-full bg-secondary rounded-full"
                style={{ width: '7%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MULTI-LAYER VERIFICATION MATRIX */}
      <div className="flex flex-col bg-[#161619] rounded-xl p-4 shadow-xl border border-[#222225] gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">
              fact_check
            </span>
            <span className="font-headline-sm text-primary uppercase font-black text-[15px]">
              Verification Matrix
            </span>
          </div>
          <span className="font-badge-label text-on-surface-variant font-mono-sm text-[10px] font-bold">
            6 OF 6 EXECUTED
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {/* Item 1 */}
          <div className="flex items-center justify-between p-2.5 bg-[#111113] rounded-lg border border-[#222225]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                verified
              </span>
              <div className="flex flex-col">
                <span className="font-body-md text-on-surface font-bold text-[13px]">
                  OCR Extraction
                </span>
                <span className="font-mono-sm text-on-surface-variant text-[11px] font-medium">
                  All text fields high-confidence parsed
                </span>
              </div>
            </div>
            <span className="font-badge-label px-2.5 py-1 rounded bg-[#1E1E22] text-secondary border border-secondary/40 font-black text-[10px]">
              PASS
            </span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between p-2.5 bg-[#111113] rounded-lg border border-[#222225]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                verified
              </span>
              <div className="flex flex-col">
                <span className="font-body-md text-on-surface font-bold text-[13px]">
                  MRZ Checksums
                </span>
                <span className="font-mono-sm text-on-surface-variant text-[11px] font-medium">
                  100% mathematical parity verified
                </span>
              </div>
            </div>
            <span className="font-badge-label px-2.5 py-1 rounded bg-[#1E1E22] text-secondary border border-secondary/40 font-black text-[10px]">
              PASS
            </span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between p-2.5 bg-[#111113] rounded-lg border border-[#222225]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                verified
              </span>
              <div className="flex flex-col">
                <span className="font-body-md text-on-surface font-bold text-[13px]">
                  Document Template Match
                </span>
                <span className="font-mono-sm text-on-surface-variant text-[11px] font-medium">
                  ICAO standard Doc 9303 layout
                </span>
              </div>
            </div>
            <span className="font-badge-label px-2.5 py-1 rounded bg-[#1E1E22] text-secondary border border-secondary/40 font-black text-[10px]">
              PASS
            </span>
          </div>

          {/* Item 4 - WARNING */}
          <div className="flex items-center justify-between p-2.5 bg-[#111113] rounded-lg border border-tertiary/40">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-tertiary text-[20px]">
                report_problem
              </span>
              <div className="flex flex-col">
                <span className="font-body-md text-on-surface font-bold text-[13px]">
                  AI Tampering Detection
                </span>
                <span className="font-mono-sm text-tertiary text-[11px] font-bold">
                  Micro-pattern anomaly detected in crest
                </span>
              </div>
            </div>
            <span className="font-badge-label px-2.5 py-1 rounded bg-tertiary text-[#0A0A0B] font-black text-[10px]">
              WARNING
            </span>
          </div>

          {/* Item 5 */}
          <div className="flex items-center justify-between p-2.5 bg-[#111113] rounded-lg border border-[#222225]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                verified
              </span>
              <div className="flex flex-col">
                <span className="font-body-md text-on-surface font-bold text-[13px]">
                  Biometric Face Comparison
                </span>
                <span className="font-mono-sm text-on-surface-variant text-[11px] font-medium">
                  94.7% exceeds biometric threshold (85%)
                </span>
              </div>
            </div>
            <span className="font-badge-label px-2.5 py-1 rounded bg-[#1E1E22] text-secondary border border-secondary/40 font-black text-[10px]">
              PASS
            </span>
          </div>

          {/* Item 6 */}
          <div className="flex items-center justify-between p-2.5 bg-[#111113] rounded-lg border border-[#222225]">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                verified
              </span>
              <div className="flex flex-col">
                <span className="font-body-md text-on-surface font-bold text-[13px]">
                  Watchlist Intercept
                </span>
                <span className="font-mono-sm text-on-surface-variant text-[11px] font-medium">
                  NCIC / INTERPOL SLTD 0 hits
                </span>
              </div>
            </div>
            <span className="font-badge-label px-2.5 py-1 rounded bg-[#1E1E22] text-secondary border border-secondary/40 font-black text-[10px]">
              PASS
            </span>
          </div>
        </div>
      </div>

      {/* 5. OFFICER ACTION CENTER & HITL RESOLUTION */}
      <div className="flex flex-col bg-[#161619] rounded-xl p-4 shadow-xl border border-[#222225] gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary text-[20px]">
                shield_person
              </span>
              <span className="font-headline-sm text-primary uppercase font-black text-[15px]">
                Officer Action Center
              </span>
            </div>
            <span className="font-badge-label text-primary font-black tracking-wider text-[10px]">
              HITL PROTOCOL
            </span>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-[#111113] rounded-lg border border-tertiary/30">
            <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0">
              announcement
            </span>
            <span className="font-body-sm text-on-surface text-[12px]">
              AI Advisory:{' '}
              <strong className="text-tertiary uppercase font-black">
                Manual Physical Inspection Recommended
              </strong>
            </span>
          </div>
        </div>

        {/* Tri-Tier Decision Buttons */}
        <div className="flex flex-col gap-2">
          {/* Primary Recommended: Secondary Inspection */}
          <button
            onClick={() => setSelectedDecision('SECONDARY')}
            className={`w-full py-2.5 px-3 rounded-xl font-headline-sm font-black flex items-center justify-between transition-all cursor-pointer ${
              selectedDecision === 'SECONDARY'
                ? 'bg-tertiary text-[#0A0A0B] shadow-[0_0_16px_rgba(235,160,55,0.4)] ring-2 ring-tertiary'
                : 'bg-[#111113] text-[#E0E0E0] hover:bg-[#1E1E22] border border-[#222225]'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px]">rule_folder</span>
              <span>SECONDARY INSPECTION</span>
            </span>
            <span className={`font-badge-label px-2 py-0.5 rounded text-[10px] font-black ${
              selectedDecision === 'SECONDARY'
                ? 'bg-[#0A0A0B] text-tertiary'
                : 'bg-tertiary text-[#0A0A0B]'
            }`}>
              RECOMMENDED
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {/* Clear Passenger */}
            <button
              onClick={() => setSelectedDecision('CLEAR')}
              className={`py-2 px-2 rounded-xl font-headline-sm font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedDecision === 'CLEAR'
                  ? 'bg-secondary text-[#0A0A0B] ring-2 ring-secondary shadow-lg'
                  : 'bg-[#111113] text-secondary hover:bg-secondary/10 border border-[#222225]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span className="text-[13px]">CLEAR PASS</span>
            </button>

            {/* Interdict */}
            <button
              onClick={() => setSelectedDecision('INTERDICT')}
              className={`py-2 px-2 rounded-xl font-headline-sm font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                selectedDecision === 'INTERDICT'
                  ? 'bg-error text-white ring-2 ring-error shadow-lg'
                  : 'bg-[#111113] text-error hover:bg-error/10 border border-[#222225]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
              <span className="text-[13px]">INTERDICT</span>
            </button>
          </div>
        </div>

        {/* Mandatory HITL Confirmation Drawer/Form */}
        <div className="flex flex-col gap-2.5 p-3.5 bg-[#111113] rounded-xl border border-[#222225]">
          <span className="font-badge-label text-on-surface-variant uppercase tracking-wider font-black text-[10px]">
            MANDATORY STATUTORY ESCALATION LOG
          </span>

          {/* Officer Notes Input */}
          <div className="flex flex-col gap-1">
            <label className="font-body-sm text-on-surface-variant font-bold text-[11px]">
              Physical Inspection Findings & Notes
            </label>
            <textarea
              className="w-full bg-[#161619] text-on-surface font-mono-sm text-[12px] p-2.5 rounded-lg outline-none focus:ring-1 focus:ring-white border border-[#222225] transition-all"
              rows={2}
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
            />
          </div>

          {/* Officer Clearance & PIN */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="font-body-sm text-on-surface-variant font-bold text-[11px]">
                Officer of Record
              </label>
              <div className="bg-[#161619] p-2 rounded-lg text-on-surface font-mono-sm text-[12px] flex items-center gap-1.5 border border-[#222225] font-bold">
                <span className="material-symbols-outlined text-[16px] text-primary">
                  badge
                </span>
                <span>S. Jenkins (Lvl 3)</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-body-sm text-on-surface-variant font-bold text-[11px]">
                Security PIN Auth
              </label>
              <input
                className="w-full bg-[#161619] text-on-surface font-mono-sm text-[12px] p-2 rounded-lg outline-none text-center border border-[#222225] focus:ring-1 focus:ring-white font-bold"
                type="password"
                value={pinAuth}
                onChange={(e) => setPinAuth(e.target.value)}
              />
            </div>
          </div>

          {/* Audit Trail Checkbox */}
          <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={logToPostgres}
              onChange={(e) => setLogToPostgres(e.target.checked)}
              className="accent-secondary w-4 h-4 rounded cursor-pointer"
            />
            <span className="font-body-sm text-on-surface-variant text-[11px] font-medium">
              Log decision to tamper-evident PostgreSQL audit ledger
            </span>
          </label>

          {/* Execute Dispatch Button */}
          <button
            onClick={handleCommitDecision}
            disabled={isSubmitting}
            className="w-full mt-1 py-3 bg-[#E0E0E0] hover:bg-white text-[#0A0A0B] font-headline-sm font-black rounded-xl shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-[13px]"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isSubmitting ? 'progress_activity' : 'lock'}
            </span>
            <span>
              {isSubmitting
                ? 'TRANSMITTING ENCRYPTED DISPOSITION...'
                : 'SIGN & TRANSMIT DISPOSITION'}
            </span>
          </button>
        </div>

        {/* Bottom Statutory Guardrail */}
        <div className="p-3 bg-[#111113] rounded-lg border border-[#222225]">
          <p className="font-mono-sm text-on-surface-variant leading-relaxed text-[10px] font-medium text-center">
            AI-generated risk signals provide non-binding operational decision support. The
            authorized human officer maintains statutory authority and sole legal responsibility
            for border entry determinations under Border Security Directive 78-B.
          </p>
        </div>
      </div>

      {/* Floating Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-50 bg-[#161619] text-[#E0E0E0] p-3.5 rounded-xl shadow-2xl flex items-center justify-between border border-secondary/50 animate-fade-in">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[24px] text-secondary">task_alt</span>
            <div className="flex flex-col leading-tight">
              <span className="font-headline-sm text-[14px] font-black">
                {toastMessage.title}
              </span>
              <span className="font-mono-sm text-[11px] text-on-surface-variant font-bold">
                {toastMessage.detail}
              </span>
            </div>
          </div>
          <button
            className="text-on-surface-variant hover:text-white p-1 transition-colors cursor-pointer"
            onClick={() => setToastMessage(null)}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
