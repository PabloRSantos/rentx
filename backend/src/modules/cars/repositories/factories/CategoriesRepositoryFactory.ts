import { CategoriesRepository } from "../../infra/typeorm/repositories";
import { ICategoriesRepository } from "../models";

export const makeCategoriesRepository = (): ICategoriesRepository => {
    return new CategoriesRepository();
};
