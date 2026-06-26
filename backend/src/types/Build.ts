export type BuildStatus = 'idle' | 'preparing' | 'installing' | 'building' | 'completed' | 'failed' | 'cancelled';
export type BuildStrategy = 'minimal' | 'recommended' | 'advanced' | 'custom';

export interface BuildRequest {
  projectPath: string;
  strategy: BuildStrategy;
  targetPlatform: 'windows' | 'android' | 'macos' | 'linux';
  outputPath?: string;
  options?: BuildOptions;
}

export interface BuildOptions {
  skipValidation?: boolean;
  skipDependencyCheck?: boolean;
  parallelBuild?: boolean;
  optimized?: boolean;
  verbose?: boolean;
  customEnvironmentVariables?: Record<string, string>;
}

export interface BuildProgress {
  id: string;
  projectPath: string;
  status: BuildStatus;
  currentStep: number;
  totalSteps: number;
  currentStepName: string;
  progressPercentage: number;
  estimatedTimeRemaining: number; // in seconds
  elapsedTime: number; // in seconds
  startTime: Date;
  lastUpdate: Date;
  logs: BuildLog[];
  errors: BuildError[];
}

export interface BuildStep {
  id: string;
  index: number;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  duration?: number; // in seconds
  command: string;
}

export interface BuildLog {
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'debug';
  message: string;
  source?: string;
  context?: Record<string, any>;
}

export interface BuildError {
  id: string;
  timestamp: Date;
  errorCode: string;
  message: string;
  details?: string;
  stackTrace?: string;
  suggestedFix?: string;
  line?: number;
  file?: string;
}

export interface BuildResult {
  id: string;
  projectPath: string;
  success: boolean;
  status: BuildStatus;
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  outputPath?: string;
  logs: BuildLog[];
  errors: BuildError[];
  warnings: string[];
  artifactSize?: number;
  targetPlatform: string;
}
