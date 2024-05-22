import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO, IListAvailableCarsDTO } from "@/modules/cars/dtos";
import { ICarsRepository } from "@/modules/cars/repositories";

import { Car } from "../entities";

export class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async findById(id: string): Promise<Car> {
        return this.repository.findOne({ id });
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :id", { id })
            .execute();
    }

    async findAvailable({
        brand,
        category_id,
        name,
    }: IListAvailableCarsDTO): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder("car")
            .where("available = :available", { available: true });

        if (brand) {
            carsQuery.andWhere("car.brand = :brand", { brand });
        }

        if (category_id) {
            carsQuery.andWhere("car.category_id = :category_id", {
                category_id,
            });
        }

        if (name) {
            carsQuery.andWhere("car.name = :name", { name });
        }

        return carsQuery.getMany();
    }

    create(data: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create(data);
        return this.repository.save(car);
    }
    findByLicensePlate(license_plate: string): Promise<Car> {
        return this.repository.findOne({ license_plate });
    }
}
