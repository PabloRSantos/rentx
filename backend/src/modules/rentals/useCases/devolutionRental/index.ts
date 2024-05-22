import { makeCarRepository } from "@/modules/cars/repositories/factories";
import { makeDayJsAdapter } from "@/shared/infra/date/factories";
import { IController } from "@/shared/protocols";

import { makeRentalsRepository } from "../../repositories/factories";
import { DevolutionRentalController } from "./DevolutionRentalController";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

export const makeDevolutionRentalController = (): IController => {
    const devolutionRentalUseCase = new DevolutionRentalUseCase(
        makeCarRepository(),
        makeRentalsRepository(),
        makeDayJsAdapter()
    );
    const devolutionRentalController = new DevolutionRentalController(
        devolutionRentalUseCase
    );

    return devolutionRentalController;
};
