import { IListAvailableCarsDTO } from "../../../dtos";
import { Car } from "../../../infra/typeorm/entities";
import { ICarsRepository } from "../../../repositories";

export class ListAvailableCarsUseCase {
    constructor(private readonly carsRepository: ICarsRepository) {}

    async execute({
        category_id,
        brand,
        name,
    }: IListAvailableCarsDTO): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable({
            category_id,
            brand,
            name,
        });

        return cars;
    }
}
