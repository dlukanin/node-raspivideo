import {IConverter} from './converter.interface';
import * as ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';
import {ConverterError} from './error/converter.error';
import * as fs from 'fs';

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

        const fullPath = dirName + '/' + fileName.replace('.h264', this.convertedFilePostfix + this.ex);

        try {
            await fs.promises.unlink(fullPath);
        } catch {
            // do nothing
        }

        const command = ffmpeg(filePath)
            .format('mp4');

        command.save(fullPath);

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