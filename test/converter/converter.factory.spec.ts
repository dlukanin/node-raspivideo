import {ConverterFactory} from '../../src/converter/converter.factory';
import {DefaultConverter} from '../../src/converter/default.converter';
import {H264ToMp4Converter} from '../../src/converter/h264-to-mp4.converter';

describe('ConverterFactory', () => {
    it('should construct DefaultConverter by default', () => {
        const factory = new ConverterFactory();

        expect(factory.getConverter()).toBeInstanceOf(DefaultConverter);
    });

    it('should construct H264ToMp4Converter', () => {
        const factory = new ConverterFactory();

        expect(factory.getConverter('mp4')).toBeInstanceOf(H264ToMp4Converter);
    });

    it('should construct DefaultConverter', () => {
        const factory = new ConverterFactory();

        expect(factory.getConverter('h264')).toBeInstanceOf(DefaultConverter);
    });
});