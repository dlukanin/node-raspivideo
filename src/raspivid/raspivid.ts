import { IRaspivid, IRaspividOptions } from './raspivid.interface';
import { IRaspividExecutor } from '../executor/raspivid.executor.interface';
import { RaspividExecutor } from '../executor/raspivid.executor';
import { IWatcher } from '../watcher/watcher.interface';
import { Watcher } from '../watcher/watcher';
import { ConverterFactory } from '../converter/converter.factory';
import { RaspividOptionsParser } from '../options-parser/raspivid.options-parser';
import { IConverterFactory } from '../converter/converter.factory.interface';
import { IOptionsParser } from '../options-parser/options-parser.interface';

export class Raspivid implements IRaspivid {
    public readonly defaultOptions: IRaspividOptions = {
        width: 640,
        height: 480,
        fps: 24,
        bitrate: 1200000,
        format: 'mp4',
        videoFolder: './videos',
        verticalFlip: false,
        horizontalFlip: false,
    };

    public get options(): IRaspividOptions {
        return this._options;
    }

    protected _options: IRaspividOptions;

    protected readonly _executorWatchTimeCoef: number = 100;

    constructor(
        options: Partial<IRaspividOptions> = {},
        protected readonly _executor: IRaspividExecutor = new RaspividExecutor(),
        protected readonly _watcher: IWatcher = new Watcher(),
        protected readonly _converterFactory: IConverterFactory = new ConverterFactory(),
        protected readonly _optionsParser: IOptionsParser = new RaspividOptionsParser(),
    ) {
        this.setOptions({ ...this.defaultOptions, ...options });
    }

    public async record(videoName: string, time: number, options: Partial<IRaspividOptions> = {}): Promise<void> {
        const fileName = `${videoName.replace('.h264', '')}.h264`;

        const output = `${this._options.videoFolder}/${fileName}`;

        await Promise.all([
            this._executor.exec(this._optionsParser.getCommandLineArgs({ output, time, ...this._options, ...options })),
            this._watcher.watch(output, time + Math.floor(time * this._executorWatchTimeCoef)),
        ]);

        await this._converterFactory.getConverter(this._options.format).convert(output);
    }

    public setOptions(options: Partial<IRaspividOptions>): void {
        this._options = { ...this.options, ...options };
    }
}
