import type { AnalysisResult, HistoryEntry } from './types';

export const mockAnalysisResult: AnalysisResult = {
  overallStatus: 'POSSIBLE_ABNORMALITY',
  riskLevel: 'MODERATE',
  confidence: 82,
  imageQuality: {
    overall: 'Good',
    lighting: 'Adequate',
    focus: 'Mostly clear',
    visibility: 'Teeth and gums visible',
  },
  findings: [
    {
      category: 'gum_issue',
      finding: 'Possible gum redness',
      location: 'General gums',
      confidence: 78,
      visual_evidence: 'Gum tissue appears redder than normal near the lower front teeth.',
      severity: 'concern',
    },
    {
      category: 'plaque',
      finding: 'Visible plaque accumulation',
      location: 'Lower front teeth',
      confidence: 72,
      visual_evidence: 'Whitish buildup visible along the gumline of lower front teeth.',
      severity: 'concern',
    },
    {
      category: 'other',
      finding: 'No obvious severe abnormality detected',
      location: 'General',
      confidence: 85,
      visual_evidence: 'No visible cracks, dark spots, or patches detected in the scanned area.',
      severity: 'normal',
    },
  ],
  recommendation:
    'Consider professional dental evaluation if the possible abnormality persists or causes symptoms.',
  summary:
    'The video shows a general view of the teeth and gums. Possible gum redness and visible plaque accumulation were observed near the lower front teeth. No obvious cracks, dark spots, or patches were detected.',
  detectedRegions: [],
};

export const mockHistory: HistoryEntry[] = [
  {
    id: '1',
    date: '2026-10-05',
    overallStatus: 'POSSIBLE_ABNORMALITY',
    riskLevel: 'MODERATE',
    confidence: 82,
    findings: [
      {
        category: 'gum_issue',
        finding: 'Possible gum redness',
        location: 'General gums',
        confidence: 78,
        visual_evidence: 'Gum tissue appears redder than normal.',
        severity: 'concern',
      },
      {
        category: 'plaque',
        finding: 'Visible plaque accumulation',
        location: 'Lower front teeth',
        confidence: 72,
        visual_evidence: 'Whitish buildup along the gumline.',
        severity: 'concern',
      },
    ],
    recommendation: 'Consider professional dental evaluation if the possible abnormality persists.',
    summary: 'Possible gum redness and visible plaque were observed near the lower front teeth.',
  },
  {
    id: '2',
    date: '2026-09-28',
    overallStatus: 'NORMAL',
    riskLevel: 'LOW',
    confidence: 91,
    findings: [
      {
        category: 'other',
        finding: 'No significant visual abnormalities detected',
        location: 'General',
        confidence: 91,
        visual_evidence: 'Teeth and gums appear healthy in the scanned area.',
        severity: 'normal',
      },
    ],
    recommendation: 'Maintain regular oral hygiene and routine dental check-ups.',
    summary: 'No significant visual abnormalities were detected. Teeth and gums appear healthy.',
  },
  {
    id: '3',
    date: '2026-09-15',
    overallStatus: 'HIGHER_CONCERN',
    riskLevel: 'HIGH',
    confidence: 76,
    findings: [
      {
        category: 'gum_issue',
        finding: 'Gum redness',
        location: 'Upper rear gums',
        confidence: 80,
        visual_evidence: 'Noticeable redness and swelling in the upper rear gum area.',
        severity: 'high',
      },
      {
        category: 'discoloration',
        finding: 'Possible enamel discoloration',
        location: 'Upper left molar',
        confidence: 71,
        visual_evidence: 'Dark spot visible on the surface of the upper left molar.',
        severity: 'concern',
      },
    ],
    recommendation: 'Schedule a professional dental evaluation at your earliest convenience.',
    summary: 'Gum redness and possible enamel discoloration were observed. Professional evaluation is recommended.',
  },
  {
    id: '4',
    date: '2026-08-30',
    overallStatus: 'NORMAL',
    riskLevel: 'LOW',
    confidence: 95,
    findings: [
      {
        category: 'other',
        finding: 'No significant visual abnormalities detected',
        location: 'General',
        confidence: 95,
        visual_evidence: 'Teeth and gums appear healthy throughout the scanned area.',
        severity: 'normal',
      },
    ],
    recommendation: 'Maintain regular oral hygiene and routine dental check-ups.',
    summary: 'No visual abnormalities detected. Teeth and gums appear healthy.',
  },
];
