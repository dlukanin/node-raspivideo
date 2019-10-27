import {IWatcher, IWatcherOptions} from './watcher.interface';
import * as path from "path";
import * as fs from "fs";
import {FSWatcher} from "fs";

export class Watcher implements IWatcher {
    public static readonly ENOENT: string = 'ENOENT';
    public static readonly EEXISTS: string = 'EEXISTS';
    public static readonly EVENT_RENAME: string = 'rename';
    public static readonly EVENT_CHANGE: string = 'rename';

    public readonly options: IWatcherOptions;

    private readonly _defaultOptions: IWatcherOptions = {};

    private _watcher: FSWatcher;

    constructor(options?: IWatcherOptions) {
        this.options = options || this._defaultOptions;
    }

    public async watchAndGetFile(filePath: string): Promise<Buffer> {
        const dirName = path.dirname(filePath);
        const fileName = path.basename(filePath);

        await this._makeDir(dirName);

        await new Promise((resolve, reject) => {
            this._watcher = fs.watch(dirName, async (eventType: string, changedFileName: string) => {
                if ((
                        eventType === Watcher.EVENT_RENAME ||
                        eventType === Watcher.EVENT_CHANGE
                    )
                    &&
                    fileName === changedFileName
                ) {
                    this._watcher.close();

                    resolve();

                    // TODO timeout
                }
            });
        });

        return await fs.promises.readFile(filePath);
    }

    private async _makeDir(dirName: string): Promise<void> {
        try {
            await fs.promises.mkdir(dirName, {recursive: true});
        } catch (err) {
            if (err.code !== Watcher.EEXISTS) {
                throw err;
            }
        }
    }
}