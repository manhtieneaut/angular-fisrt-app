import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private isProd = !isDevMode();

  log(...args: any[]) {
    if (!this.isProd) {
      console.log(...args);
    }
  }

  info(...args: any[]) {
    if (!this.isProd) {
      console.info(...args);
    }
  }

  warn(...args: any[]) {
    console.warn(...args);
    this.sendToServer('warn', args);
  }

  error(...args: any[]) {
    console.error(...args);
    this.sendToServer('error', args);
  }

  private sendToServer(level: string, message: any[]) {
    if (this.isProd) {
      console.log(`Sending ${level} log to server:`, ...message);
      // TODO: Gửi log đến backend hoặc Sentry tại đây
      // Ví dụ:
      // this.http.post('/api/logs', { level, message })
    }
  }
}
