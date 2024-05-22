import { makeDayJsAdapter } from "@/shared/infra/date/factories";
import { IController } from "@/shared/protocols";

import {
    makeJwtDecrypter,
    makeJwtEncrypter,
} from "../../infra/encrypter/factories";
import { makeUsersTokensRepository } from "../../repositories/factories";
import { RefreshTokenController } from "./RefreshTokenController";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export const makeRefreshTokenController = (): IController => {
    const refreshTokenUseCase = new RefreshTokenUseCase(
        makeJwtDecrypter(),
        makeUsersTokensRepository(),
        makeJwtEncrypter(),
        makeDayJsAdapter()
    );

    const refreshTokenController = new RefreshTokenController(
        refreshTokenUseCase
    );

    return refreshTokenController;
};
