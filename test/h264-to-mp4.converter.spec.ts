import {H264ToMp4Converter} from '../src/converter/h264-to-mp4.converter';
import * as fs from 'fs';
import {ConverterError} from '../src/converter/error/converter.error';

const videosDir = __dirname + '/videos';
const fileName = 'sample';

describe('H264ToMp4Converter', () => {
    let converter;
    let convertedFilePath;
    let originalFilePath;

    beforeEach(async () => {
        converter = new H264ToMp4Converter();
        originalFilePath = videosDir + '/' + fileName + '.h264';
        convertedFilePath = videosDir + '/' + fileName + converter.convertedFilePostfix + converter.ex;

    });

    afterEach(async () => {
        try {
            await fs.promises.unlink(convertedFilePath);
        } catch {
            // NOTE we have test cases that are not producing files so we ignore err
        }
    });

    it('should convert to mp4', async () => {
        await converter.convert(originalFilePath);

        await fs.promises.stat(convertedFilePath);
    });

    it('should throw converter error when something bad happens (no file found)', async () => {
        let err;

        try {
            await converter.convert(videosDir + '/nothing-here.h264');
        } catch (e) {
            err = e;
        }

        expect(err).toBeInstanceOf(ConverterError);

        expect(err.info.converterClass).toEqual(H264ToMp4Converter);
        expect(err.info.fileName).toEqual('nothing-here.h264');
        expect(err.info.originalErr).toBeInstanceOf(Error);
    });
});