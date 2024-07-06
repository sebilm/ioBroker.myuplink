import { Logger } from '../../../src/types';

export class LoggerMock implements Logger {
    silly(msg: string): void {}
    debug(msg: string): void {}
    info(msg: string): void {}
    error(msg: string): void {
        this.ErrorLogs.push(msg);
    }
    warn(msg: string): void {
        this.WarnLogs.push(msg);
    }

    ErrorLogs: string[] = [];
    WarnLogs: string[] = [];
}
