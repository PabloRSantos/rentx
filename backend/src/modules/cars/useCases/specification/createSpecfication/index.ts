import { makeSpecificationsRepository } from "@/modules/cars/repositories/factories";
import { IController } from "@/shared/protocols";

import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export const makeCreateSpecificationController = (): IController => {
    const createSpecificationUseCase = new CreateSpecificationUseCase(
        makeSpecificationsRepository()
    );
    const createSpecificationController = new CreateSpecificationController(
        createSpecificationUseCase
    );

    return createSpecificationController;
};
