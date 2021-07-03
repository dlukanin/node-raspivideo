import { IWatcher } from './watcher.interface';
import * as path from 'path';
import * as fs from 'fs';
import { FSWatcher } from 'fs';
import { WatcherTimeoutError } from './error/watcher-timeout.error';

export class Watcher implements IWatcher {
    public static readonly ENOENT: string = 'ENOENT';
    public static readonly EEXISTS: string = 'EEXISTS';
    public static readonly EVENT_RENAME: string = 'rename';
    public static readonly EVENT_CHANGE: string = 'rename';

    private _watcher: FSWatcher;

    public async watch(filePath: string, time: number): Promise<void> {
        const dirName = path.dirname(filePath);
        const fileName = path.basename(filePath);

        this._makeDir(dirName);
        this._unlink(dirName + '/' + fileName);

        await new Promise((resolve, reject) => {
            let timeout;

            this._watcher = fs.watch(dirName, (eventType: string, changedFileName: string) => {
                if ((
                    eventType === Watcher.EVENT_RENAME ||
                        eventType === Watcher.EVENT_CHANGE
                )
                    &&
                    fileName === changedFileName
                ) {
                    this._watcher.close();
                    clearTimeout(timeout);

                    resolve(undefined);
                }
            });

            timeout = setTimeout(() => {
                this._watcher.close();

                reject(new WatcherTimeoutError(filePath, time));
            }, time);
        });
    }

    private _makeDir(dirName: string): void {
        try {
            fs.mkdirSync(dirName, {recursive: true});
        } catch (err) {
            if (err.code !== Watcher.EEXISTS) {
                throw err;
            }
        }
    }
    private _unlink(path: string): void {
        try {
            fs.unlinkSync(path);
        } catch {
            // do nothing
        }
    }
}