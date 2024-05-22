import { CarImagesRepository } from "../../infra/typeorm/repositories/CarImagesRepository";
import { ICarImagesRepository } from "../models";

export const makeCarImagesRepository = (): ICarImagesRepository => {
    return new CarImagesRepository();
};
