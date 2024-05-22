import { ICreateCarDTO, IListAvailableCarsDTO } from "../../dtos";
import { Car } from "../../infra/typeorm/entities";

export interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    updateAvailable(id: string, available: boolean): Promise<void>;
    findByLicensePlate(license_plate: string): Promise<Car | undefined>;
    findAvailable(params?: IListAvailableCarsDTO): Promise<Car[]>;
    findById(id: string): Promise<Car | undefined>;
}
