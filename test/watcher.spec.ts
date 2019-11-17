import {Watcher} from '../src/watcher/watcher';
import {rmrf} from './helpers/rimraf';
import * as fs from 'fs';
import {WatcherTimeoutError} from '../src/watcher/error/watcher-timeout.error';

const filesDir = './files';

describe('Watcher', () => {
    let watcher: Watcher;

    beforeEach(async () => {
        await rmrf(filesDir);
        watcher = new Watcher();
    });

    afterEach(async () => {
        await rmrf(filesDir);
    });

    it('should create dir if not exists', async () => {
        const filePath = filesDir + '/test1.h264';

        watcher.watch(filePath, 1000).catch(() => {
            // do nothing
        });

        await fs.promises.access(filesDir);
    });

    it('should create dir if not exists (recursive)', async () => {
        const recFilesDir = filesDir + '/rec';
        const filePath = recFilesDir + '/test2.h264';

        // NOTE in this case we do not need to handle promise result
        watcher.watch(filePath, 1000).catch(() => {
            // do nothing
        });

        await fs.promises.access(recFilesDir);
    });

    it('should watch and resolve', (done) => {
        const filePath = filesDir + '/test3.h264';

        watcher.watch(filePath, 1000)
            .then(() => {
                done();
            })
            .catch((err) => {
                done(err);
            });

        fs.writeFileSync(filePath, 'test');
    });

    it('should throw err after timeout', (done) => {
        const filePath = filesDir + '/test4.h264';

        watcher.watch(filePath, 100)
            .then(() => {
                done('test failed - error is not thrown');
            })
            .catch((err) => {
                expect(err).toBeInstanceOf(WatcherTimeoutError);
                expect(err.message).toBe('Timeout watching for ' + filePath + ' for ' + 100 + 'ms');

                done();
            });
    });
});