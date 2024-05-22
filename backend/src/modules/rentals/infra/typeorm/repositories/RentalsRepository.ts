import { Repository, getRepository } from "typeorm";

import { ICreateRentalDTO } from "@/modules/rentals/dtos";
import { IRentalsRepository } from "@/modules/rentals/repositories/models";

import { Rental } from "../entities";

export class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    findByUser(user_id: string): Promise<Rental[]> {
        return this.repository.find({
            where: { user_id },
            relations: ["car"],
        });
    }

    findById(id: string): Promise<Rental> {
        return this.repository.findOne({ id });
    }

    findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.repository.findOne({
            car_id,
            end_date: null,
        });
    }
    findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.repository.findOne({
            user_id,
            end_date: null,
        });
    }
    create(params: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create(params);

        return this.repository.save(rental);
    }
}
