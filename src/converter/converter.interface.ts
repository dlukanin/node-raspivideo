export interface IConverter {
    convert(filePath: string): Promise<void>;
}