import { Repository, getRepository } from "typeorm";

import { ICreateUserTokenDTO } from "@/modules/account/dtos";
import { IUsersTokensRepository } from "@/modules/account/repositories";

import { UserTokens } from "../entities";

export class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>;

    constructor() {
        this.repository = getRepository(UserTokens);
    }

    findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return this.repository.findOne({ refresh_token });
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete({ id });
    }

    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        return this.repository.findOne({ user_id, refresh_token });
    }

    create(data: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.repository.create(data);
        return this.repository.save(userToken);
    }
}
