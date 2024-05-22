import { noContent } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

export class ResetPasswordController implements IController {
    constructor(private readonly resetPasswordUseCase: ResetPasswordUseCase) {}
    async handle(params: HttpRequest): Promise<HttpResponse> {
        const { token } = params.query;
        const { password } = params.body;

        await this.resetPasswordUseCase.execute({
            token,
            password,
        });

        return noContent();
    }
}
