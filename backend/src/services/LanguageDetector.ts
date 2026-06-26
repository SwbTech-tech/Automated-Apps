import { FileUtils } from '../utils/fileUtils';
import { Logger } from '../utils/logger';
import { DetectedLanguage } from '../types/Project';

export class LanguageDetector {
  private logger = new Logger();

  private languagePatterns = {
    csharp: {
      extensions: ['.cs', '.csproj', '.sln'],
      configFiles: ['*.csproj', 'appsettings.json', 'packages.config'],
      indicators: ['using System', 'class', 'namespace']
    },
    javascript: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      configFiles: ['package.json', '.eslintrc', 'tsconfig.json', 'webpack.config.js'],
      indicators: ['require(', 'import ', 'module.exports', 'export', 'const']
    },
    python: {
      extensions: ['.py'],
      configFiles: ['requirements.txt', 'setup.py', 'pyproject.toml', 'Pipfile'],
      indicators: ['import ', 'def ', 'class ', 'if __name__']
    },
    java: {
      extensions: ['.java'],
      configFiles: ['pom.xml', 'build.gradle', '.classpath', 'build.properties'],
      indicators: ['package ', 'class ', 'public static', 'import java']
    },
    cpp: {
      extensions: ['.cpp', '.cc', '.cxx', '.h', '.hpp', '.c'],
      configFiles: ['CMakeLists.txt', 'Makefile', '.sln', 'vcxproj'],
      indicators: ['#include', 'int main', 'std::', 'void']
    },
    go: {
      extensions: ['.go'],
      configFiles: ['go.mod', 'go.sum', 'Makefile'],
      indicators: ['package main', 'import (', 'func', 'go:']
    },
    rust: {
      extensions: ['.rs'],
      configFiles: ['Cargo.toml', 'Cargo.lock'],
      indicators: ['fn main', 'let ', 'use ', 'mod ']
    }
  };

  async detectLanguages(projectPath: string): Promise<DetectedLanguage[]> {
    const files = FileUtils.listDirectory(projectPath, true);
    const detectedLanguages: Map<string, DetectedLanguage> = new Map();

    for (const file of files) {
      const ext = FileUtils.getExtension(file);
      const fileName = FileUtils.getBaseName(file);

      // Check by extension
      for (const [lang, patterns] of Object.entries(this.languagePatterns)) {
        if ((patterns.extensions as string[]).includes(ext)) {
          if (!detectedLanguages.has(lang)) {
            detectedLanguages.set(lang, {
              language: lang,
              confidence: 50,
              indicators: [],
              files: []
            });
          }
          const detected = detectedLanguages.get(lang)!;
          detected.files.push(file);
          detected.confidence = Math.min(100, detected.confidence + 10);
        }

        // Check by config files
        if ((patterns.configFiles as string[]).some(cf => fileName.includes(cf))) {
          if (!detectedLanguages.has(lang)) {
            detectedLanguages.set(lang, {
              language: lang,
              confidence: 70,
              indicators: [fileName],
              files: [file]
            });
          } else {
            const detected = detectedLanguages.get(lang)!;
            detected.confidence = Math.min(100, detected.confidence + 20);
            detected.indicators.push(fileName);
            if (!detected.files.includes(file)) {
              detected.files.push(file);
            }
          }
        }
      }
    }

    // Sort by confidence
    const result = Array.from(detectedLanguages.values()).sort(
      (a, b) => b.confidence - a.confidence
    );

    this.logger.info(`Detected ${result.length} language(s) in project`);
    for (const lang of result) {
      this.logger.info(`  - ${lang.language}: ${lang.confidence}% confidence (${lang.files.length} files)`);
    }

    return result;
  }
}
