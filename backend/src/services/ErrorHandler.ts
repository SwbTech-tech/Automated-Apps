import { Logger } from '../utils/logger';
import { ErrorReport, ErrorSolution, ErrorPattern } from '../types/Error';

export class ErrorHandler {
  private logger = new Logger();
  private errorPatterns: ErrorPattern[] = [];
  private errorSolutions: Map<string, ErrorSolution> = new Map();

  async handleError(error: Error, context?: Record<string, any>): Promise<ErrorReport> {
    const errorReport: ErrorReport = {
      id: this.generateErrorId(),
      timestamp: new Date(),
      errorCode: this.categorizeError(error),
      message: error.message,
      stackTrace: error.stack,
      buildContext: context
    };

    this.logger.error(`Error handled: ${errorReport.errorCode}`, error);
    return errorReport;
  }

  private categorizeError(error: Error): string {
    const message = error.message.toLowerCase();

    if (message.includes('module') || message.includes('require')) return 'ERR_MODULE';
    if (message.includes('permission') || message.includes('access denied')) return 'ERR_PERMISSION';
    if (message.includes('network') || message.includes('connect')) return 'ERR_NETWORK';
    if (message.includes('syntax')) return 'ERR_SYNTAX';
    if (message.includes('build') || message.includes('compile')) return 'ERR_BUILD';
    if (message.includes('dependency') || message.includes('package')) return 'ERR_DEPENDENCY';

    return 'ERR_UNKNOWN';
  }

  private generateErrorId(): string {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
