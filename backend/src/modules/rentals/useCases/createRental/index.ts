import { makeCarRepository } from "@/modules/cars/repositories/factories";
import { makeDayJsAdapter } from "@/shared/infra/date/factories";
import { IController } from "@/shared/protocols";

import { makeRentalsRepository } from "../../repositories/factories";
import { CreateRentalController } from "./CreateRentalController";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

export const makeCreateRentalController = (): IController => {
    const createRentalUseCase = new CreateRentalUseCase(
        makeRentalsRepository(),
        makeDayJsAdapter(),
        makeCarRepository()
    );
    const createRentalController = new CreateRentalController(
        createRentalUseCase
    );

    return createRentalController;
};
