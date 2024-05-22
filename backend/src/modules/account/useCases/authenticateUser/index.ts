import { makeDayJsAdapter } from "@/shared/infra/date/factories";
import { IController } from "@/shared/protocols";

import { makeJwtEncrypter } from "../../infra/encrypter/factories";
import { BcryptAdapter } from "../../infra/hasher/implementations";
import {
    makeUsersRepository,
    makeUsersTokensRepository,
} from "../../repositories/factories";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export const makeAuthenticateUserController = (): IController => {
    const hasherCompare = new BcryptAdapter();
    const authenticateUserUseCase = new AuthenticateUserUseCase(
        hasherCompare,
        makeJwtEncrypter(),
        makeUsersRepository(),
        makeUsersTokensRepository(),
        makeDayJsAdapter()
    );

    const authenticateUserController = new AuthenticateUserController(
        authenticateUserUseCase
    );

    return authenticateUserController;
};
