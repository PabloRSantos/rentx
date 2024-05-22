import { noContent } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

export class UploadCarImageController implements IController {
    constructor(
        private readonly uploadCarImageUseCase: UploadCarImageUseCase
    ) {}

    async handle(params: HttpRequest): Promise<HttpResponse> {
        const images = params.files;
        const { id } = params.params;

        const fileNames = images.map((image) => image.filename);
        await this.uploadCarImageUseCase.execute({
            car_id: id,
            images_name: fileNames,
        });

        return noContent();
    }
}
