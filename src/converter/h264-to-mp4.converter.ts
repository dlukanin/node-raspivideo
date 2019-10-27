import {IConverter} from './converter.interface';

export class H264ToMp4Converter implements IConverter {
    public async convert(filePath: string): Promise<void> {
        return;
    }
}