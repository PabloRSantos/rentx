import fs from "fs";
import path from "path";

import { UploadConfig } from "@/config";

import { IStorage } from "../models";

export class DiskStorageAdapter implements IStorage {
    async saveFile(filename: string, folder: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(UploadConfig.tempFolder, filename),
            path.resolve(UploadConfig.tempFolder, folder, filename)
        );

        return filename;
    }
    async deleteFile(filename: string, folder: string): Promise<void> {
        const file = path.resolve(UploadConfig.tempFolder, folder, filename);
        try {
            await fs.promises.stat(file);
        } catch (error) {
            return;
        }
        await fs.promises.unlink(file);
    }
}
