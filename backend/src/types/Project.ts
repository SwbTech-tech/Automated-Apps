export interface ProjectFile {
  path: string;
  name: string;
  size: number;
  extension: string;
  content?: string;
}

export interface DetectedLanguage {
  language: string;
  confidence: number; // 0-100
  indicators: string[];
  files: string[];
}

export interface ProjectMetadata {
  name: string;
  path: string;
  createdAt: Date;
  modifiedAt: Date;
  totalSize: number;
  fileCount: number;
  directoryCount: number;
}

export interface Project {
  id: string;
  name: string;
  path: string;
  languages: DetectedLanguage[];
  primaryLanguage: DetectedLanguage;
  metadata: ProjectMetadata;
  files: ProjectFile[];
  configFiles: ProjectFile[];
  frameworks: string[];
  description?: string;
}

export interface ProjectAnalysisResult {
  project: Project;
  analysisTime: number;
  issues?: string[];
  warnings?: string[];
}
