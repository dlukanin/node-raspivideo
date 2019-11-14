import {IOptionsParser} from './options-parser.interface';
import {IRaspividOptions} from '../raspivid/raspivid.interface';

export class RaspividOptionsParser implements IOptionsParser {
    private _optionMap: Record<keyof IRaspividOptions, string> = {
        width: '-w',
        height: '-h',
        fps: '-fps',
        bitrate: '-b',
        verticalFlip: '-vf',
        horizontalFlip: '-hf',

        format: undefined,
        videoFolder: undefined,
    };

    public getCommandLineArgs(options: IRaspividOptions): string[] {
        return [];
    }
}