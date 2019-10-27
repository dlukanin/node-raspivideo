export interface IWatcherOptions {
    // TODO
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
}