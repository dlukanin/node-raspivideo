import {IConverter} from './converter.interface';
import * as ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';
import {ConverterError} from './error/converter.error';

export class H264ToMp4Converter implements IConverter {
    public readonly convertedFilePostfix: string = '_converted';
    public readonly ex: string = '.mp4';

    constructor() {
        const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
        ffmpeg.setFfmpegPath(ffmpegPath);
    }

    public async convert(filePath: string): Promise<void> {
        const fileName = path.basename(filePath);
        const dirName = path.dirname(filePath);

        const command = ffmpeg(filePath)
            .format('mp4');

        command.save(dirName + '/' + fileName.replace('.h264', this.convertedFilePostfix + this.ex));

        return new Promise((resolve, reject) => {
            command.on('end', () => {
                resolve();
            });

            command.on('error', (err) => {
                reject(new ConverterError(
                    this.constructor,
                    fileName,
                    err
                ));
            });
        });
    }
}