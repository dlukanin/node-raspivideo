export interface IRaspividExecutor {
    exec(args: string[]): Promise<void>;
}