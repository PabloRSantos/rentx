import { IController } from "@/shared/protocols";

import { makeBcryptHasher } from "../../infra/hasher/factories";
import { makeUsersRepository } from "../../repositories/factories";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

export const makeCreateUserController = (): IController => {
    const createUserUseCase = new CreateUserUseCase(
        makeUsersRepository(),
        makeBcryptHasher()
    );
    const createUserController = new CreateUserController(createUserUseCase);

    return createUserController;
};
