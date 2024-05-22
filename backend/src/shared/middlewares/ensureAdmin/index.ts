import { UsersRepository } from "@/modules/account/infra/typeorm/repositories";
import { IMiddleware } from "@/shared/protocols";

import { EnsureAdmin } from "./ensureAdminMiddleware";

export const makeEnsureAdminMiddleware = (): IMiddleware => {
    const usersRepository = new UsersRepository();
    const ensureAdminMiddleware = new EnsureAdmin(usersRepository);

    return ensureAdminMiddleware;
};
