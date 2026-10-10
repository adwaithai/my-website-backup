export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'UNKNOWN';
export type OverallStatus =
  | 'NORMAL'
  | 'POSSIBLE_ABNORMALITY'
  | 'HIGHER_CONCERN'
  | 'INSUFFICIENT_VISUAL_INFORMATION';

export interface Finding {
  category: string;
  finding: string;
  location: string;
  confidence: number;
  visual_evidence: string;
  severity: 'normal' | 'concern' | 'high';
}

export interface ImageQuality {
  overall: string;
  lighting: string;
  focus: string;
  visibility: string;
}

export interface AnalysisResult {
  overallStatus: OverallStatus;
  riskLevel: RiskLevel;
  confidence: number;
  imageQuality: ImageQuality;
  findings: Finding[];
  recommendation: string;
  summary: string;
  detectedRegions: DetectedRegion[];
}

export interface DetectedRegion {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export interface HistoryEntry {
  id: string;
  date: string;
  overallStatus: OverallStatus;
  riskLevel: RiskLevel;
  confidence: number;
  findings: Finding[];
  recommendation: string;
  summary: string;
}

export type AnalysisStepStatus = 'done' | 'active' | 'pending';

export interface AnalysisStep {
  label: string;
  status: AnalysisStepStatus;
}
