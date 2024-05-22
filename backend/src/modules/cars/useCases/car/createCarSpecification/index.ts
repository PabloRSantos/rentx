import {
    makeCarRepository,
    makeSpecificationsRepository,
} from "@/modules/cars/repositories/factories";
import { IController } from "@/shared/protocols";

import { CreateCarSpecificationController } from "./CreateCarSpecificationController";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

export const makeCreateCarSpecificationController = (): IController => {
    const createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
        makeCarRepository(),
        makeSpecificationsRepository()
    );
    const createCarSpecificationController =
        new CreateCarSpecificationController(createCarSpecificationUseCase);

    return createCarSpecificationController;
};
