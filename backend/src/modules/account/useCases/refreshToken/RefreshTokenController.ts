import { ok } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController implements IController {
    constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {}
    async handle(params: HttpRequest): Promise<HttpResponse> {
        const { token } = params.body;

        const response = await this.refreshTokenUseCase.execute({
            token,
        });

        return ok(response);
    }
}
