import { ICreateUserTokenDTO } from "../../dtos";
import { UserTokens } from "../../infra/typeorm/entities";
import { IUsersTokensRepository } from "../models";

export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    private usersTokens: UserTokens[] = [];

    async create(data: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = new UserTokens();

        Object.assign(userToken, data);
        this.usersTokens.push(userToken);
        return userToken;
    }
    async deleteById(id: string): Promise<void> {
        this.usersTokens = this.usersTokens.filter(
            (userToken) => userToken.id !== id
        );
    }
    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        return this.usersTokens.find(
            (userToken) =>
                userToken.user_id === user_id &&
                userToken.refresh_token === refresh_token
        );
    }
    async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
        return this.usersTokens.find(
            (userToken) => userToken.refresh_token === refresh_token
        );
    }
}
