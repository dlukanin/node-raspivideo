import {IConverterFactory} from './converter.factory.interface';
import {IConverter} from './converter.interface';
import {DefaultConverter} from './default.converter';
import {H264ToMp4Converter} from './h264-to-mp4.converter';

export class ConverterFactory implements IConverterFactory {
    public getConverter(format?: "mp4" | "h264"): IConverter {
        if (format === 'mp4') {
            return new H264ToMp4Converter();
        }

        return new DefaultConverter();
    }
}