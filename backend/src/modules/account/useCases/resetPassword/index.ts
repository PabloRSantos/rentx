import { makeDayJsAdapter } from "@/shared/infra/date/factories";
import { IController } from "@/shared/protocols";

import { makeBcryptHasher } from "../../infra/hasher/factories";
import {
    makeUsersRepository,
    makeUsersTokensRepository,
} from "../../repositories/factories";
import { ResetPasswordController } from "./ResetPasswordController";
import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

export const makeResetPasswordController = (): IController => {
    const resetPasswordUseCase = new ResetPasswordUseCase(
        makeUsersTokensRepository(),
        makeUsersRepository(),
        makeDayJsAdapter(),
        makeBcryptHasher()
    );

    const resetPasswordController = new ResetPasswordController(
        resetPasswordUseCase
    );

    return resetPasswordController;
};
