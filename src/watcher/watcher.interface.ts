export interface IWatcherOptions {
    /**
     * Time in ms. Watcher watches file for expireTime ms.
     */
    expireTime?: number;
}

/**
 * Interface for file system watcher - helper for raspivid.
 */
export interface IWatcher {
    readonly options: IWatcherOptions;

    /**
     * Watches passed file path and returns file buffer if file appeared.
     * @param filePath
     */
    watchAndGetFile(filePath: string): Promise<Buffer>;

    /**
     * Closes current running fs watcher.
     */
    tryToStop(): void;
}