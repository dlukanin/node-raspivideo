export class ConverterError extends Error {
    public readonly info: {converterClass: Function, fileName: string, originalErr: Error};

    constructor(converterClass: Function, fileName: string, originalErr: Error) {
        super(converterClass.name + ' ' + fileName + ' error: ' + originalErr.message);

        this.info = {
            converterClass,
            fileName,
            originalErr
        };
    }
}