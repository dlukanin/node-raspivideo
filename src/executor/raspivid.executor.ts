import { IRaspividExecutor } from './raspivid.executor.interface';
import * as process from 'child_process';

export class RaspividExecutor implements IRaspividExecutor {
    private readonly _command: string = 'raspivid';

    public async exec(args: string[]): Promise<void> {
        let error: Error;
        let errorBuffer: Buffer = Buffer.alloc(0);

        return new Promise((resolve, reject) => {
            const childProcess = process.spawn(this._command, args);

            childProcess.on('error', (err) => {
                error = err;
            });

            childProcess.stderr.on('data', (data) => {
                errorBuffer = Buffer.concat([errorBuffer, data]);
            });

            childProcess.on('exit', () => {
                if (error) {
                    reject(error);
                }

                if (errorBuffer.toString().length) {
                    reject(new Error(errorBuffer.toString()));
                }

                resolve();
            });
        });
    }
}