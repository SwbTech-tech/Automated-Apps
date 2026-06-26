export interface ErrorPattern {
  id: string;
  name: string;
  patterns: RegExp[];
  language: string;
  category: ErrorCategory;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

export type ErrorCategory =
  | 'dependency'
  | 'syntax'
  | 'runtime'
  | 'build'
  | 'environment'
  | 'network'
  | 'permission'
  | 'unknown';

export interface ErrorSolution {
  id: string;
  errorPattern: ErrorPattern;
  steps: SolutionStep[];
  preventionTips: string[];
  relatedLinks: string[];
  frequency: number; // how often this error occurs
  resolvedCount: number;
}

export interface SolutionStep {
  index: number;
  title: string;
  description: string;
  command?: string;
  commandType?: 'powershell' | 'bash' | 'nodejs';
  scriptContent?: string;
  expectedOutput?: string;
  troubleshootingTips?: string[];
}

export interface ErrorReport {
  id: string;
  timestamp: Date;
  errorCode: string;
  message: string;
  language?: string;
  projectPath?: string;
  stackTrace?: string;
  buildContext?: Record<string, any>;
  suggestedSolution?: ErrorSolution;
  userFeedback?: {
    helpful: boolean;
    notes?: string;
  };
}
