import { ok } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

export class SendForgotPasswordMailController implements IController {
    constructor(
        private readonly sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
    ) {}
    async handle(params: HttpRequest): Promise<HttpResponse> {
        const { email } = params.body;

        const response = await this.sendForgotPasswordMailUseCase.execute({
            email,
        });

        return ok(response);
    }
}
