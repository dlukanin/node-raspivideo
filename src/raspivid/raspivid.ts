import {IRaspivid, IRaspividOptions} from './raspivid.interface';
import {IRaspividExecutor} from '../executor/raspivid.executor.interface';
import {RaspividExecutor} from '../executor/raspivid.executor';
import {IWatcher} from '../watcher/watcher.interface';
import {Watcher} from '../watcher/watcher';
import {ConverterFactory} from '../converter/converter.factory';
import {RaspividOptionsParser} from '../options-parser/raspivid.options-parser';
import {IConverterFactory} from '../converter/converter.factory.interface';
import {IOptionsParser} from '../options-parser/options-parser.interface';

export class Raspivid implements IRaspivid {

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
    constructor(
        options: Partial<IRaspividOptions>,
        protected readonly _executor: IRaspividExecutor = new RaspividExecutor(),
        protected readonly _watcher: IWatcher = new Watcher(),
        protected readonly _converterFactory: IConverterFactory = new ConverterFactory(),
        protected readonly _optionsParser: IOptionsParser = new RaspividOptionsParser()
    ) {
        this.setOptions(Object.assign({}, options, this.defaultOptions));
    }

    public async record(videoName: string, time: number, options: IRaspividOptions): Promise<void> {
        const fileName = videoName.replace('.h264', '') + '.h264';

        const output = this.options.videoFolder + '/' + fileName;

        await Promise.all([
            this._executor.exec(this._optionsParser.getCommandLineArgs(
                Object.assign({}, {output, time}, this.options, options))
            ),
            this._watcher.watch(output, time + Math.floor(time * 0.5))
        ]);

        await this._converterFactory.getConverter(this.options.format).convert(output);
    }

    public setOptions(options: Partial<IRaspividOptions>): void {
        Object.assign(this.options, options);
    }

}