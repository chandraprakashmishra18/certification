import { ScreeningCase, SecurityAlert } from '../types';

export const APP_ASSETS = {
  emblem: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAPBpsOoXhHJgjaEsaogpwPWa7nAhPdo2dVjC-GuZOXNA5zuKCQooGj5wTzfFLYuXLsSwX8EC9QD7dmjiqT65ArTyMui9tf_pldq1ITrFxgou247z1Ok87IjA0_0f_OaDVG7DGIK8v20_0K3kR2ysIzZUhbhn4AQ2531c5mUSls0UUAs3Dyu9RL6awWpP-JkSwS08YqNbjJcLvcctlA8yiXy6aPa1RTKxEQ5wTdfDu58PsKono_DMg',
  alexanderDocPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0FWItjTdF5nzDu5RkjI8sOghUzrTojZpT6GhkQZiqoPTJP7iY4Ls0V9D8FxdJNijFOZ1EFfg7qzAcJzJOvHgz9I-8JiSMdZJy2zABrNz-X_Jp-L6HWah2rW54Qdr4yJFmGigXr9J6guNyOcwGvRP1kGfEeZIsVbDtq4CPbAJVWQC81gDLt0-23dmojz8QLfXij2QYlo_3OnAXELRy8MFDH3vGQXe3Xn6talOxpICvbidAFMXm4Eco',
  alexanderLiveFeed: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKalVjTbVODUHq4DwGWKYRvd6G6IEx1Zl225mMqBj3KF9xU3XZUrlGuHcaPRE0Fp75dIW8TYQqBxEWAI_7DD_hEhz4uDfTUT9yxMIRnGt_U4Dz2aQOjS2kBcCJGg_r3Iob9l3J75skkFbw9Dzc8gylNUrhwIFmsuGmddYbwms_t3qnvR1nERkXU84nrAEXZjl0sKsCO_UibkKQGHhCrOumMmScLNDezyJccL1WeUck8gQRQ_ROArOk',
  deuPassportThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPnxos_3g2WThiM65TZq4CrNKKIsGqtleubhxrR8IOURiCS9PyWJe3jTrRHmUaZufHKZxc4NOdihfbmpsYSkUhn8rHUofkTseF4svj3bRbX8Z_TdJkaof4s41-pOWeGTjpDoqKm1fQUFkR2LkKzHnoCiYPiTBlryK4KqBI_zu2o4Rb7kLMzsjKa7TrTwZhnz91gccj7_RO0SUxSVQQI96ooeGp8f3_VYr0jxBN_Kh_OH3nH9FVNyhs',
  sgpNationalIdThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf5SX7QYoN2mYPWgWyZJtoWaJDs3SxVBY0dY8RVai9nq55WDsPEVxzM1HLynWDzwFLbydJll6DYQJJxt_JwNeIdKultzCfjALR94-5OO6eJlSnI9F_icFfMl6WJyT_ARMmDi6FVbypWKmjYUjyvqTyf05hQkqTw1zMQhyJKO2M1EsFqHEE6EOHEycHmH9lw07pHyDo1ErJGBmox4J7HwSInjU9fgLZaBB4NODWXrRdJzlPnq7rSf_Y',
  gbrVisaThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUoIRv7yice9j61gliU7xiqP1L2PgsQ4ie3kAAacx4YZVQdu4V0oPUSA5LmEXchpkKgBrC5QNZzEktV1KEU9h8dNud7iYT_pj2iqNeBt9N2YVOYobOXah5GdUEBvJGtfu9bFFWbHMky7lSwfdnpWMvbU87w1MAE85K9yTCa0_O6Wy-eq1MUtwIuj6HyTdPRs-5Wev7ljbBQNOVJw39IGaksgdRGVoVqk087_CzBDm_Wui3znyLOrRs',
  jpnResidenceThumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdoulVHzqvPtSD19v1Mxp5XtGPf2xcGAYZm3OQWo6WWQk3jjyXtQKLaQDN8YFMDMzNCvseqKr4yNOPnQYFH2wSVAIzSqeRumWimdHCFittx9943-w20GU9z6gs4Ywaug-IdXnwhs2YW3qLSu5_T7sVzSfu_fUSxw93jcLvnRerMexGTq1g7TcT39WLBJG-psnmgDd1H94zkPzDSLf6u1yJD-RyIrpVbYAD5jjC93usHb_Aw3wHQw1F',
  passportScannerHighRes: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeSyOs9f9fjYiTCdhx1Myyh_AEaOL3e3nMvQ8q7DwPjnCVPdt83R0Mgf_B6sV_fLiyR3v3XlV4qU8OcxdplZmPIidzwJSqeeX19SrpC0u_D3x1s6U7ichqOBTDyCrECZrrP-gTjACZC-H3BcZjh96wxq1UY0WjJuHrUN1d3h6QkeL9gR5c7qYDtB80jbrTXyCO4-j6kkeDCf3XT3okME1HuX3F5JrN3iq1zuI6Yv4Soe-DHr9mHmD3',
  liveCameraBiometric: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_NIokA_K7BwGc7gG6PYj9i0ab581XlOtK4mhrQX5OmTgs7LWsXTnTXIEA-OJDitlpcv-96aGZumg4BFEXICLO4T0IVNHxsZtBwloVn9PjpOHCV0rPUoGrn-hW1IPqWaWROpIDURuPBpG3dSNb_xTAbE2LCalnB3wR5BnssQbGxVP0VgxFz-ttS_vwTILbkEdeOYxjp6hRbNVd5-HdrtTealyLNWHctJuSfKpSTxVQwi5LXXIe9lFH',
  forensicMacroKerning: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv1z7ZzDpu2T5eEQj8ltf6gNdEhF5CVOJutA8J9YM1QRxTXLFuvGFtXbur0yxOHpCn8cdsIn8bCLnQ-vtmSegsWgH5xipnCOPoHOlgQaSPKPX5l1KSTsyUcjpm6BS2qtwchBc3ruzMvxOXwF7WzBrVXmzp1FJnaYmApiL7JCm-i3pCw1Fw_y0OFOiQYy5MPtfGHY0UqvwqcmVqRHziqvm26NNV07wzRNiPxiarizRZUw6UzhlCsPaO',
  historyMugshotLive: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArba7VKO-IiYZXlmxFHqXd9YR697DKAWCbyGN4WRGVysPoUN5UuuiTWppFIeXxQ2Hw9IFj8RnUQVnpuB4QIF5ymAJIEwn5BQdjM7S8KTnL8hbcIYPa9dmbG1LPVi8o3Ifa6Sp8pJhwy5UGYB-62bbEvgroBF3nzu5zuNGsJYvUF2GYdcXcRsDnWamIRnEmJHgAIJUrKaVo3vT1tENd0YIgl_h-_p5wK8Hw1dX50B0kSErzfeHm_k5r',
  historyProfileClear: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVWskND1YSBWKF-DXore3YN8HSsuxTER6XvEdRCMx7hIegV70RMJw25WkymNWob2zPhBmpGl5_ESGhcF1SSCTDzVsuW6nlDDJLMk-haUuVI_5_wbDpWm7B_bihDbBnj4E5E-KP3nXBtZuu-shDojxHZi7aklPSmAIYnvG8me4GTWvsqsdFjTcojjieR-6TKtQ2Udpp-tilVqO-ZwEWikEFd1Z0EZkq51TXlo6sAiQflCBx6ixMQr2I',
  historyProfileDenied: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3xGJV8bR3xlX2y3CMmH9_W4ERVkp3_PPnYL3CNI0t4xGeTD4EX0nF6FzF778bSmGT8W5QtG7ukqYQTomr7WnwZ4KDkc3X0fn9OOoPhb0QOX1F_ZnIYuTaSiSgCWpz8aGqrMGEQJ94frT5rRv-XcKh48kDlmRP5mgKujSF4dB3UPmeswAZMiwhAJdJ40gObyss-DBgZVwaVH8dvh5fdzHEZRHt4XsEaR6Qj2CUMhABeuZK-kg7zSoj',
};

export const INITIAL_CASES: ScreeningCase[] = [
  {
    id: '#IS-8942',
    docNumber: 'P014842942',
    maskedDocNumber: 'P••••••42',
    name: 'DEMO CITIZEN, ALEXANDER',
    nationality: 'DEU / UTOPIA',
    docType: 'DEU Passport (e-Passport TD3)',
    riskScore: 67,
    riskTier: 'MEDIUM',
    status: 'OPEN',
    officer: 'S. Jenkins',
    gate: 'Gate 04',
    timestamp: '14:26:12 UTC',
    anomalySummary: 'Text Manipulation Anomaly & Micro-Font Kerning Shift',
    isAnomaly: true,
    avatarUrl: APP_ASSETS.deuPassportThumbnail,
    liveFeedUrl: APP_ASSETS.alexanderLiveFeed,
    docScanUrl: APP_ASSETS.alexanderDocPhoto,
    biometricConfidence: 94.7,
    subsecondOcr: '0.24s',
    mrzString: [
      'P<UTODEMO<<ALEXANDER<<<<<<<<<<<<<<<<<<<<<<<',
      'P0148429<3UTO8804146M3011195<<<<<<<<<<<<<<04'
    ],
    featuresAttribution: [
      {
        feature: 'Text-region inconsistency',
        impact: 24,
        type: 'negative',
        description: 'Microscopic font shift detected around personal data block'
      },
      {
        feature: 'Compression artifact near issuing stamp',
        impact: 18,
        type: 'negative',
        description: 'JPEG ghost artifact indicating secondary digital overlay'
      },
      {
        feature: 'Face similarity match 94.7%',
        impact: -8,
        type: 'positive',
        description: 'ArcFace embedding distance 0.1832 exceeds threshold'
      },
      {
        feature: 'Valid MRZ structure & checksum',
        impact: -5,
        type: 'positive',
        description: 'Check digit parity confirmed across 3 lines'
      },
      {
        feature: 'Biometric passport chip match',
        impact: -3,
        type: 'positive',
        description: 'NFC chip cryptographic public key matches root CA'
      },
      {
        feature: 'Expiry & issue date mathematical consistency',
        impact: -2,
        type: 'positive',
        description: 'Standard 10-year period validates without anomaly'
      }
    ],
    verificationMatrix: [
      {
        id: '1',
        name: 'OCR Extraction',
        description: 'All text fields high-confidence parsed',
        status: 'PASS'
      },
      {
        id: '2',
        name: 'MRZ Checksums',
        description: '100% mathematical parity verified',
        status: 'PASS'
      },
      {
        id: '3',
        name: 'Document Template Match',
        description: 'ICAO standard Doc 9303 layout',
        status: 'PASS'
      },
      {
        id: '4',
        name: 'AI Tampering Detection',
        description: 'Micro-pattern anomaly detected in crest',
        status: 'WARNING'
      },
      {
        id: '5',
        name: 'Biometric Face Comparison',
        description: '94.7% exceeds biometric threshold (85%)',
        status: 'PASS'
      },
      {
        id: '6',
        name: 'Watchlist Intercept',
        description: 'NCIC / INTERPOL SLTD 0 hits',
        status: 'PASS'
      }
    ]
  },
  {
    id: '#IS-8941',
    docNumber: 'S8912388A',
    maskedDocNumber: 'S••••••8A',
    name: 'TAN, WEI LING',
    nationality: 'SGP (Singapore)',
    docType: 'SGP National ID',
    riskScore: 12,
    riskTier: 'LOW',
    status: 'CLOSED',
    disposition: 'CLEARED',
    officer: 'S. Jenkins',
    gate: 'Gate E-09 • Auto Clear',
    timestamp: '14:18:20 UTC',
    anomalySummary: 'VERIFIED • Cryptographic Signature OK',
    isAnomaly: false,
    avatarUrl: APP_ASSETS.sgpNationalIdThumbnail,
    biometricConfidence: 98.2,
    featuresAttribution: [
      { feature: 'Cryptographic signature OK', impact: -15, type: 'positive' },
      { feature: 'Facial contour parity 98.2%', impact: -12, type: 'positive' },
      { feature: 'No border infractions', impact: -8, type: 'positive' }
    ],
    verificationMatrix: [
      { id: '1', name: 'OCR Extraction', description: 'Parsed cleanly', status: 'PASS' },
      { id: '2', name: 'MRZ Checksums', description: 'Matched', status: 'PASS' },
      { id: '3', name: 'Document Template', description: 'SGP Smart ID v3', status: 'PASS' },
      { id: '4', name: 'Tamper Detection', description: 'Zero tampering', status: 'PASS' },
      { id: '5', name: 'Biometric Comparison', description: '98.2% score', status: 'PASS' },
      { id: '6', name: 'Watchlist Check', description: 'Clear', status: 'PASS' }
    ]
  },
  {
    id: '#IS-8940',
    docNumber: 'V77291819',
    maskedDocNumber: 'V••••••19',
    name: 'STERLING, RICHARD',
    nationality: 'GBR (United Kingdom)',
    docType: 'GBR Visa Subclass 600',
    riskScore: 91,
    riskTier: 'HIGH',
    status: 'ESCALATED',
    disposition: 'INTERDICTED',
    officer: 'M. Tanaka',
    gate: 'Gate 01 • LANE LOCKED',
    timestamp: '14:02:11 UTC',
    anomalySummary: 'MRZ Checksum Mismatch & Face Anomaly',
    isAnomaly: true,
    avatarUrl: APP_ASSETS.gbrVisaThumbnail,
    biometricConfidence: 41.2,
    featuresAttribution: [
      { feature: 'MRZ Check digit corruption', impact: 45, type: 'negative' },
      { feature: 'Synthetic AI face synthesis indicator', impact: 35, type: 'negative' },
      { feature: 'Issuer watermark missing', impact: 15, type: 'negative' }
    ],
    verificationMatrix: [
      { id: '1', name: 'OCR Extraction', description: 'Mismatched MRZ', status: 'FAIL' },
      { id: '2', name: 'MRZ Checksums', description: 'Checksum validation failed', status: 'FAIL' },
      { id: '3', name: 'Document Template', description: 'Irregular font family', status: 'FAIL' },
      { id: '4', name: 'Tampering Detection', description: 'Splicing confirmed', status: 'FAIL' },
      { id: '5', name: 'Biometrics', description: '41.2% below threshold', status: 'FAIL' },
      { id: '6', name: 'Watchlist Check', description: 'Interpol Red Notice alert', status: 'FAIL' }
    ]
  },
  {
    id: '#IS-8939',
    docNumber: 'R39102873',
    maskedDocNumber: 'R••••••73',
    name: 'TAKAHASHI, KENJI',
    nationality: 'JPN (Japan)',
    docType: 'JPN Residence Card',
    riskScore: 8,
    riskTier: 'LOW',
    status: 'CLOSED',
    disposition: 'CLEARED',
    officer: 'S. Jenkins',
    gate: 'Gate B-02 • Clear',
    timestamp: '13:54:02 UTC',
    anomalySummary: 'VERIFIED • Chip Authenticated',
    isAnomaly: false,
    avatarUrl: APP_ASSETS.jpnResidenceThumbnail,
    biometricConfidence: 99.1,
    featuresAttribution: [
      { feature: 'Direct e-chip cryptographic verify', impact: -20, type: 'positive' },
      { feature: 'Live infrared liveness 99.8%', impact: -14, type: 'positive' }
    ],
    verificationMatrix: [
      { id: '1', name: 'OCR Extraction', description: '100% parity', status: 'PASS' },
      { id: '2', name: 'MRZ Checksums', description: 'Verified', status: 'PASS' },
      { id: '3', name: 'Document Template Match', description: 'Compliant', status: 'PASS' },
      { id: '4', name: 'AI Tampering Detection', description: 'Clean', status: 'PASS' },
      { id: '5', name: 'Biometric Face Comparison', description: '99.1% match', status: 'PASS' },
      { id: '6', name: 'Watchlist Intercept', description: 'Clear', status: 'PASS' }
    ]
  }
];

export const SECURITY_ALERTS: SecurityAlert[] = [
  {
    id: 'alt-1',
    category: 'CRITICAL HIT',
    title: 'Repeated OCR mismatch on Border Gate 2',
    timeAgo: '3m ago',
    description: 'Repeated OCR mismatch on Border Gate 2',
    tagId: 'ID #IS-9002',
    detail: 'CHECKSUM FAIL: L8',
    severity: 'high'
  },
  {
    id: 'alt-2',
    category: 'TAMPER DETECT',
    title: 'Potential document tampering detected on flight QF-481 passenger',
    timeAgo: '14m ago',
    description: 'Potential document tampering detected on flight QF-481 passenger',
    tagId: 'ML CONFIDENCE 88.4%',
    detail: 'Micro-font splice variance detected on passport issue stamp.',
    severity: 'medium'
  },
  {
    id: 'alt-3',
    category: 'CLUSTER TELEMETRY',
    title: 'Biometric model v4.2.1 weights synchronised across cluster',
    timeAgo: '28m ago',
    description: 'Biometric model v4.2.1 weights synchronised across cluster',
    tagId: 'NODE SYD-01',
    detail: 'Latency optimized down to 14ms per embedding comparison.',
    severity: 'info'
  }
];

export const AUDIT_TIMELINE = [
  {
    time: '14:24:02.180',
    phase: 'INGESTION',
    title: 'Document image uploaded via Optical Flatbed Scanner',
    meta: 'SENSOR: Regula 70X4M • RES: 600DPI UV+IR',
    status: 'neutral'
  },
  {
    time: '14:24:04.092',
    phase: 'PARSER',
    title: 'OCR engine extracted 14 identity fields (OpenCV + Tesseract pipeline)',
    meta: 'PARSED: SURNAME, GIVEN, DOB, EXPIRY, DOC_NO',
    status: 'neutral'
  },
  {
    time: '14:24:05.441',
    phase: 'MRZ CHECKSUM',
    title: 'MRZ mathematical validation verified (Check digits: OK)',
    meta: 'P<UTOMARTIN<<JOHN<<<<<<<< PASS',
    status: 'success'
  },
  {
    time: '14:24:06.812',
    phase: 'FORENSIC ANOMALY',
    title: 'Tampering detection flagged inconsistent micro-font kerning (PyTorch CNN)',
    meta: 'ZONE B: 12% deviation from ICAO Doc 9303 standard',
    status: 'warning'
  },
  {
    time: '14:24:07.310',
    phase: 'BIOMETRIC',
    title: 'Face similarity computed: 94.7% confidence (ArcFace embedding)',
    meta: 'COSINE DIST: 0.1832 • THRESHOLD: 0.3500',
    status: 'neutral'
  },
  {
    time: '14:24:08.004',
    phase: 'RISK FUSION',
    title: 'Risk fusion model assigned composite score 67/100 (XGBoost + SHAP)',
    meta: 'WEIGHT: 0.67',
    status: 'warning'
  },
  {
    time: '14:26:12.920',
    phase: 'HUMAN DECISION',
    title: 'Officer S. Jenkins initiated secondary physical inspection review',
    meta: 'REASON: Micro-font kerning review required at Secondary Desk B',
    status: 'primary'
  }
];
