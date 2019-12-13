import {IOptions, IOptionsParser} from './options-parser.interface';
import {IRaspividOptions} from '../raspivid/raspivid.interface';
import {ClaMapper} from 'cla-mapper';

export class RaspividOptionsParser implements IOptionsParser {
    private _optionMap: Record<keyof IOptions, string> = {
        width: '-w',
        height: '-h',
        fps: '-fps',
        bitrate: '-b',
        verticalFlip: '-vf',
        horizontalFlip: '-hf',
        output: '-o',
        time: '-t',

        format: undefined,
        videoFolder: undefined
    };

    protected readonly _claMapper = new ClaMapper(this._optionMap);

    public getCommandLineArgs(options: Partial<IRaspividOptions>): string[] {
        return this._claMapper.getCommandLineArgs(options);
    }
}