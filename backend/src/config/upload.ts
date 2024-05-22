import multer, { Multer } from "multer";
import { resolve } from "path";

export class UploadConfig {
    static tempFolder = resolve(__dirname, "..", "..", "tmp");

    static upload(): Multer {
        return multer({
            storage: multer.diskStorage({
                destination: resolve(UploadConfig.tempFolder),
                filename: (_, file, callback) => {
                    const fileName = `${new Date().getTime()}-${
                        file.originalname
                    }`;

                    return callback(null, fileName);
                },
            }),
        });
    }
}
