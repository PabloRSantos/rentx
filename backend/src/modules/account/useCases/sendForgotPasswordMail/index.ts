import { makeDayJsAdapter } from "@/shared/infra/date/factories";
import { makeEtheralAdapter } from "@/shared/infra/mail/factories";
import { IController } from "@/shared/protocols";

import {
    makeUsersRepository,
    makeUsersTokensRepository,
} from "../../repositories/factories";
import { SendForgotPasswordMailController } from "./SendForgotPasswordMailController";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

export const makeSendForgotPasswordController = (): IController => {
    const sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
        makeUsersRepository(),
        makeUsersTokensRepository(),
        makeDayJsAdapter(),
        makeEtheralAdapter()
    );
    const sendForgotPasswordMailController =
        new SendForgotPasswordMailController(sendForgotPasswordMailUseCase);

    return sendForgotPasswordMailController;
};
