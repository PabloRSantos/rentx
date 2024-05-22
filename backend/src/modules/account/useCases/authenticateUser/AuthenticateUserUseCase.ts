import { authConfig } from "@/config";
import { BadRequestError } from "@/shared/helpers";
import { IDateAdapter } from "@/shared/infra/date/models";

import { IEncrypter } from "../../infra/encrypter/models";
import { IHashCompare } from "../../infra/hasher/models";
import {
    IUsersRepository,
    IUsersTokensRepository,
} from "../../repositories/models";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

export class AuthenticateUserUseCase {
    constructor(
        private readonly hashCompare: IHashCompare,
        private readonly encrypter: IEncrypter,
        private readonly usersRepository: IUsersRepository,
        private readonly usersTokensRepository: IUsersTokensRepository,
        private readonly dateAdapter: IDateAdapter
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new BadRequestError("Email or password incorrect");
        }

        const passwordMatch = await this.hashCompare.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            throw new BadRequestError("Email or password incorrect");
        }

        const token = this.encrypter.encrypt(
            {},
            { subject: user.id, expiresIn: authConfig.expires_in_token }
        );

        const refreshToken = this.encrypter.encrypt(
            { email },
            { subject: user.id, expiresIn: authConfig.expires_in_refresh_token }
        );
        const refreshTokenExpiresDate = this.dateAdapter.addDays(
            this.dateAdapter.dateNow(),
            authConfig.expires_refresh_token_days
        );
        await this.usersTokensRepository.create({
            expires_date: refreshTokenExpiresDate,
            refresh_token: refreshToken,
            user_id: user.id,
        });

        return {
            token,
            refresh_token: refreshToken,
            user: {
                name: user.name,
                email,
            },
        };
    }
}
