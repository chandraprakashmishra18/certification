import React, { useState, useEffect } from 'react';
import { ScreeningCase, ActiveScreen } from '../types';

interface CommandCenterProps {
  cases: ScreeningCase[];
  onSelectCase: (caseItem: ScreeningCase) => void;
  onNavigate: (screen: ActiveScreen) => void;
  onInitiateStation: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  cases,
  onSelectCase,
  onNavigate,
  onInitiateStation
}) => {
  const [timeRange, setTimeRange] = useState<'today' | '7days' | '30days'>('7days');
  const [queueFilter, setQueueFilter] = useState<'all' | 'action' | 'high' | 'alerts'>('all');
  const [utcTime, setUtcTime] = useState<string>('');

  // Live telemetry clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`UTC ${h}:${m}:${s} • SERVER CLUSTER SYD-01`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter queue items
  const filteredCases = cases.filter((c) => {
    if (queueFilter === 'action') {
      return c.riskScore > 35 || c.status === 'OPEN';
    }
    if (queueFilter === 'high') {
      return c.riskScore >= 66 || c.riskTier === 'HIGH';
    }
    if (queueFilter === 'alerts') {
      return c.isAnomaly;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 sm:px-5 gap-4 pb-28 pt-2">
      {/* 1. Operational Context Header */}
      <div className="flex flex-col bg-[#111113] p-3.5 rounded-xl gap-1.5 border border-[#222225] shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(48,209,88,0.9)] animate-pulse"></span>
            <span className="font-badge-label tracking-[0.14em] text-primary font-black uppercase">
              BORDER & IMMIGRATION INTELLIGENCE COMMAND
            </span>
          </div>
          <span className="font-mono-sm font-bold text-on-surface-variant px-1.5 py-0.5 bg-[#1E1E22] border border-[#222225] rounded text-[10px]">
            LIVE FEED
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <span className="font-badge-label text-tertiary bg-tertiary-container/40 px-2 py-0.5 rounded border border-tertiary/30 font-black">
            DEMO ENVIRONMENT • NON-PII SYNTHETIC DATA
          </span>
          <span className="font-mono-sm text-on-surface-variant flex items-center gap-1 text-[11px] font-bold">
            <span className="material-symbols-outlined text-[13px] text-primary">
              schedule
            </span>
            <span id="live-telemetry-clock">{utcTime || 'UTC 14:28:49 • SERVER CLUSTER SYD-01'}</span>
          </span>
        </div>
      </div>

      {/* 2. Primary Initiator CTA */}
      <div className="relative overflow-hidden rounded-xl bg-[#161619] p-4 border border-[#222225] shadow-lg">
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex flex-col">
            <span className="font-badge-label text-on-surface-variant uppercase tracking-[0.14em] font-extrabold">
              Fast-Track Station 04
            </span>
            <h3 className="font-headline-sm text-primary font-black text-[18px]">
              Ready for Verification
            </h3>
            <p className="font-body-sm text-on-surface-variant text-[12px] font-medium">
              Passport, Visa, ID Card & Face Biometrics
            </p>
          </div>
          <button
            onClick={onInitiateStation}
            className="shrink-0 flex items-center gap-1.5 bg-primary-container hover:bg-white text-on-primary-container font-mono-md px-4 py-2 rounded-lg font-black tracking-wide shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>INITIATE</span>
          </button>
        </div>
      </div>

      {/* 3. Realtime KPI Grid (2x3 Compact Tactical) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono-sm text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">
            Operational Metrics (24H Shift)
          </span>
          <span className="font-badge-label text-secondary font-black tracking-wider">
            99.98% NODE HEALTH
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {/* Total Documents */}
          <div className="flex flex-col bg-[#161619] p-3.5 rounded-xl border border-[#222225] shadow-sm justify-between">
            <div className="flex items-center justify-between">
              <span className="font-badge-label text-on-surface-variant uppercase font-extrabold tracking-wider">
                Screened Docs
              </span>
              <span className="material-symbols-outlined text-primary text-[18px]">
                document_scanner
              </span>
            </div>
            <div className="mt-2">
              <div className="font-display text-primary font-black text-[24px]">
                12,486
              </div>
              <div className="flex items-center gap-1 font-mono-sm text-secondary mt-1 text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>+8.4% this week</span>
              </div>
            </div>
          </div>

          {/* Verified (Green) */}
          <div className="flex flex-col bg-[#161619] p-3.5 rounded-xl border border-[#222225] shadow-sm justify-between">
            <div className="flex items-center justify-between">
              <span className="font-badge-label text-secondary uppercase font-extrabold tracking-wider">
                Verified
              </span>
              <span className="material-symbols-outlined text-secondary text-[18px]">
                verified_user
              </span>
            </div>
            <div className="mt-2">
              <div className="font-display text-secondary font-black text-[24px]">
                10,921
              </div>
              <div className="font-mono-sm text-on-surface-variant mt-1 text-[11px] font-bold">
                87.5% pass rate
              </div>
            </div>
          </div>

          {/* Under Review (Amber) */}
          <div className="flex flex-col bg-[#161619] p-3.5 rounded-xl border border-[#222225] shadow-sm justify-between">
            <div className="flex items-center justify-between">
              <span className="font-badge-label text-tertiary uppercase font-extrabold tracking-wider">
                Under Review
              </span>
              <span className="material-symbols-outlined text-tertiary text-[18px]">
                pending
              </span>
            </div>
            <div className="mt-2">
              <div className="font-display text-tertiary font-black text-[24px]">
                1,143
              </div>
              <div className="font-mono-sm text-on-surface-variant mt-1 text-[11px] font-bold">
                9.1% queued
              </div>
            </div>
          </div>

          {/* High Risk / Intercepted (Crimson) */}
          <div className="flex flex-col bg-[#161619] p-3.5 rounded-xl border border-[#222225] shadow-sm justify-between">
            <div className="flex items-center justify-between">
              <span className="font-badge-label text-error uppercase font-extrabold tracking-wider">
                Intercepted
              </span>
              <span className="material-symbols-outlined text-error text-[18px]">
                drive_file_rename_outline
              </span>
            </div>
            <div className="mt-2">
              <div className="font-display text-error font-black text-[24px]">
                422
              </div>
              <div className="font-mono-sm text-error mt-1 text-[11px] font-bold">
                3.4% high risk
              </div>
            </div>
          </div>

          {/* Avg Latency */}
          <div className="flex flex-col bg-[#161619] p-3.5 rounded-xl border border-[#222225] shadow-sm justify-between">
            <div className="flex items-center justify-between">
              <span className="font-badge-label text-on-surface-variant uppercase font-extrabold tracking-wider">
                Avg Latency
              </span>
              <span className="material-symbols-outlined text-primary text-[18px]">
                speed
              </span>
            </div>
            <div className="mt-2">
              <div className="font-display text-primary font-black text-[24px]">
                4.8s
              </div>
              <div className="font-mono-sm text-secondary mt-1 text-[11px] font-bold">
                Sub-second OCR
              </div>
            </div>
          </div>

          {/* Confidence */}
          <div className="flex flex-col bg-[#161619] p-3.5 rounded-xl border border-[#222225] shadow-sm justify-between">
            <div className="flex items-center justify-between">
              <span className="font-badge-label text-on-surface-variant uppercase font-extrabold tracking-wider">
                Confidence
              </span>
              <span className="material-symbols-outlined text-primary text-[18px]">
                model_training
              </span>
            </div>
            <div className="mt-2">
              <div className="font-display text-primary font-black text-[24px]">
                96.2%
              </div>
              <div className="font-mono-sm text-on-surface-variant mt-1 text-[11px] font-bold">
                Model v4.2.1-prod
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Visual Analytics Panels */}
      <div className="flex flex-col gap-3">
        {/* Screening Activity Multi-Series Line/Area Chart */}
        <div className="flex flex-col bg-surface-container p-3.5 rounded-xl border border-[#262a34]/60 shadow-sm gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-badge-label text-on-surface-variant uppercase tracking-[0.14em] font-extrabold">
                Throughput Volume
              </span>
              <span className="font-headline-sm text-primary font-black text-[16px]">
                Screening Activity
              </span>
            </div>
            {/* Time Range Pill Switcher */}
            <div className="flex bg-[#111113] p-1 rounded-lg gap-1 border border-[#222225]">
              <button
                onClick={() => setTimeRange('today')}
                className={`px-2.5 py-1 font-badge-label rounded text-[10px] transition-all cursor-pointer ${
                  timeRange === 'today'
                    ? 'bg-primary-container text-on-primary-container font-black shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-bold'
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTimeRange('7days')}
                className={`px-2.5 py-1 font-badge-label rounded text-[10px] transition-all cursor-pointer ${
                  timeRange === '7days'
                    ? 'bg-primary-container text-on-primary-container font-black shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-bold'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeRange('30days')}
                className={`px-2.5 py-1 font-badge-label rounded text-[10px] transition-all cursor-pointer ${
                  timeRange === '30days'
                    ? 'bg-primary-container text-on-primary-container font-black shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface font-bold'
                }`}
              >
                30 Days
              </button>
            </div>
          </div>

          {/* Area Chart SVG */}
          <div className="relative w-full h-36 mt-1">
            <svg
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 320 120"
            >
              <defs>
                <linearGradient id="emeraldGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#30D158" stopOpacity="0.25"></stop>
                  <stop offset="100%" stopColor="#30D158" stopOpacity="0.0"></stop>
                </linearGradient>
                <linearGradient id="amberGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#FF9F0A" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#FF9F0A" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line stroke="#222225" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="320" y1="30" y2="30"></line>
              <line stroke="#222225" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="320" y1="70" y2="70"></line>
              <line stroke="#222225" strokeWidth="1" x1="0" x2="320" y1="110" y2="110"></line>

              {/* Area Fills */}
              <polygon
                fill="url(#emeraldGrad)"
                points="0,110 0,68 50,52 100,60 150,38 200,44 250,22 300,18 320,24 320,110"
              ></polygon>

              {/* 1. Verified (Emerald) */}
              <polyline
                fill="none"
                points="0,68 50,52 100,60 150,38 200,44 250,22 300,18 320,24"
                stroke="#30D158"
                strokeLinecap="round"
                strokeWidth="2.5"
              ></polyline>

              {/* 2. Review (Amber) */}
              <polyline
                fill="none"
                points="0,96 50,92 100,98 150,88 200,91 250,84 300,80 320,85"
                stroke="#FF9F0A"
                strokeDasharray="2 2"
                strokeWidth="2"
              ></polyline>

              {/* 3. Flagged (Crimson) */}
              <polyline
                fill="none"
                points="0,105 50,103 100,104 150,101 200,103 250,99 300,97 320,98"
                stroke="#FF453A"
                strokeWidth="2"
              ></polyline>

              {/* Peak Data Marker */}
              <circle
                className="animate-pulse"
                cx="300"
                cy="18"
                fill="#30D158"
                r="4.5"
              ></circle>
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between pt-1 font-mono-sm text-on-surface-variant text-[11px] font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <span>Verified (87%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
              <span>Review (9%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
              <span>Interdict (4%)</span>
            </div>
          </div>
        </div>

        {/* Risk Signal Distribution & Telemetry Donut */}
        <div className="flex flex-col bg-[#161619] p-4 rounded-xl border border-[#222225] shadow-sm gap-2">
          <div className="flex items-center justify-between">
            <span className="font-headline-sm text-primary font-black text-[16px]">
              Risk Signal Distribution
            </span>
            <span className="font-badge-label text-primary font-mono uppercase font-black tracking-[0.12em]">
              AI FORENSIC SCAN
            </span>
          </div>
          <div className="flex items-center gap-4 py-1">
            {/* Circular Donut SVG */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  r="38"
                  stroke="#222225"
                  strokeWidth="12"
                ></circle>
                {/* Low Risk Segment: 82% */}
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  r="38"
                  stroke="#30D158"
                  strokeDasharray="195.7 238.7"
                  strokeDashoffset="0"
                  strokeWidth="12"
                ></circle>
                {/* Medium Risk Segment: 14% */}
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  r="38"
                  stroke="#E0E0E0"
                  strokeDasharray="33.4 238.7"
                  strokeDashoffset="-195.7"
                  strokeWidth="12"
                ></circle>
                {/* High Risk Segment: 4% */}
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  r="38"
                  stroke="#FF453A"
                  strokeDasharray="9.5 238.7"
                  strokeDashoffset="-229.1"
                  strokeWidth="12"
                ></circle>
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-display text-[24px] text-primary font-black leading-none">
                  82%
                </span>
                <span className="font-badge-label text-secondary uppercase text-[9px] mt-0.5 font-black tracking-wider">
                  CLEARED
                </span>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="flex flex-col justify-center gap-1.5 w-full">
              {/* Low */}
              <div className="flex items-center justify-between bg-[#111113] px-3 py-2 rounded-lg border border-[#222225]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-body-sm text-on-surface text-[12px] font-bold">
                    Low Risk (Tier 0-1)
                  </span>
                </div>
                <span className="font-mono-md text-primary font-black text-[13px]">
                  82%
                </span>
              </div>
              {/* Medium */}
              <div className="flex items-center justify-between bg-[#111113] px-3 py-2 rounded-lg border border-[#222225]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="font-body-sm text-on-surface text-[12px] font-bold">
                    Secondary Inspection
                  </span>
                </div>
                <span className="font-mono-md text-primary font-black text-[13px]">
                  14%
                </span>
              </div>
              {/* High */}
              <div className="flex items-center justify-between bg-[#111113] px-3 py-2 rounded-lg border border-[#222225]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  <span className="font-body-sm text-on-surface text-[12px] font-bold">
                    Interdiction Flagged
                  </span>
                </div>
                <span className="font-mono-md text-error font-black text-[13px]">
                  4%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Tactical Queue Section */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              fact_check
            </span>
            <h2 className="font-headline-md text-primary font-black text-[18px]">
              Screening Queue
            </h2>
          </div>
          <span className="font-mono-sm text-on-surface-variant text-[11px] font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            AUTO-REFRESH 3s
          </span>
        </div>

        {/* Quick Filter Horizontal Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 no-scrollbar">
          <button
            onClick={() => setQueueFilter('all')}
            className={`shrink-0 font-badge-label uppercase px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              queueFilter === 'all'
                ? 'bg-primary-container text-on-primary-container font-black shadow-sm'
                : 'bg-[#161619] text-on-surface-variant hover:text-on-surface border border-[#222225] font-bold'
            }`}
          >
            All (1,143)
          </button>
          <button
            onClick={() => setQueueFilter('action')}
            className={`shrink-0 font-badge-label uppercase px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              queueFilter === 'action'
                ? 'bg-primary-container text-on-primary-container font-black shadow-sm'
                : 'bg-[#161619] text-on-surface-variant hover:text-on-surface border border-[#222225] font-bold'
            }`}
          >
            Action Required (42)
          </button>
          <button
            onClick={() => setQueueFilter('high')}
            className={`shrink-0 font-badge-label uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              queueFilter === 'high'
                ? 'bg-error text-on-error font-black shadow-sm'
                : 'bg-[#161619] text-error hover:text-white border border-[#222225] font-bold'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
            High Risk (12)
          </button>
          <button
            onClick={() => setQueueFilter('alerts')}
            className={`shrink-0 font-badge-label uppercase px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              queueFilter === 'alerts'
                ? 'bg-primary-container text-on-primary-container font-black shadow-sm'
                : 'bg-[#161619] text-on-surface-variant hover:text-on-surface border border-[#222225] font-bold'
            }`}
          >
            System Alerts (3)
          </button>
        </div>

        {/* Feed Queue Cards */}
        <div className="flex flex-col gap-2.5">
          {filteredCases.map((caseItem) => {
            const isMedium = caseItem.riskScore >= 36 && caseItem.riskScore <= 65;
            const isHigh = caseItem.riskScore >= 66;
            const isLow = caseItem.riskScore <= 35;

            // Border color line
            const borderBg = isHigh
              ? 'bg-error'
              : isMedium
              ? 'bg-tertiary'
              : 'bg-secondary';

            return (
              <div
                key={caseItem.id}
                className="flex flex-col bg-[#161619] p-3.5 rounded-xl gap-2.5 shadow-sm relative overflow-hidden border border-[#222225] hover:border-[#71717A] transition-all"
              >
                {/* Colored Left Accent Strip */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${borderBg}`}></div>

                {/* Card Top: ID, Doc type & Risk Pill */}
                <div className="flex items-center justify-between pl-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-md text-primary font-black">
                      {caseItem.id}
                    </span>
                    <span className="font-mono-sm text-on-surface-variant text-[11px] font-bold">
                      {caseItem.docType}
                    </span>
                  </div>

                  {isHigh ? (
                    <span className="font-badge-label text-on-error bg-error px-2 py-0.5 rounded font-black flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      {caseItem.riskScore}/100 HIGH RISK
                    </span>
                  ) : isMedium ? (
                    <span className="font-badge-label text-tertiary bg-[#1E1E22] px-2 py-0.5 rounded font-black border border-tertiary/40">
                      {caseItem.riskScore}/100 MEDIUM RISK
                    </span>
                  ) : (
                    <span className="font-badge-label text-secondary bg-[#1E1E22] px-2 py-0.5 rounded font-black border border-secondary/40">
                      {String(caseItem.riskScore).padStart(2, '0')}/100 LOW RISK
                    </span>
                  )}
                </div>

                {/* Card Middle: Biometric Thumbnail & Anomaly details */}
                <div className="flex items-center gap-3 pl-1">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#111113] shrink-0 relative border border-[#222225]">
                    <img
                      className="w-full h-full object-cover"
                      src={caseItem.avatarUrl}
                      alt={caseItem.name}
                    />
                    {isHigh && (
                      <div className="absolute inset-0 bg-error/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[16px]">
                          warning
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-mono-sm text-on-surface truncate text-[12px] font-bold">
                      Doc: {caseItem.maskedDocNumber}
                    </span>
                    <span
                      className={`font-body-sm truncate font-bold text-[12px] ${
                        isHigh
                          ? 'text-error'
                          : isMedium
                          ? 'text-tertiary'
                          : 'text-secondary flex items-center gap-1'
                      }`}
                    >
                      {isLow && (
                        <span className="material-symbols-outlined text-[13px]">
                          check_circle
                        </span>
                      )}
                      {caseItem.anomalySummary}
                    </span>
                  </div>
                </div>

                {/* Card Bottom: Officer / Gate & Action Button */}
                <div className="flex items-center justify-between pt-1 bg-[#111113] p-2 rounded-lg border border-[#222225]">
                  <span
                    className={`font-mono-sm text-[11px] flex items-center gap-1.5 ${
                      isHigh ? 'text-error font-black' : 'text-on-surface-variant font-bold'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {isHigh ? 'lock' : 'shield_person'}
                    </span>
                    {isHigh ? 'LANE LOCKED' : `Officer: ${caseItem.officer}`}
                  </span>

                  {/* Dynamic Action Buttons */}
                  {caseItem.id === '#IS-8942' ? (
                    <button
                      onClick={() => {
                        onSelectCase(caseItem);
                        onNavigate('explainable-risk');
                      }}
                      className="bg-primary-container hover:bg-white text-on-primary-container font-mono-sm px-3 py-1.5 rounded-lg font-black flex items-center gap-1 active:scale-95 transition-all cursor-pointer shadow-sm"
                    >
                      <span>Review Case</span>
                      <span className="material-symbols-outlined text-[14px]">
                        chevron_right
                      </span>
                    </button>
                  ) : isHigh ? (
                    <button
                      onClick={() => {
                        onSelectCase(caseItem);
                        onNavigate('explainable-risk');
                      }}
                      className="bg-error hover:bg-error/90 text-on-error font-mono-sm px-3 py-1.5 rounded-lg font-black flex items-center gap-1 active:scale-95 shadow-sm transition-all cursor-pointer"
                    >
                      <span>Flagged Dossier</span>
                      <span className="material-symbols-outlined text-[14px]">
                        open_in_new
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        onSelectCase(caseItem);
                        onNavigate('history');
                      }}
                      className="text-on-surface-variant hover:text-primary font-mono-sm px-2.5 py-1 rounded font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View Log</span>
                      <span className="material-symbols-outlined text-[14px]">
                        receipt_long
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
