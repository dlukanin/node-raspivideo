import * as ffmpeg from 'fluent-ffmpeg';
import * as path from 'path';
import * as fs from 'fs';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { ConverterError } from './error/converter.error';
import { IConverter } from './converter.interface';

export class H264ToMp4Converter implements IConverter {
    public readonly convertedFilePostfix: string = '_converted';

    public readonly ex: string = '.mp4';

    constructor() {
        const ffmpegPath = ffmpegInstaller.path;
        ffmpeg.setFfmpegPath(ffmpegPath);
    }

    public async convert(filePath: string): Promise<void> {
        const fileName = path.basename(filePath);
        const dirName = path.dirname(filePath);

        const fullPath = `${dirName}/${fileName.replace('.h264', this.convertedFilePostfix + this.ex)}`;

        try {
            await fs.promises.unlink(fullPath);
        } catch {
            // do nothing
        }

        const command = ffmpeg(filePath).format('mp4');

        command.save(fullPath);

        return new Promise((resolve, reject) => {
            command.on('end', () => {
                resolve();
            });

            command.on('error', (err) => {
                reject(new ConverterError(H264ToMp4Converter, fileName, err));
            });
        });
    }
}
