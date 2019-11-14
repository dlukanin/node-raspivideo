export interface IWatcherOptions {
    // TODO
}

/**
 * Interface for file system watcher - helper for raspivid.
 */
export interface IWatcher {
    readonly options: IWatcherOptions;

    /**
     * Watches passed file path and resolves if file appeared.
     * @param filePath
     */
    watch(filePath: string): Promise<void>;
}