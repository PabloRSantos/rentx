import { ICreateCarDTO } from "@/modules/cars/dtos";
import { Car } from "@/modules/cars/infra/typeorm/entities";
import { ICarsRepository } from "@/modules/cars/repositories";
import { BadRequestError } from "@/shared/helpers";

export class CreateCarUseCase {
    constructor(private readonly carsRepository: ICarsRepository) {}

    async execute(data: ICreateCarDTO): Promise<Car> {
        const carAlreadyExist = await this.carsRepository.findByLicensePlate(
            data.license_plate
        );

        if (carAlreadyExist) {
            throw new BadRequestError("Car already exists!");
        }

        const newCar = await this.carsRepository.create(data);
        return newCar;
    }
}
