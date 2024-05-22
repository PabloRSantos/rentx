import { S3StorageAdapter } from "../implementations";
import { IStorage } from "../models";

export const makeS3StorageAdapter = (): IStorage => {
    return new S3StorageAdapter();
};
