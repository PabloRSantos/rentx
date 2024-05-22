import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import path from "path";

import { UploadConfig } from "@/config";

import { IStorage } from "../models";

export class S3StorageAdapter implements IStorage {
    private client: S3;
    constructor() {
        this.client = new S3({
            region: process.env.AWS_REGION,
        });
    }

    async deleteFile(filename: string, folder: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: filename,
            })
            .promise();
    }
    async saveFile(filename: string, folder: string): Promise<string> {
        const originalName = path.resolve(UploadConfig.tempFolder, filename);
        const fileContent = await fs.promises.readFile(originalName);
        const contentType = mime.getType(originalName);

        await this.client
            .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: filename,
                ACL: "public-read",
                Body: fileContent,
                ContentType: contentType,
            })
            .promise();

        await fs.promises.unlink(originalName);

        return filename;
    }
}
