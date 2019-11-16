import {Watcher} from '../src/watcher/watcher';
import {rmrf} from './helpers/rimraf';
import {RaspividExecutor} from '../src/executor/raspivid.executor';
import * as childProcess from 'child_process';
import { EventEmitter } from 'events';

const filesDir = './files';

function getFake(): EventEmitter {
    const fake: any = new EventEmitter();

    fake.stderr = new EventEmitter();

    return fake;
}

describe('Executor', () => {
    let ex;

    beforeEach(async () => {
        ex = new RaspividExecutor();
    });

    afterEach(async () => {
        await rmrf(filesDir);
    });

    it('should spawn proc and resolve', (done) => {
        const args = ['test', '1'];

        const spawnSpy = spyOn(childProcess, 'spawn')
            .and.callFake((command, args) => {
                const fake = getFake();

                setTimeout(() => {
                    fake.emit('exit');
                }, 0);

                return fake;
            });

        ex.exec(args).then(() => {
            const recentArgs = spawnSpy.calls.mostRecent().args;

            expect(recentArgs[0]).toBe('raspivid');
            expect(recentArgs[1]).toStrictEqual(args);

            done();
        });
    });

    it('should spawn proc and reject', (done) => {
        spyOn(childProcess, 'spawn')
            .and.callFake((command, args) => {
                const fake: any = getFake();

                setTimeout(() => {
                    fake.emit('error', {});
                    fake.emit('exit');
                }, 0);

                return fake;
            });

        ex.exec([]).catch(() => {
            done();
        });
    });

    it('should spawn proc and reject (proc stderr)', (done) => {
        spyOn(childProcess, 'spawn')
            .and.callFake((command, args) => {
                const fake: any = getFake();

                setTimeout(() => {
                    fake.stderr.emit('data', Buffer.alloc(1));
                    fake.emit('exit');
                }, 0);

                return fake;
            });

        ex.exec([]).catch(() => {
            done();
        });
    });
});