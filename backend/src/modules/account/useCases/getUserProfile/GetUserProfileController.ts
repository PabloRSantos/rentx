import { ok } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { UserMap } from "../../mapper";
import { GetUserProfileUseCase } from "./GetUserProfileUseCase";

export class GetUserProfileController implements IController {
    constructor(
        private readonly getUserProfileUseCase: GetUserProfileUseCase
    ) {}

    async handle({ userId }: HttpRequest): Promise<HttpResponse> {
        const user = await this.getUserProfileUseCase.execute({ userId });
        const userFormatted = UserMap.toDTO(user);

        return ok(userFormatted);
    }
}
