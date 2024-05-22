import { DiskStorageAdapter } from "../implementations";
import { IStorage } from "../models";

export const makeDiskStorageAdapter = (): IStorage => {
    return new DiskStorageAdapter();
};
