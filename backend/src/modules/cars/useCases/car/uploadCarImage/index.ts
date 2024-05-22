import { makeCarImagesRepository } from "@/modules/cars/repositories/factories";
import { makeDiskStorageAdapter } from "@/shared/infra/storage/factories";
import { IController } from "@/shared/protocols";

import { UploadCarImageController } from "./UploadCarImageController";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

export const makeUploadCarImageController = (): IController => {
    const uploadCarImageUseCase = new UploadCarImageUseCase(
        makeCarImagesRepository(),
        makeDiskStorageAdapter()
    );
    const uploadCarImageController = new UploadCarImageController(
        uploadCarImageUseCase
    );

    return uploadCarImageController;
};
