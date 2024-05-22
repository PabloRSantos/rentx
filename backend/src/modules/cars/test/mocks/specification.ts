import { ICreateSpecificationDTO } from "@/modules/cars/dtos";

export const makeSpecification = (): ICreateSpecificationDTO => ({
    description: "test",
    name: "test",
});
