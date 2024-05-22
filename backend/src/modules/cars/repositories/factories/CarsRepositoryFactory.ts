import { CarsRepository } from "../../infra/typeorm/repositories";
import { ICarsRepository } from "../models";

export const makeCarRepository = (): ICarsRepository => {
    return new CarsRepository();
};
