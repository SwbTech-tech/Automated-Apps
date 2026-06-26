import { exec, spawn } from 'child_process';
import { Logger } from '../utils/logger';

export class ScriptExecutor {
  private logger = new Logger();

  async executeCommand(
    command: string,
    cwd?: string
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    return new Promise((resolve, reject) => {
      exec(command, { cwd }, (error, stdout, stderr) => {
        if (error && error.code !== 0 && error.code !== null) {
          this.logger.error(`Command failed: ${command}`, error);
          resolve({
            stdout,
            stderr: stderr || error.message,
            exitCode: error.code
          });
        } else {
          resolve({
            stdout,
            stderr,
            exitCode: 0
          });
        }
      });
    });
  }

  async executeScript(
    scriptPath: string,
    args: string[] = [],
    cwd?: string
  ): Promise<{ stdout: string; stderr: string; exitCode: number }> {
    return new Promise((resolve, reject) => {
      const process = spawn(scriptPath, args, { cwd });
      let stdout = '';
      let stderr = '';

      process.stdout?.on('data', (data) => {
        stdout += data.toString();
        this.logger.debug(`[stdout] ${data}`);
      });

      process.stderr?.on('data', (data) => {
        stderr += data.toString();
        this.logger.debug(`[stderr] ${data}`);
      });

      process.on('close', (code) => {
        resolve({
          stdout,
          stderr,
          exitCode: code || 0
        });
      });

      process.on('error', (error) => {
        this.logger.error(`Script execution failed: ${scriptPath}`, error);
        reject(error);
      });
    });
  }
}
