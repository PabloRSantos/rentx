import { makeCarRepository } from "@/modules/cars/repositories/factories";
import { IController } from "@/shared/protocols";

import { ListAvailableCarsController } from "./ListAvailableCarsController";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

export const makeListAvailableCarsController = (): IController => {
    const listAvailableCarsUseCase = new ListAvailableCarsUseCase(
        makeCarRepository()
    );
    const listAvailableCarsController = new ListAvailableCarsController(
        listAvailableCarsUseCase
    );

    return listAvailableCarsController;
};
