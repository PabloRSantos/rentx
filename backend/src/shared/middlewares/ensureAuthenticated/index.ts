import { makeJwtDecrypter } from "@/modules/account/infra/encrypter/factories";
import { makeUsersRepository } from "@/modules/account/repositories/factories";
import { IMiddleware } from "@/shared/protocols";

import { EnsureAuthenticated } from "./ensureAuthenticatedMiddleware";

export const makeEnsureAuthenticatedMiddleware = (): IMiddleware => {
    const ensureAuthenticatedMiddleware = new EnsureAuthenticated(
        makeJwtDecrypter(),
        makeUsersRepository()
    );

    return ensureAuthenticatedMiddleware;
};
