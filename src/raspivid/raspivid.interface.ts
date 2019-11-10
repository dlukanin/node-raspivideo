export interface IRaspividOptions {
    /**
     * Amount of ms to record.
     */
    time: number;
    width: number;
    height: number;
    fps: number;
    bitrate: number;
    format: 'h264' | 'mp4';
}

export interface IRaspivid {
    readonly defaultOptions: IRaspividOptions;
    readonly options: IRaspividOptions;

    setOptions(options: Partial<IRaspividOptions>);

    record(options: IRaspividOptions): Promise<void>;
}