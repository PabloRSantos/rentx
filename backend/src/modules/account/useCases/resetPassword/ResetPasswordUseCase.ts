import { BadRequestError, NotFoundError } from "@/shared/helpers";
import { IDateAdapter } from "@/shared/infra/date/models";

import { IHasher } from "../../infra/hasher/models";
import { IUsersRepository, IUsersTokensRepository } from "../../repositories";

interface IRequest {
    token: string;
    password: string;
}

export class ResetPasswordUseCase {
    constructor(
        private readonly usersTokensRepository: IUsersTokensRepository,
        private readonly usersRepository: IUsersRepository,
        private readonly dateAdapter: IDateAdapter,
        private readonly hasher: IHasher
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(
            token
        );

        if (!userToken) {
            throw new NotFoundError("Token invalid!");
        }

        const verifyTokenExpires = this.dateAdapter.compareIfBefore(
            userToken.expires_date,
            this.dateAdapter.dateNow()
        );
        if (verifyTokenExpires) {
            throw new BadRequestError("Token expired!");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new NotFoundError("User not found!");
        }

        user.password = await this.hasher.hash(password, 8);

        await this.usersRepository.create(user);
        await this.usersTokensRepository.deleteById(userToken.id);
    }
}
