import { IUsersRepository } from "@/modules/account/repositories/models";

import { BadRequestError, noContent } from "../../helpers";
import { HttpRequest, HttpResponse, IMiddleware } from "../../protocols";

export class EnsureAdmin implements IMiddleware {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { userId } = httpRequest;
        const user = await this.usersRepository.findById(userId);

        if (!user.isAdmin) {
            throw new BadRequestError("User isn't admin!");
        }

        return noContent();
    }
}
