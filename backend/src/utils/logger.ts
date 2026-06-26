export class Logger {
  private prefix = '[Automated-Apps]';

  private formatTime(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: string, message: string): string {
    return `${this.formatTime()} ${this.prefix} [${level}] ${message}`;
  }

  info(message: string, data?: any): void {
    console.log(this.formatMessage('INFO', message), data || '');
  }

  warn(message: string, data?: any): void {
    console.warn(this.formatMessage('WARN', message), data || '');
  }

  error(message: string, error?: Error | any): void {
    console.error(this.formatMessage('ERROR', message));
    if (error) {
      console.error(error);
    }
  }

  debug(message: string, data?: any): void {
    if (process.env.DEBUG) {
      console.debug(this.formatMessage('DEBUG', message), data || '');
    }
  }
}
