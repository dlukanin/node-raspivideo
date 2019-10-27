import {Watcher} from '../src/watcher/watcher';
import {rmrf} from './helpers/rimraf';
import * as fs from 'fs';
import {setTimeoutAsync} from './helpers/timeout';

const filesDir = './files';

describe('Watcher', () => {
    beforeEach(async () => {
        await rmrf(filesDir);
    });

    afterEach(async () => {
        await rmrf(filesDir);
    });

    it('should create dir if not exists', async () => {
        const watcher = new Watcher();
        const filePath = filesDir + '/test.h264';

        // NOTE in this case we do not need to handle promise result
        watcher.watchAndGetFile(filePath);

        await setTimeoutAsync(100);

        await fs.promises.access(filesDir);
    });

    it('should create dir if not exists (recursive)', async () => {
        const watcher = new Watcher();
        const recFilesDir = filesDir + '/rec';
        const filePath = recFilesDir + '/test.h264';

        // NOTE in this case we do not need to handle promise result
        watcher.watchAndGetFile(filePath);

        await setTimeoutAsync(100);

        await fs.promises.access(recFilesDir);
    });
});