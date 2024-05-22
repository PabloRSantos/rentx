import { ICreateCarSpecificationDTO } from "@/modules/cars/dtos";
import { Car } from "@/modules/cars/infra/typeorm/entities";
import {
    ICarsRepository,
    ISpecificationRepository,
} from "@/modules/cars/repositories";
import { BadRequestError } from "@/shared/helpers";

export class CreateCarSpecificationUseCase {
    constructor(
        private readonly carsRepository: ICarsRepository,
        private readonly specificationsRepository: ISpecificationRepository
    ) {}

    async execute({
        car_id,
        specifications_id,
    }: ICreateCarSpecificationDTO): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new BadRequestError("Car does not exists!");
        }

        const specifications = await this.specificationsRepository.findByIds(
            specifications_id
        );

        carExists.specifications = specifications;
        return this.carsRepository.create(carExists);
    }
}
