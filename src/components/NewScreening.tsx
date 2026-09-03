import React, { useState } from 'react';
import { ActiveScreen, ScreeningCase } from '../types';
import { APP_ASSETS } from '../data/mockData';

interface NewScreeningProps {
  onNavigate: (screen: ActiveScreen) => void;
  onSelectCase: (caseItem: ScreeningCase) => void;
  cases: ScreeningCase[];
}

export const NewScreening: React.FC<NewScreeningProps> = ({
  onNavigate,
  onSelectCase,
  cases
}) => {
  const [selectedMode, setSelectedMode] = useState<'std' | 'strict' | 'vip'>('std');
  const [presetScenario, setPresetScenario] = useState('case-2');
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedFlash, setCapturedFlash] = useState(false);
  const [irFilterActive, setIrFilterActive] = useState(false);

  const handleProceed = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const targetCase =
        cases.find((c) =>
          presetScenario === 'case-1'
            ? c.id === '#IS-8941'
            : presetScenario === 'case-3'
            ? c.id === '#IS-8940'
            : c.id === '#IS-8942'
        ) || cases[0];
      onSelectCase(targetCase);
      onNavigate('explainable-risk');
    }, 600);
  };

  const handleCapture = () => {
    setCapturedFlash(true);
    setTimeout(() => setCapturedFlash(false), 400);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 sm:px-5 gap-4 pb-28 pt-2">
      {/* Top Telemetry & Title */}
      <div className="flex flex-col gap-1 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="font-mono-sm text-primary uppercase font-bold tracking-widest text-[11px]">
              STATION 04 // LIVE TELEMETRY
            </span>
          </div>
          <div className="px-2 py-0.5 bg-surface-container-high rounded-full flex items-center gap-1 border border-[#31353f]">
            <span className="material-symbols-outlined text-[12px] text-secondary">
              memory
            </span>
            <span className="font-badge-label text-secondary tracking-wider text-[9px]">
              LATENCY: 14MS
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-headline-lg text-on-surface tracking-tight font-bold text-[22px]">
            New Identity Screening
          </h1>
          <p className="font-body-sm text-on-surface-variant text-[12px]">
            Multi-layer document tampering detection & biometric face similarity
          </p>
        </div>

        {/* Mode Selector & Preset Switcher */}
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex p-1 bg-surface-container-lowest rounded-xl border border-[#262a34]">
            <button
              onClick={() => setSelectedMode('std')}
              className={`flex-1 py-1 rounded-lg font-mono-sm text-center font-medium transition-all text-[11px] cursor-pointer ${
                selectedMode === 'std'
                  ? 'bg-surface-container-high text-primary shadow-sm font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Standard Mode
            </button>
            <button
              onClick={() => setSelectedMode('strict')}
              className={`flex-1 py-1 rounded-lg font-mono-sm text-center font-medium transition-all text-[11px] cursor-pointer ${
                selectedMode === 'strict'
                  ? 'bg-surface-container-high text-primary shadow-sm font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Strict Border Check
            </button>
            <button
              onClick={() => setSelectedMode('vip')}
              className={`flex-1 py-1 rounded-lg font-mono-sm text-center font-medium transition-all text-[11px] cursor-pointer ${
                selectedMode === 'vip'
                  ? 'bg-surface-container-high text-primary shadow-sm font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              VIP Fast-Track
            </button>
          </div>

          {/* Preset Scenarios */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-surface-container-low rounded-xl border border-[#262a34]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">
                tune
              </span>
              <span className="font-badge-label uppercase text-on-surface-variant text-[10px]">
                Preset Scenario:
              </span>
            </div>
            <select
              value={presetScenario}
              onChange={(e) => setPresetScenario(e.target.value)}
              className="bg-surface-container-high text-primary font-mono-sm py-1 px-2.5 rounded-lg border border-[#3c494e] outline-none text-[11px] cursor-pointer"
            >
              <option value="case-2">Case 2: Suspicious Passport</option>
              <option value="case-1">Case 1: Standard Verified Pass</option>
              <option value="case-3">Case 3: High-Risk Interdiction</option>
            </select>
          </div>
        </div>
      </div>

      {/* 1. Document Scan & OCR Card */}
      <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-md border border-[#262a34]">
        <div className="px-3.5 py-2 bg-surface-container flex items-center justify-between border-b border-[#262a34]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              document_scanner
            </span>
            <span className="font-headline-sm text-on-surface font-semibold text-[14px]">
              1. Document Scan & OCR
            </span>
          </div>
          <span className="font-mono-sm text-secondary bg-secondary-container/20 px-2 py-0.5 rounded text-[10px] font-bold">
            LIVE READ
          </span>
        </div>

        <div className="p-3 flex flex-col gap-2.5">
          {/* Visual Scan Frame */}
          <div
            className={`relative w-full aspect-[16/10] bg-surface-container-lowest rounded-xl overflow-hidden flex items-center justify-center border border-[#31353f] transition-all ${
              irFilterActive ? 'contrast-150 hue-rotate-180' : ''
            }`}
          >
            <img
              className="w-full h-full object-cover"
              src={APP_ASSETS.passportScannerHighRes}
              alt="Biometric e-passport scan"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/20 pointer-events-none"></div>

            {/* Badges Over Image */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0a0e17]/80 backdrop-blur-md border border-[#31353f]/60">
                <span className="material-symbols-outlined text-[13px] text-secondary">
                  verified
                </span>
                <span className="font-badge-label text-secondary text-[9px]">
                  HOLOGRAM INTACT
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#0a0e17]/80 backdrop-blur-md border border-[#31353f]/60">
                <span className="material-symbols-outlined text-[13px] text-secondary">
                  fiber_manual_record
                </span>
                <span className="font-badge-label text-secondary text-[9px]">
                  CHIP NFC 13.56MHz
                </span>
              </div>
            </div>

            {/* Tamper Box Marker */}
            <div className="absolute right-3 top-3 p-1.5 bg-tertiary-container/40 backdrop-blur-md rounded border border-tertiary/40 flex items-center gap-1 animate-pulse">
              <span className="material-symbols-outlined text-[14px] text-tertiary">
                warning
              </span>
              <span className="font-badge-label text-tertiary text-[9px] font-bold">
                ANOMALY DETECTED
              </span>
            </div>

            {/* Bottom Quality Strip */}
            <div className="absolute bottom-0 inset-x-0 bg-[#0a0e17]/90 backdrop-blur-md px-3 py-1 flex items-center justify-between text-[10px]">
              <span className="font-badge-label text-secondary">QUALITY: 98% GOOD</span>
              <span className="font-badge-label text-on-surface-variant">
                LIGHTING: OPTIMAL
              </span>
              <span className="font-badge-label text-primary">GLARE: 0%</span>
            </div>
          </div>

          {/* Document Tags */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-badge-label px-2 py-0.5 rounded bg-surface-container-high text-primary font-bold text-[10px]">
              PASSPORT
            </span>
            <span className="font-badge-label px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px]">
              VISA
            </span>
            <span className="font-badge-label px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px]">
              NATIONAL ID
            </span>
            <span className="font-badge-label px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px]">
              RESIDENCE
            </span>
          </div>

          {/* Action Controls */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => alert('Document re-scanned from feeder bed.')}
              className="flex items-center justify-center gap-1.5 py-1.5 bg-surface-container-high hover:bg-surface-bright rounded-lg text-primary text-[11px] font-mono transition-colors cursor-pointer border border-[#3c494e]"
            >
              <span className="material-symbols-outlined text-[15px]">file_upload</span>
              <span className="font-badge-label">UPLOAD</span>
            </button>
            <button
              onClick={() => alert('Scanner recalibrated.')}
              className="flex items-center justify-center gap-1.5 py-1.5 bg-surface-container-high hover:bg-surface-bright rounded-lg text-on-surface text-[11px] font-mono transition-colors cursor-pointer border border-[#3c494e]"
            >
              <span className="material-symbols-outlined text-[15px]">refresh</span>
              <span className="font-badge-label">RETAKE</span>
            </button>
            <button
              onClick={() => setIrFilterActive(!irFilterActive)}
              className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-mono transition-colors cursor-pointer border ${
                irFilterActive
                  ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-bright border-[#3c494e]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">troubleshoot</span>
              <span className="font-badge-label">RAW IR/UV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Presented Face Similarity Card */}
      <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-md border border-[#262a34]">
        <div className="px-3.5 py-2 bg-surface-container flex items-center justify-between border-b border-[#262a34]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">face</span>
            <span className="font-headline-sm text-on-surface font-semibold text-[14px]">
              2. Presented Face Biometrics
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-mono-sm text-secondary text-[11px]">60 FPS</span>
          </div>
        </div>

        <div className="p-3 flex flex-col gap-2.5">
          {/* Camera Viewfinder */}
          <div
            className={`relative w-full aspect-[16/11] bg-surface-container-lowest rounded-xl overflow-hidden flex items-center justify-center border border-[#31353f] transition-all ${
              capturedFlash ? 'brightness-150 ring-4 ring-primary' : ''
            }`}
          >
            <img
              className="w-full h-full object-cover"
              src={APP_ASSETS.liveCameraBiometric}
              alt="Live checkpoint gate feed"
            />
            {/* Viewfinder Overlays */}
            <div className="absolute top-2 left-2 bg-[#0a0e17]/85 backdrop-blur-md px-2 py-0.5 rounded border border-[#31353f]/60">
              <span className="font-mono-sm text-primary font-semibold text-[10px]">
                1 SUBJECT IN FRAME
              </span>
            </div>
            <div className="absolute top-2 right-2 bg-secondary-container/40 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1 border border-secondary/40">
              <span className="material-symbols-outlined text-secondary text-[12px]">
                check_circle
              </span>
              <span className="font-badge-label text-secondary font-bold text-[9px]">
                LIVENESS: 99.4%
              </span>
            </div>
            {/* Bottom Telemetry HUD */}
            <div className="absolute bottom-0 inset-x-0 bg-[#0a0e17]/90 backdrop-blur-md px-3 py-1 flex items-center justify-between text-on-surface-variant text-[10px] font-mono">
              <span>POSE: 0° YAW</span>
              <span>NEUTRAL: 98%</span>
              <span className="text-primary font-bold">MATCH: 94.7%</span>
            </div>
          </div>

          {/* Camera Controls */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={handleCapture}
              className="flex items-center justify-center gap-1.5 py-1.5 bg-primary-container hover:bg-primary text-on-primary font-semibold rounded-lg shadow text-[11px] font-mono transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">photo_camera</span>
              <span className="font-badge-label">CAPTURE</span>
            </button>
            <button
              onClick={() => alert('Face contour baseline reset.')}
              className="flex items-center justify-center gap-1.5 py-1.5 bg-surface-container-high hover:bg-surface-bright rounded-lg text-on-surface text-[11px] font-mono transition-colors cursor-pointer border border-[#3c494e]"
            >
              <span className="material-symbols-outlined text-[15px]">replay</span>
              <span className="font-badge-label">RETAKE</span>
            </button>
            <button
              onClick={() => alert('HD stream pinned.')}
              className="flex items-center justify-center gap-1.5 py-1.5 bg-surface-container-high hover:bg-surface-bright rounded-lg text-on-surface text-[11px] font-mono transition-colors cursor-pointer border border-[#3c494e]"
            >
              <span className="material-symbols-outlined text-[15px]">videocam</span>
              <span className="font-badge-label">STREAM</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. 8-Stage Pipeline HUD */}
      <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-md border border-[#262a34]">
        <div className="px-3.5 py-2 bg-surface-container flex items-center justify-between border-b border-[#262a34]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">
              account_tree
            </span>
            <span className="font-headline-sm text-on-surface font-semibold text-[14px]">
              Verification Pipeline (8-Stage)
            </span>
          </div>
          <span className="font-badge-label px-2 py-0.5 rounded bg-surface-container-highest text-primary text-[10px]">
            STAGE 8/8 READY
          </span>
        </div>

        <div className="p-3 flex flex-col gap-1.5">
          {[
            { num: '1', title: 'Image Preprocessing', status: 'COMPLETE (120ms)', state: 'ok' },
            { num: '2', title: 'OCR Extraction Engine', status: 'COMPLETE (180ms)', state: 'ok' },
            { num: '3', title: 'MRZ Syntax & Checksums', status: 'CHECKSUM VALID', state: 'ok' },
            { num: '4', title: 'Cross-Field Consistency', status: 'VALIDATED', state: 'ok' },
            { num: '5', title: 'Tampering Forensics', status: '⚠ POTENTIAL ANOMALY', state: 'warn' },
            { num: '6', title: 'Face Biometric Similarity', status: '94.7% SIMILARITY', state: 'ok' },
            { num: '7', title: 'Risk Engine Fusion', status: 'INDEX CALCULATED', state: 'ok' },
            { num: '8', title: 'Explainable SHAP Attribution', status: 'WEIGHTS READY', state: 'primary' }
          ].map((step) => (
            <div
              key={step.num}
              className={`flex items-center justify-between p-2 rounded-lg border text-[12px] ${
                step.state === 'warn'
                  ? 'bg-tertiary-container/15 border-tertiary-container/30'
                  : 'bg-surface-container border-[#262a34]/40'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    step.state === 'warn'
                      ? 'bg-tertiary text-on-tertiary'
                      : step.state === 'primary'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary/20 text-secondary'
                  }`}
                >
                  {step.num}
                </span>
                <span
                  className={`font-body-sm ${
                    step.state === 'warn' ? 'text-tertiary font-semibold' : 'text-on-surface'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              <span
                className={`font-mono-sm text-[10px] font-medium ${
                  step.state === 'warn'
                    ? 'text-tertiary font-bold'
                    : step.state === 'primary'
                    ? 'text-primary'
                    : 'text-secondary'
                }`}
              >
                {step.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Extracted Document Data */}
      <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-md border border-[#262a34]">
        <div className="px-3.5 py-2 bg-surface-container flex items-center justify-between border-b border-[#262a34]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">badge</span>
            <span className="font-headline-sm text-on-surface font-semibold text-[14px]">
              Extracted Document Data
            </span>
          </div>
          <span className="font-badge-label px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[10px]">
            ICAO DOC 9303
          </span>
        </div>

        <div className="p-3 flex flex-col gap-2.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col p-2 bg-surface-container rounded-lg border border-[#262a34]">
              <span className="font-badge-label text-on-surface-variant uppercase text-[9px]">
                Full Legal Name
              </span>
              <span className="font-mono-md text-on-surface font-bold truncate text-[12px]">
                DEMO CITIZEN, ALEXANDER
              </span>
            </div>
            <div className="flex flex-col p-2 bg-surface-container rounded-lg border border-[#262a34]">
              <span className="font-badge-label text-on-surface-variant uppercase text-[9px]">
                Document Number
              </span>
              <span className="font-mono-md text-primary font-bold text-[12px]">
                P••••••42 (Masked)
              </span>
            </div>
            <div className="flex flex-col p-2 bg-surface-container rounded-lg border border-[#262a34]">
              <span className="font-badge-label text-on-surface-variant uppercase text-[9px]">
                Date of Birth
              </span>
              <span className="font-mono-md text-on-surface text-[12px]">
                14 APR 1988 (Age 36)
              </span>
            </div>
            <div className="flex flex-col p-2 bg-surface-container rounded-lg border border-[#262a34]">
              <span className="font-badge-label text-on-surface-variant uppercase text-[9px]">
                Nationality
              </span>
              <span className="font-mono-md text-on-surface text-[12px]">
                UTOPIA (UTO)
              </span>
            </div>
            <div className="flex flex-col p-2 bg-surface-container rounded-lg col-span-2 border border-[#262a34]">
              <div className="flex items-center justify-between">
                <span className="font-badge-label text-on-surface-variant uppercase text-[9px]">
                  Expiration Date
                </span>
                <span className="font-badge-label text-secondary uppercase text-[9px]">
                  VALID UNTIL 2030
                </span>
              </div>
              <span className="font-mono-md text-on-surface font-semibold text-[12px]">
                19 NOV 2030 • Standard 10-Year Validity
              </span>
            </div>
          </div>

          {/* Synthetic MRZ TD3 viewer */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-badge-label text-on-surface-variant uppercase text-[9px]">
                Machine Readable Zone (MRZ TD3)
              </span>
              <span className="font-badge-label text-secondary uppercase text-[9px]">
                PARITY: 100%
              </span>
            </div>
            <div className="p-2.5 bg-surface-container-lowest rounded-lg font-mono-sm text-[11px] overflow-x-auto text-on-surface leading-loose tracking-widest border border-[#262a34] shadow-inner">
              <div className="whitespace-nowrap text-on-surface-variant">
                P&lt;UTO<span className="text-primary font-bold">DEMO&lt;&lt;ALEXANDER</span>&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
              </div>
              <div className="whitespace-nowrap text-on-surface-variant">
                P0148429&lt;3UTO<span className="text-secondary font-bold">8804146M3011195</span>&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;04
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Forensic Tampering Lens Diagnostics */}
      <div className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-md border border-[#262a34]">
        <div className="px-3.5 py-2 bg-surface-container flex items-center justify-between border-b border-[#262a34]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-tertiary text-[18px]">biotech</span>
            <span className="font-headline-sm text-on-surface font-semibold text-[14px]">
              Forensic Tampering Diagnostics
            </span>
          </div>
          <span className="font-badge-label px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container font-bold text-[10px]">
            ALERT LOGGED
          </span>
        </div>

        <div className="p-3 flex flex-col gap-2.5">
          <div className="relative w-full aspect-video bg-surface-container-lowest rounded-xl overflow-hidden flex items-center justify-center border border-[#31353f]">
            <img
              className="w-full h-full object-cover"
              src={APP_ASSETS.forensicMacroKerning}
              alt="Forensic macro magnification view"
            />
            <div className="absolute inset-0 bg-surface-container-lowest/40 backdrop-blur-[1px] flex flex-col justify-between p-2.5">
              <div className="flex items-center justify-between">
                <span className="font-badge-label px-2 py-0.5 rounded bg-tertiary text-on-tertiary font-bold text-[9px]">
                  MICROSCOPIC KERNING SHIFT (x800)
                </span>
                <span className="font-mono-sm text-on-surface text-[10px]">
                  LOC: LINE 2, CHAR 14-22
                </span>
              </div>
              <div className="w-32 h-14 self-center rounded bg-tertiary-container/30 backdrop-blur-sm flex flex-col items-center justify-center shadow-[0_0_16px_rgba(255,172,166,0.5)] border border-tertiary/40">
                <span className="font-badge-label text-tertiary font-bold text-[9px]">
                  SPLICE VARIANCE
                </span>
                <span className="font-mono-sm text-on-surface font-bold text-[12px]">
                  ΔE = 4.8
                </span>
              </div>
              <div className="flex items-center justify-between text-on-surface-variant font-mono-sm text-[10px]">
                <span>ALGORITHM: ELA + CNN V4</span>
                <span>CONFIDENCE: 84.1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Proceed to Explainable Risk CTA */}
      <div className="flex flex-col gap-2 pt-1 pb-4">
        <button
          onClick={handleProceed}
          disabled={isProcessing}
          className="w-full py-3 px-4 bg-primary hover:bg-primary-fixed-dim text-on-primary font-headline-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(71,214,255,0.3)] active:scale-[0.99] transition-all cursor-pointer"
        >
          {isProcessing ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[20px]">
                progress_activity
              </span>
              <span>Compiling Neural Attributions...</span>
            </>
          ) : (
            <>
              <span>Proceed to Explainable Risk & Officer Decision</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </>
          )}
        </button>
        <div className="flex items-center justify-center gap-1.5 text-on-surface-variant">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          <span className="font-mono-sm text-[11px]">CASE LOGGED IN AUDIT CHAIN #8492-29B</span>
        </div>
      </div>
    </div>
  );
};
