export type ActiveScreen = 'command' | 'explainable-risk' | 'new-screening' | 'history';

export interface ScreeningCase {
  id: string;
  docNumber: string;
  maskedDocNumber: string;
  name: string;
  nationality: string;
  docType: string;
  riskScore: number;
  riskTier: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'CLOSED' | 'ESCALATED';
  disposition?: 'CLEARED' | 'SECONDARY' | 'INTERDICTED';
  officer: string;
  gate: string;
  timestamp: string;
  anomalySummary: string;
  isAnomaly: boolean;
  avatarUrl: string;
  liveFeedUrl?: string;
  docScanUrl?: string;
  biometricConfidence?: number;
  subsecondOcr?: string;
  mrzString?: string[];
  featuresAttribution?: {
    feature: string;
    impact: number;
    type: 'negative' | 'positive';
    description?: string;
  }[];
  verificationMatrix?: {
    id: string;
    name: string;
    description: string;
    status: 'PASS' | 'WARNING' | 'FAIL';
  }[];
}

export interface SecurityAlert {
  id: string;
  title: string;
  category: 'CRITICAL HIT' | 'TAMPER DETECT' | 'CLUSTER TELEMETRY';
  timeAgo: string;
  description: string;
  tagId: string;
  detail: string;
  severity: 'high' | 'medium' | 'info';
}
