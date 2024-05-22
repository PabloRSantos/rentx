import { RentalsRepository } from "../../infra/typeorm/repositories";
import { IRentalsRepository } from "../models";

export const makeRentalsRepository = (): IRentalsRepository => {
    return new RentalsRepository();
};
