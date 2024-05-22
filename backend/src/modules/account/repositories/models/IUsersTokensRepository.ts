import { ICreateUserTokenDTO } from "../../dtos";
import { UserTokens } from "../../infra/typeorm/entities";

export interface IUsersTokensRepository {
    create(data: ICreateUserTokenDTO): Promise<UserTokens>;
    deleteById(id: string): Promise<void>;
    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens>;
    findByRefreshToken(refresh_token: string): Promise<UserTokens>;
}
