import { UsersRepository } from "../../infra/typeorm/repositories";
import { IUsersRepository } from "../models";

export const makeUsersRepository = (): IUsersRepository => {
    return new UsersRepository();
};
