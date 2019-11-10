import {IConverter} from './converter.interface';
import * as ffmpeg from 'fluent-ffmpeg';
import * as path from "path";

export class H264ToMp4Converter implements IConverter {
    public readonly convertedFilePostfix: string = '_converted';
    public readonly ex: string = '.mp4';

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
                reject(err);
            })
        })
    }
}