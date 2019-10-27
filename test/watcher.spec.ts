import {Watcher} from '../src/watcher/watcher';
import {rmrf} from './helpers/rimraf';
import * as fs from 'fs';

const filesDir = './files';

describe('Watcher', () => {
    let watcher;

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
        watcher.watchAndGetFile(filePath);

        await fs.promises.access(filesDir);
    });

    it('should create dir if not exists (recursive)', async () => {
        const recFilesDir = filesDir + '/rec';
        const filePath = recFilesDir + '/test.h264';

        // NOTE in this case we do not need to handle promise result
        watcher.watchAndGetFile(filePath);

        await fs.promises.access(recFilesDir);
    });

    it('should watch and return file', async (done) => {
        const filePath = filesDir + '/test.h264';

        watcher.watchAndGetFile(filePath)
            .then((buf) => {
                expect(buf).toBeInstanceOf(Buffer);
                done();
            })
            .catch((err) => {
                done(err);
            });

        fs.writeFileSync(filePath, 'test');
    })
});