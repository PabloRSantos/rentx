import { makeCarRepository } from "@/modules/cars/repositories/factories";
import { IController } from "@/shared/protocols";

import { CreateCarController } from "./CreateCarController";
import { CreateCarUseCase } from "./CreateCarUseCase";

export const makeCreateCarController = (): IController => {
    const createCarUseCase = new CreateCarUseCase(makeCarRepository());
    const createCarController = new CreateCarController(createCarUseCase);

    return createCarController;
};
