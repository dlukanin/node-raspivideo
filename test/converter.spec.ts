import {Watcher} from '../src/watcher/watcher';
import {rmrf} from './helpers/rimraf';
import * as fs from 'fs';

const filesDir = './converter-files';

describe('Converter', () => {
    let watcher;

    beforeEach(async () => {
        await rmrf(filesDir);
        watcher = new Watcher();
    });

    afterEach(async () => {
        await rmrf(filesDir);
    });

    it('temp', () => {});
});