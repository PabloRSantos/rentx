import { ICarImagesRepository } from "@/modules/cars/repositories";
import { IStorage } from "@/shared/infra/storage/models";

interface IRequest {
    car_id: string;
    images_name: string[];
}

export class UploadCarImageUseCase {
    constructor(
        private readonly carImagesRepository: ICarImagesRepository,
        private readonly storage: IStorage
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.storage.saveFile(image, "cars");
            await this.carImagesRepository.create(car_id, image);
        });
    }
}
