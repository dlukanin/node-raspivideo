import {IRaspivid, IRaspividOptions} from './raspivid.interface';
import {IRaspividExecutor} from '../executor/raspivid.executor.interface';
import {RaspividExecutor} from '../executor/raspivid.executor';
import {IWatcher} from '../watcher/watcher.interface';
import {Watcher} from '../watcher/watcher';
import {ConverterFactory} from '../converter/converter.factory';
import {RaspividOptionsParser} from '../options-parser/raspivid.options-parser';

export class Raspivid implements IRaspivid {
    constructor(
        protected readonly _executor: IRaspividExecutor = new RaspividExecutor(),
        protected readonly _watcher: IWatcher = new Watcher(),
        protected readonly _converterFactory = new ConverterFactory(),
        protected readonly _optionsParser = new RaspividOptionsParser()
    ) {

    }

    public readonly defaultOptions: IRaspividOptions = {
        width: 640,
        height: 480,
        fps: 24,
        bitrate: 1200000,
        format: 'mp4',
        videoFolder: './videos',
        verticalFlip: true,
        horizontalFlip: true
    };
    public readonly options: IRaspividOptions;

    public async record(videoName: string, time: number, options: IRaspividOptions): Promise<void> {
        const fileName = videoName.replace('.h264', '') + '.h264';

        const output = this.options.videoFolder + '/' + fileName;

        await Promise.all([
            this._executor.exec(this._optionsParser.getCommandLineArgs(
                Object.assign({}, {output, time}, this.options))
            ),
            this._watcher.watch(output)
        ]);

        await this._converterFactory.getConverter(this.options.format).convert(output);
    }

    public setOptions(options: Partial<IRaspividOptions>): void {
        Object.assign(this.options, options);
    }

}