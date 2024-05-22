import { ICarsRepository } from "..";

import { ICreateCarDTO, IListAvailableCarsDTO } from "../../dtos";
import { Car } from "../../infra/typeorm/entities";

export class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async updateAvailable(id: string, available: boolean): Promise<void> {
        const carIndex = this.cars.findIndex((car) => car.id === id);

        this.cars[carIndex].available = available;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id);
    }

    async findAvailable(params: IListAvailableCarsDTO): Promise<Car[]> {
        return this.cars.filter((car) => {
            const brandCondition = params.brand && car.brand === params.brand;
            const categoryCondition =
                params.category_id && car.category_id === params.category_id;
            const nameCondition = params.name && car.name === params.name;

            if (
                car.available ||
                (brandCondition && categoryCondition && nameCondition)
            )
                return true;

            return false;
        });
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, data);

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate);
    }
}
