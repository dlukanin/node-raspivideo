import {IRaspivid, IRaspividOptions} from './raspivid.interface';
import {IRaspividExecutor} from '../executor/raspivid-executor.interface';
import {RaspividExecutor} from '../executor/raspivid-executor';
import {IWatcher} from '../watcher/watcher.interface';
import {Watcher} from '../watcher/watcher';
import {ConverterFactory} from '../converter/converter.factory';

export class Raspivid implements IRaspivid {
    constructor(
        protected readonly _executor: IRaspividExecutor = new RaspividExecutor(),
        protected readonly _watcher: IWatcher = new Watcher(),
        protected readonly _converterFactory = new ConverterFactory()
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

    public record(videoName: string, time: number, options: IRaspividOptions): Promise<void> {
        return undefined;
    }

    public setOptions(options: Partial<IRaspividOptions>) {
        Object.assign(this.options, options);
    }

}