import {IConverter} from './converter.interface';

export class DefaultConverter implements IConverter {
    public readonly convertedFilePostfix: string = '';
    public readonly ex: string = '';

    public async convert(filePath: string): Promise<void> {
        return undefined;
    }
}