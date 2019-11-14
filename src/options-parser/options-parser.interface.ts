import {IRaspividOptions} from '../raspivid/raspivid.interface';

export interface IOptions extends IRaspividOptions {
    output: string;
}

export interface IOptionsParser {
    getCommandLineArgs(options: IOptions): string[];
}