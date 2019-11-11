import {IConverter} from './converter.interface';

export interface IConverterFactory {
    getConverter(format?: 'mp4' | 'h264'): IConverter;
}