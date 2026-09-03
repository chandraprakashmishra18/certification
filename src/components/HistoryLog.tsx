import React, { useState } from 'react';
import { ScreeningCase, ActiveScreen } from '../types';
import { AUDIT_TIMELINE, APP_ASSETS } from '../data/mockData';

interface HistoryLogProps {
  cases: ScreeningCase[];
  onSelectCase: (caseItem: ScreeningCase) => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const HistoryLog: React.FC<HistoryLogProps> = ({
  cases,
  onSelectCase,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'FLAGGED' | 'SECONDARY' | 'ALERTS'>('ALL');
  const [copiedHash, setCopiedHash] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const hashString = 'e79d1a8e945c27bf88a032f6b158023190cdbe7c390508b981f9a087192bf83c';

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(hashString);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1200);
  };

  const filteredList = cases.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.docType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.officer.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'FLAGGED') return c.riskScore >= 66 || c.isAnomaly;
    if (activeFilter === 'SECONDARY') return c.riskScore >= 36 && c.riskScore <= 65;
    if (activeFilter === 'ALERTS') return c.isAnomaly;
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 sm:px-5 gap-4 pb-28 pt-2">
      {/* Status Ticker & Scope */}
      <div className="flex items-center justify-between bg-surface-container-low px-3 py-2 rounded-lg border border-[#262a34] shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-secondary shrink-0 animate-pulse"></span>
          <span className="font-mono-sm text-on-surface truncate text-[11px]">
            NODE // SYD-TER3-AUTH-09
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="material-symbols-outlined text-primary text-[14px]">
            verified_user
          </span>
          <span className="font-badge-label text-primary uppercase text-[9px]">
            EAL6+ ENCLAVE
          </span>
        </div>
      </div>

      {/* Search & Tactical Filters */}
      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Screening ID, Passport No, or Officer..."
            className="w-full h-10 pl-9 pr-9 bg-surface-container-lowest text-on-surface font-mono-sm text-[12px] rounded-lg shadow-inner placeholder:text-outline/70 focus:outline-none focus:ring-1 focus:ring-primary border border-[#262a34] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-[14px]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveFilter('ALL')}
            className={`px-3 py-1 rounded-full font-badge-label text-[10px] shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
              activeFilter === 'ALL'
                ? 'bg-primary text-on-primary font-bold shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span>ALL</span>
            <span className="px-1.5 py-0.2 bg-black/20 rounded-full font-mono text-[9px]">
              1,240
            </span>
          </button>
          <button
            onClick={() => setActiveFilter('FLAGGED')}
            className={`px-3 py-1 rounded-full font-badge-label text-[10px] shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
              activeFilter === 'FLAGGED'
                ? 'bg-error text-on-error font-bold shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
            <span>FLAGGED</span>
            <span className="px-1.5 py-0.2 bg-black/20 rounded-full font-mono text-[9px]">
              42
            </span>
          </button>
          <button
            onClick={() => setActiveFilter('SECONDARY')}
            className={`px-3 py-1 rounded-full font-badge-label text-[10px] shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
              activeFilter === 'SECONDARY'
                ? 'bg-tertiary-container text-on-tertiary-container font-bold shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
            <span>SECONDARY REVIEW</span>
            <span className="px-1.5 py-0.2 bg-black/20 rounded-full font-mono text-[9px]">
              18
            </span>
          </button>
          <button
            onClick={() => setActiveFilter('ALERTS')}
            className={`px-3 py-1 rounded-full font-badge-label text-[10px] shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
              activeFilter === 'ALERTS'
                ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[12px] text-primary">
              warning
            </span>
            <span>ALERTS</span>
            <span className="px-1.5 py-0.2 bg-black/20 rounded-full font-mono text-[9px]">
              5
            </span>
          </button>
        </div>
      </div>

      {/* Security Alert Center */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-error text-[18px]">
              emergency_home
            </span>
            <span className="font-headline-sm text-on-surface text-[14px] font-semibold">
              Security Alert Center
            </span>
          </div>
          <span className="font-mono-sm text-error bg-error-container/30 px-2 py-0.5 rounded-full font-bold text-[10px]">
            3 ACTIVE
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Alert 1 */}
          <div className="flex flex-col p-3 bg-surface-container-low rounded-xl shadow-md border border-[#262a34]">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-error-container text-on-error-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">priority_high</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-badge-label text-error font-bold tracking-widest uppercase text-[9px]">
                      CRITICAL HIT
                    </span>
                    <span className="font-mono-sm text-[10px] text-on-surface-variant/70">
                      3m ago
                    </span>
                  </div>
                  <p className="font-body-sm text-on-surface mt-0.5 leading-snug font-medium text-[12px]">
                    Repeated OCR mismatch on Border Gate 2
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="font-mono-sm text-primary-fixed-dim bg-surface-container-highest px-1.5 py-0.5 rounded text-[10px]">
                      ID #IS-9002
                    </span>
                    <span className="font-badge-label text-on-surface-variant text-[9px]">
                      CHECKSUM FAIL: L8
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alert 2 */}
          <div className="flex flex-col p-3 bg-surface-container-low rounded-xl shadow-md border border-[#262a34]">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-badge-label text-tertiary-container font-bold tracking-widest uppercase text-[9px]">
                      TAMPER DETECT
                    </span>
                    <span className="font-mono-sm text-[10px] text-on-surface-variant/70">
                      14m ago
                    </span>
                  </div>
                  <p className="font-body-sm text-on-surface mt-0.5 leading-snug text-[12px]">
                    Potential document tampering detected on flight QF-481 passenger
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="font-badge-label text-secondary bg-surface-container-highest px-1.5 py-0.5 rounded text-[9px]">
                      ML CONFIDENCE 88.4%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screening Dossiers List */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              manage_search
            </span>
            <h2 className="font-headline-sm text-on-surface text-[14px] font-semibold">
              Screening Dossiers
            </h2>
          </div>
          <span className="font-mono-sm text-on-surface-variant text-[10px]">
            {filteredList.length} IN BUFFER
          </span>
        </div>

        {filteredList.map((item) => {
          const isSelected = item.id === '#IS-8942';
          return (
            <div
              key={item.id}
              onClick={() => {
                onSelectCase(item);
                onNavigate('explainable-risk');
              }}
              className={`flex flex-col bg-surface-container-low rounded-xl p-3 shadow-md border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-primary/50 ring-1 ring-primary/40'
                  : 'border-[#262a34] hover:bg-surface-container'
              }`}
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  item.riskScore >= 66
                    ? 'bg-error'
                    : item.riskScore >= 36
                    ? 'bg-tertiary-container'
                    : 'bg-secondary'
                }`}
              ></div>
              <div className="flex items-start justify-between gap-2 pl-1.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest overflow-hidden shrink-0 relative border border-[#31353f]">
                    <img
                      src={item.avatarUrl || APP_ASSETS.historyMugshotLive}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-[#0a0e17]/80 text-[8px] font-mono text-center text-primary py-0.2">
                      {item.status === 'OPEN' ? 'LIVE' : 'CLEAR'}
                    </div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono-md text-primary font-bold text-[13px]">
                        {item.id}
                      </span>
                      <span className="font-badge-label bg-surface-container-highest text-on-surface px-1.5 py-0.5 rounded text-[9px]">
                        {item.nationality}
                      </span>
                    </div>
                    <span className="font-body-sm text-on-surface-variant truncate text-[11px]">
                      Officer {item.officer} • {item.gate}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <div
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                      item.riskScore >= 66
                        ? 'bg-error-container/30 text-error'
                        : item.riskScore >= 36
                        ? 'bg-tertiary-container/20 text-tertiary-fixed-dim'
                        : 'bg-secondary-container/20 text-secondary'
                    }`}
                  >
                    <span>RISK: {item.riskScore}</span>
                  </div>
                  <span className="font-badge-label text-[9px] text-on-surface-variant mt-1">
                    STATUS: {item.status}
                  </span>
                </div>
              </div>

              {isSelected && (
                <div className="mt-2 pt-1 bg-surface-container-lowest/60 rounded p-1.5 flex items-center justify-between text-on-surface border border-[#262a34]/40">
                  <span className="font-body-sm text-tertiary font-medium truncate text-[11px] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      assignment_late
                    </span>
                    Secondary Inspection Pending
                  </span>
                  <span className="font-mono-sm text-primary text-[10px] flex items-center gap-0.5 font-bold">
                    VIEW DOSSIER
                    <span className="material-symbols-outlined text-[13px]">
                      chevron_right
                    </span>
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Traceable Forensic Audit Timeline */}
      <div className="flex flex-col bg-surface-container-low rounded-xl p-3.5 shadow-xl border border-[#262a34] gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">
                account_tree
              </span>
              <h3 className="font-headline-sm text-on-surface text-[14px] font-semibold">
                Forensic Audit Trail
              </h3>
            </div>
            <span className="font-mono-sm text-on-surface-variant text-[10px]">
              RECORD: IS-8942 • HASH VALIDATED
            </span>
          </div>
          <span className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-badge-label text-[9px] font-bold border border-primary/20">
            IMMUTABLE LOG
          </span>
        </div>

        {/* Timeline Events */}
        <div className="flex flex-col gap-3 relative pl-2">
          <div className="absolute left-3.5 top-2 bottom-4 w-0.5 bg-surface-container-highest"></div>
          {AUDIT_TIMELINE.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 relative z-10">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-0.5 ${
                  item.status === 'warning'
                    ? 'bg-tertiary-container text-on-tertiary-container'
                    : item.status === 'primary'
                    ? 'bg-primary text-on-primary'
                    : item.status === 'success'
                    ? 'bg-secondary-container/50 text-secondary'
                    : 'bg-surface-container-highest text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[12px]">
                  {item.status === 'warning'
                    ? 'warning'
                    : item.status === 'primary'
                    ? 'badge'
                    : 'check'}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono-sm text-primary font-semibold text-[11px]">
                    {item.time}
                  </span>
                  <span className="font-badge-label text-outline uppercase text-[9px]">
                    {item.phase}
                  </span>
                </div>
                <span className="font-body-sm text-on-surface mt-0.5 text-[12px]">
                  {item.title}
                </span>
                <span className="font-mono-sm text-[10px] text-on-surface-variant/75 mt-0.5">
                  {item.meta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cryptographic Proof & Export Action */}
      <div className="flex flex-col gap-3 bg-surface-container-low rounded-xl p-3.5 shadow-lg border border-[#262a34]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[18px]">
              enhanced_encryption
            </span>
            <span className="font-headline-sm text-on-surface text-[14px] font-semibold">
              Cryptographic Integrity
            </span>
          </div>
          <div className="flex items-center gap-1 bg-secondary/10 px-2 py-0.5 rounded-full border border-secondary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span className="font-badge-label text-secondary uppercase text-[9px]">
              ENCLAVE SECURE
            </span>
          </div>
        </div>

        {/* SHA-256 Ledger Hash Box */}
        <div className="flex flex-col bg-surface-container-lowest p-2.5 rounded-lg border border-[#262a34] gap-1">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-badge-label uppercase tracking-widest text-outline text-[9px]">
              RECORD HASH (SHA-256)
            </span>
            <button
              onClick={handleCopyHash}
              className="flex items-center gap-1 text-primary hover:text-primary-fixed-dim transition-colors text-[10px] font-mono cursor-pointer"
            >
              <span className="material-symbols-outlined text-[13px]">
                {copiedHash ? 'check' : 'content_copy'}
              </span>
              <span>{copiedHash ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>
          <p className="font-mono-sm text-primary-fixed-dim break-all select-all leading-relaxed text-[10px]">
            {hashString}
          </p>
        </div>

        {/* PostgreSQL Connection Status */}
        <div className="flex items-center justify-between bg-surface-container px-3 py-2 rounded-lg border border-[#262a34]/60">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-primary text-[16px]">
              storage
            </span>
            <span className="font-body-sm text-on-surface truncate text-[12px]">
              PostgreSQL / Secure Vault
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className="font-badge-label text-secondary font-bold text-[9px]">
              CONNECTED & ENCRYPTED
            </span>
            <span className="material-symbols-outlined text-secondary text-[14px]">
              lock
            </span>
          </div>
        </div>

        {/* Export Action Button */}
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="w-full h-11 bg-primary text-on-primary font-headline-sm rounded-lg shadow-lg hover:bg-primary-fixed-dim transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer text-[13px]"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isExporting
              ? 'sync'
              : exportSuccess
              ? 'verified'
              : 'picture_as_pdf'}
          </span>
          <span>
            {isExporting
              ? 'GENERATING SIGNATURE...'
              : exportSuccess
              ? 'REPORT DOWNLOADED (SHA-256 SIGNED)'
              : 'Export Signed Forensic PDF Report'}
          </span>
        </button>

        <div className="flex items-center justify-center gap-1 text-on-surface-variant text-[10px]">
          <span className="material-symbols-outlined text-[13px]">history_edu</span>
          <span className="font-mono-sm text-outline">
            X.509 Compliant • Timestamp Authority Certified
          </span>
        </div>
      </div>
    </div>
  );
};
