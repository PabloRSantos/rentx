import { ok } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController implements IController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    async handle({ body }: HttpRequest): Promise<HttpResponse> {
        const { name, email, password, driver_license } = body;

        const user = await this.createUserUseCase.execute({
            name,
            email,
            password,
            driver_license,
        });

        return ok(user);
    }
}
