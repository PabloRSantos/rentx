import { UsersTokensRepository } from "../../infra/typeorm/repositories";
import { IUsersTokensRepository } from "../models";

export const makeUsersTokensRepository = (): IUsersTokensRepository => {
    return new UsersTokensRepository();
};
