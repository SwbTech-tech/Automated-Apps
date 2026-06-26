import fs from 'fs';
import path from 'path';

export class FileUtils {
  static readFile(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
  }

  static readFileBuffer(filePath: string): Buffer {
    return fs.readFileSync(filePath);
  }

  static writeFile(filePath: string, content: string): void {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  static fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  static isDirectory(filePath: string): boolean {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch {
      return false;
    }
  }

  static isFile(filePath: string): boolean {
    try {
      return fs.statSync(filePath).isFile();
    } catch {
      return false;
    }
  }

  static getFileSize(filePath: string): number {
    try {
      return fs.statSync(filePath).size;
    } catch {
      return 0;
    }
  }

  static listDirectory(dirPath: string, recursive = false): string[] {
    let files: string[] = [];
    const entries = fs.readdirSync(dirPath);

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry);
      files.push(fullPath);

      if (recursive && this.isDirectory(fullPath)) {
        files = files.concat(this.listDirectory(fullPath, true));
      }
    }

    return files;
  }

  static getExtension(filePath: string): string {
    return path.extname(filePath).toLowerCase();
  }

  static getBaseName(filePath: string): string {
    return path.basename(filePath);
  }

  static getDirectoryName(filePath: string): string {
    return path.dirname(filePath);
  }

  static normalizePath(filePath: string): string {
    return path.normalize(filePath);
  }

  static joinPaths(...paths: string[]): string {
    return path.join(...paths);
  }

  static getDirectorySize(dirPath: string): number {
    let size = 0;
    const files = this.listDirectory(dirPath, true);

    for (const file of files) {
      if (this.isFile(file)) {
        size += this.getFileSize(file);
      }
    }

    return size;
  }
}
