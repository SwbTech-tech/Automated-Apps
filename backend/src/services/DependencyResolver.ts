import { FileUtils } from '../utils/fileUtils';
import { Logger } from '../utils/logger';

export interface Dependency {
  name: string;
  version: string;
  required: boolean;
}

export interface ResolutionResult {
  language: string;
  dependencies: Dependency[];
  frameworks: string[];
  buildSystem: string;
  packageManager: string;
}

export class DependencyResolver {
  private logger = new Logger();

  async resolveDependencies(
    projectPath: string,
    language: string
  ): Promise<ResolutionResult> {
    this.logger.info(`Resolving dependencies for ${language} project`);

    switch (language.toLowerCase()) {
      case 'javascript':
        return await this.resolveJavaScriptDependencies(projectPath);
      case 'csharp':
        return await this.resolveCSharpDependencies(projectPath);
      case 'python':
        return await this.resolvePythonDependencies(projectPath);
      case 'java':
        return await this.resolveJavaDependencies(projectPath);
      case 'cpp':
        return await this.resolveCppDependencies(projectPath);
      case 'go':
        return await this.resolveGoDependencies(projectPath);
      case 'rust':
        return await this.resolveRustDependencies(projectPath);
      default:
        throw new Error(`Unsupported language: ${language}`);
    }
  }

  private async resolveJavaScriptDependencies(projectPath: string): Promise<ResolutionResult> {
    const packageJsonPath = FileUtils.joinPaths(projectPath, 'package.json');
    const hasPackageJson = FileUtils.fileExists(packageJsonPath);

    return {
      language: 'javascript',
      dependencies: hasPackageJson ? this.parsePackageJson(packageJsonPath) : [],
      frameworks: this.detectJavaScriptFrameworks(projectPath),
      buildSystem: 'npm',
      packageManager: 'npm'
    };
  }

  private async resolveCSharpDependencies(projectPath: string): Promise<ResolutionResult> {
    return {
      language: 'csharp',
      dependencies: [],
      frameworks: ['NET 6.0', 'NET Core'],
      buildSystem: 'msbuild',
      packageManager: 'nuget'
    };
  }

  private async resolvePythonDependencies(projectPath: string): Promise<ResolutionResult> {
    const requirementsPath = FileUtils.joinPaths(projectPath, 'requirements.txt');
    const haRequirements = FileUtils.fileExists(requirementsPath);

    return {
      language: 'python',
      dependencies: haRequirements ? this.parsePythonRequirements(requirementsPath) : [],
      frameworks: this.detectPythonFrameworks(projectPath),
      buildSystem: 'pip',
      packageManager: 'pip'
    };
  }

  private async resolveJavaDependencies(projectPath: string): Promise<ResolutionResult> {
    return {
      language: 'java',
      dependencies: [],
      frameworks: ['Spring', 'Maven', 'Gradle'],
      buildSystem: 'maven',
      packageManager: 'maven'
    };
  }

  private async resolveCppDependencies(projectPath: string): Promise<ResolutionResult> {
    return {
      language: 'cpp',
      dependencies: [],
      frameworks: [],
      buildSystem: 'cmake',
      packageManager: 'vcpkg'
    };
  }

  private async resolveGoDependencies(projectPath: string): Promise<ResolutionResult> {
    return {
      language: 'go',
      dependencies: [],
      frameworks: [],
      buildSystem: 'go build',
      packageManager: 'go modules'
    };
  }

  private async resolveRustDependencies(projectPath: string): Promise<ResolutionResult> {
    return {
      language: 'rust',
      dependencies: [],
      frameworks: [],
      buildSystem: 'cargo',
      packageManager: 'cargo'
    };
  }

  private parsePackageJson(filePath: string): Dependency[] {
    try {
      const content = FileUtils.readFile(filePath);
      const json = JSON.parse(content);
      const dependencies: Dependency[] = [];

      if (json.dependencies) {
        for (const [name, version] of Object.entries(json.dependencies)) {
          dependencies.push({ name, version: version as string, required: true });
        }
      }

      if (json.devDependencies) {
        for (const [name, version] of Object.entries(json.devDependencies)) {
          dependencies.push({ name, version: version as string, required: false });
        }
      }

      return dependencies;
    } catch (error) {
      this.logger.error('Failed to parse package.json', error as Error);
      return [];
    }
  }

  private parsePythonRequirements(filePath: string): Dependency[] {
    try {
      const content = FileUtils.readFile(filePath);
      return content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line && !line.startsWith('#'))
        .map(line => {
          const parts = line.split('==');
          return {
            name: parts[0].trim(),
            version: parts[1]?.trim() || 'latest',
            required: true
          };
        });
    } catch (error) {
      this.logger.error('Failed to parse requirements.txt', error as Error);
      return [];
    }
  }

  private detectJavaScriptFrameworks(projectPath: string): string[] {
    const frameworks: string[] = [];
    const packageJsonPath = FileUtils.joinPaths(projectPath, 'package.json');

    try {
      if (FileUtils.fileExists(packageJsonPath)) {
        const content = FileUtils.readFile(packageJsonPath);
        const json = JSON.parse(content);
        const allDeps = { ...json.dependencies, ...json.devDependencies };

        if (allDeps.react) frameworks.push('React');
        if (allDeps.vue) frameworks.push('Vue');
        if (allDeps['@angular/core']) frameworks.push('Angular');
        if (allDeps.express) frameworks.push('Express');
        if (allDeps.next) frameworks.push('Next.js');
        if (allDeps.nuxt) frameworks.push('Nuxt');
      }
    } catch (error) {
      this.logger.debug('Failed to detect frameworks', error as Error);
    }

    return frameworks;
  }

  private detectPythonFrameworks(projectPath: string): string[] {
    const frameworks: string[] = [];
    const requirementsPath = FileUtils.joinPaths(projectPath, 'requirements.txt');

    try {
      if (FileUtils.fileExists(requirementsPath)) {
        const content = FileUtils.readFile(requirementsPath);

        if (content.includes('django')) frameworks.push('Django');
        if (content.includes('flask')) frameworks.push('Flask');
        if (content.includes('fastapi')) frameworks.push('FastAPI');
        if (content.includes('tornado')) frameworks.push('Tornado');
        if (content.includes('pandas')) frameworks.push('Pandas');
        if (content.includes('numpy')) frameworks.push('NumPy');
      }
    } catch (error) {
      this.logger.debug('Failed to detect Python frameworks', error as Error);
    }

    return frameworks;
  }
}
