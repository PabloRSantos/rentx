import { SpecificationRepository } from "../../infra/typeorm/repositories";
import { ISpecificationRepository } from "../models";

export const makeSpecificationsRepository = (): ISpecificationRepository => {
    return new SpecificationRepository();
};
