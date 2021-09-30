import { IConverter } from '../converter.interface';

export class ConverterError extends Error {
    public readonly info: { converterClass: { new (): IConverter }; fileName: string; originalErr: Error };

    constructor(converterClass: { new (): IConverter }, fileName: string, originalErr: Error) {
        super(`${converterClass.name} ${fileName} error: ${originalErr.message}`);

        this.info = {
            converterClass,
            fileName,
            originalErr,
        };
    }
}
