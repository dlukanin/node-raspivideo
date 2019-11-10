export class ConverterError extends Error {
    public readonly info: {converterClass: Function, fileName: string, originalErr: Error};

    constructor(converterClass, fileName, originalErr) {
        super(converterClass + ' ' + fileName + ' error: ' + originalErr.message);

        this.info = {
            converterClass,
            fileName,
            originalErr
        };
    }
}