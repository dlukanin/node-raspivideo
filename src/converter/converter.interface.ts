export interface IConverter {
    readonly convertedFilePostfix: string;
    readonly ex: string;

    convert(filePath: string): Promise<void>;
}
