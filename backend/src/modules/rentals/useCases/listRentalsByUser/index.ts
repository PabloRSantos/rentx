import { IController } from "@/shared/protocols";

import { makeRentalsRepository } from "../../repositories/factories";
import { ListRentalsByUserController } from "./ListRentalsByUserController";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

export const makeListRentalsByUserController = (): IController => {
    const listRentalsByUserUseCase = new ListRentalsByUserUseCase(
        makeRentalsRepository()
    );
    const listRentalsByUserController = new ListRentalsByUserController(
        listRentalsByUserUseCase
    );

    return listRentalsByUserController;
};
