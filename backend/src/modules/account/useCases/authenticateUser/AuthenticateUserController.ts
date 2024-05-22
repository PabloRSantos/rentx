import { ok } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController implements IController {
    constructor(
        private readonly authenticateUserUseCase: AuthenticateUserUseCase
    ) {}
    async handle(params: HttpRequest): Promise<HttpResponse> {
        const { email, password } = params.body;

        const response = await this.authenticateUserUseCase.execute({
            email,
            password,
        });

        return ok(response);
    }
}
