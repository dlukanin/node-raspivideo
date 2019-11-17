import {IConverter} from './converter.interface';

export class DefaultConverter implements IConverter {
    public readonly convertedFilePostfix: string = '';
    public readonly ex: string = '';

    /* eslint-disable */
    public async convert(filePath: string): Promise<void> {
        return undefined;
    }
}