import { FileUtils } from '../utils/fileUtils';
import { LanguageDetector } from './LanguageDetector';
import { Logger } from '../utils/logger';
import { ProjectAnalysisResult, Project, ProjectMetadata } from '../types/Project';

export class ProjectAnalyzer {
  private logger = new Logger();
  private languageDetector = new LanguageDetector();

  async analyzeProject(projectPath: string): Promise<ProjectAnalysisResult> {
    const startTime = Date.now();
    this.logger.info(`Starting project analysis: ${projectPath}`);

    try {
      // Check if project path exists
      if (!FileUtils.fileExists(projectPath)) {
        throw new Error(`Project path does not exist: ${projectPath}`);
      }

      if (!FileUtils.isDirectory(projectPath)) {
        throw new Error(`Project path is not a directory: ${projectPath}`);
      }

      // Detect languages
      const languages = await this.languageDetector.detectLanguages(projectPath);

      if (languages.length === 0) {
        throw new Error('Could not detect any programming languages in the project');
      }

      // Create project object
      const project: Project = {
        id: this.generateProjectId(),
        name: FileUtils.getBaseName(projectPath),
        path: projectPath,
        languages,
        primaryLanguage: languages[0],
        metadata: await this.gatherProjectMetadata(projectPath),
        files: await this.gatherProjectFiles(projectPath),
        configFiles: await this.gatherConfigFiles(projectPath),
        frameworks: [], // To be populated
        description: 'Auto-detected project'
      };

      const analysisTime = Date.now() - startTime;

      return {
        project,
        analysisTime
      };
    } catch (error) {
      const analysisTime = Date.now() - startTime;
      this.logger.error(`Project analysis failed after ${analysisTime}ms`, error as Error);
      throw error;
    }
  }

  private async gatherProjectMetadata(projectPath: string): Promise<ProjectMetadata> {
    const stat = FileUtils.listDirectory(projectPath, true);
    const directories = stat.filter(f => FileUtils.isDirectory(f));
    const files = stat.filter(f => FileUtils.isFile(f));
    const totalSize = FileUtils.getDirectorySize(projectPath);

    return {
      name: FileUtils.getBaseName(projectPath),
      path: projectPath,
      createdAt: new Date(),
      modifiedAt: new Date(),
      totalSize,
      fileCount: files.length,
      directoryCount: directories.length
    };
  }

  private async gatherProjectFiles(projectPath: string) {
    const files = FileUtils.listDirectory(projectPath, true);
    return files
      .filter(f => FileUtils.isFile(f))
      .slice(0, 100) // Limit to first 100 files
      .map(f => ({
        path: f,
        name: FileUtils.getBaseName(f),
        size: FileUtils.getFileSize(f),
        extension: FileUtils.getExtension(f)
      }));
  }

  private async gatherConfigFiles(projectPath: string) {
    const configFileNames = [
      'package.json',
      'package-lock.json',
      'yarn.lock',
      '.csproj',
      'pom.xml',
      'build.gradle',
      'go.mod',
      'Cargo.toml',
      'requirements.txt',
      'setup.py',
      '.github',
      '.gitignore',
      'Dockerfile',
      '.env',
      'tsconfig.json'
    ];

    const files = FileUtils.listDirectory(projectPath, true);
    return files
      .filter(f => FileUtils.isFile(f))
      .filter(f => configFileNames.includes(FileUtils.getBaseName(f)))
      .map(f => ({
        path: f,
        name: FileUtils.getBaseName(f),
        size: FileUtils.getFileSize(f),
        extension: FileUtils.getExtension(f)
      }));
  }

  private generateProjectId(): string {
    return `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
