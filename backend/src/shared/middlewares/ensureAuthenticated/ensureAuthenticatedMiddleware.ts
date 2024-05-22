import { IDecrypter } from "@/modules/account/infra/encrypter/models";
import { IUsersRepository } from "@/modules/account/repositories/models";

import { BadRequestError, NotFoundError, ok } from "../../helpers";
import { HttpRequest, HttpResponse, IMiddleware } from "../../protocols";

export class EnsureAuthenticated implements IMiddleware {
    constructor(
        private readonly decrypter: IDecrypter,
        private readonly usersRepository: IUsersRepository
    ) {}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const authHeader = httpRequest.headers.authorization;

        if (!authHeader) {
            throw new BadRequestError("Token is missing");
        }

        const [, token] = authHeader.split(" ");

        let userId = "";
        try {
            const { sub } = this.decrypter.decrypt(token);
            userId = sub as string;
        } catch (error) {
            throw new BadRequestError("Invalid token");
        }

        const userExist = await this.usersRepository.findById(userId as string);

        if (!userExist) {
            throw new NotFoundError("User not found");
        }

        return ok({ userId });
    }
}
