export class WatcherTimeoutError extends Error {
    constructor(filePath, time) {
        super('Timeout watching for ' + filePath + ' for ' + time + 'ms');
    }
}