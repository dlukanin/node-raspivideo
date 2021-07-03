export class WatcherTimeoutError extends Error {
    constructor(filePath: string, time: number) {
        super('Timeout watching for ' + filePath + ' for ' + time.toString(10) + 'ms');
    }
}