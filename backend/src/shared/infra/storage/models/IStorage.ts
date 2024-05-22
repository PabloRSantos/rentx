export interface IStorage {
    deleteFile(filename: string, folder: string): Promise<void>;
    saveFile(filename: string, folder: string): Promise<string>;
}
