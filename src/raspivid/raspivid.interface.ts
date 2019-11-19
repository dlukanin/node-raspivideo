export interface IRaspividOptions {
    /**
     * Amount of ms to record.
     */
    width: number;
    height: number;
    fps: number;
    bitrate: number;
    verticalFlip: boolean;
    horizontalFlip: boolean;
    format: 'h264' | 'mp4';
    videoFolder: string;
}

export interface IRaspivid {
    readonly defaultOptions: IRaspividOptions;
    readonly options: IRaspividOptions;

    setOptions(options: Partial<IRaspividOptions>): void;

    record(videoName: string, time: number, options?: Partial<IRaspividOptions>): Promise<void>;
}