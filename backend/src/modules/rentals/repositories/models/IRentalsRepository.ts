import { ICreateRentalDTO } from "../../dtos";
import { Rental } from "../../infra/typeorm/entities";

export interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    create(params: ICreateRentalDTO): Promise<Rental>;
    findById(id: string): Promise<Rental | undefined>;
    findByUser(user_id: string): Promise<Rental[]>;
}
