/**
 * Interface for file system watcher - helper for raspivid.
 */
export interface IWatcher {
    /**
     * Watches passed file path and resolves if file appeared.
     * @param filePath
     * @param time
     */
    watch(filePath: string, time: number): Promise<void>;
}
