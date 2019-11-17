import {IOptions, IOptionsParser} from './options-parser.interface';
import {IRaspividOptions} from '../raspivid/raspivid.interface';

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

    public getCommandLineArgs(options: Partial<IRaspividOptions>): string[] {
        const args = [];

        Object.entries(options).forEach((entry) => {
            const key = entry[0];
            const value = entry[1];

            const arg = this._optionMap[key];

            if (arg) {
                if (typeof value === 'boolean') {
                    if (value) {
                        args.push(arg);
                    }
                } else {
                    args.push(arg);
                    args.push(value.toString());
                }
            }
        });

        return args;
    }
}