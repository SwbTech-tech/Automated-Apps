export interface LanguageProfile {
  id: string;
  name: string;
  extensions: string[];
  packageManagers: string[];
  buildSystems: string[];
  configFiles: string[];
  frameworks: LanguageFramework[];
  runtimes: LanguageRuntime[];
  tools: string[];
  minimalDependencies: Dependency[];
  recommendedDependencies: Dependency[];
}

export interface LanguageFramework {
  name: string;
  configFile: string;
  buildCommand: string;
  detectPatterns: string[];
}

export interface LanguageRuntime {
  name: string;
  version?: string;
  installScript: string;
  verifyCommand: string;
}

export interface Dependency {
  name: string;
  version: string;
  description?: string;
  required: boolean;
  installCommand: string;
}

export interface BuildProfile {
  languageId: string;
  strategy: 'minimal' | 'recommended' | 'advanced';
  steps: BuildStep[];
  estimatedTime: number; // in seconds
  requirements: DependencyRequirement[];
}

export interface BuildStep {
  id: string;
  name: string;
  description: string;
  command: string;
  platform: 'windows' | 'unix' | 'all';
  scriptType: 'powershell' | 'bash' | 'nodejs';
  timeout?: number; // in seconds
  retryable: boolean;
  criticalOnFail: boolean;
}

export interface DependencyRequirement {
  name: string;
  minimumVersion: string;
  installCommand: string;
  verifyCommand: string;
  optional: boolean;
}
