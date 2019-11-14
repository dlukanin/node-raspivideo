import {Watcher} from '../src/watcher/watcher';
import {rmrf} from './helpers/rimraf';
import * as fs from 'fs';

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
        const filePath = filesDir + '/test.h264';

        // NOTE in this case we do not need to handle promise result
        watcher.watch(filePath);

        await fs.promises.access(filesDir);
    });

    it('should create dir if not exists (recursive)', async () => {
        const recFilesDir = filesDir + '/rec';
        const filePath = recFilesDir + '/test.h264';

        // NOTE in this case we do not need to handle promise result
        watcher.watch(filePath);

        await fs.promises.access(recFilesDir);
    });

    it('should watch and resolve', async (done) => {
        const filePath = filesDir + '/test.h264';

        watcher.watch(filePath)
            .then(() => {
                done();
            })
            .catch((err) => {
                done(err);
            });

        fs.writeFileSync(filePath, 'test');
    })
});