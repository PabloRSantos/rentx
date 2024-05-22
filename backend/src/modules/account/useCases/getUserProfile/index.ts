import { IController } from "@/shared/protocols";

import { makeUsersRepository } from "../../repositories/factories";
import { GetUserProfileController } from "./GetUserProfileController";
import { GetUserProfileUseCase } from "./GetUserProfileUseCase";

export const makeGetUserProfileController = (): IController => {
    const getUserProfileUseCase = new GetUserProfileUseCase(
        makeUsersRepository()
    );
    const getUserProfileController = new GetUserProfileController(
        getUserProfileUseCase
    );

    return getUserProfileController;
};
