import {Watcher} from '../src/watcher/watcher';
import {rmrf} from './helpers/rimraf';
import {RaspividExecutor} from '../src/executor/raspivid-executor';
import * as childProcess from 'child_process';
import { EventEmitter } from 'events';

const filesDir = './files';

describe('Executor', () => {
    let ex;
    let spawnSpy;

    beforeEach(async () => {
        ex = new RaspividExecutor();

        spawnSpy = spyOn(childProcess, 'spawn')
            .and.callFake((command, args) => {
                const fake: any = new EventEmitter();

                fake.stderr = new EventEmitter();

                setTimeout(() => {
                    fake.emit('exit');
                }, 0);

                return fake;
            });
    });

    afterEach(async () => {
        await rmrf(filesDir);
    });

    it('should spawn proc', (done) => {
        const args = ['test', '1'];

        ex.exec(args).then(() => {
            const recentArgs = spawnSpy.calls.mostRecent().args;

            expect(recentArgs[0]).toBe('raspivid');
            expect(recentArgs[1]).toStrictEqual(args);

            done();
        });
    });
});