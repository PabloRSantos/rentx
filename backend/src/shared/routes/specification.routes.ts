import { Router } from "express";

import { makeCreateSpecificationController } from "../../modules/cars/useCases";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
    makeEnsureAdminMiddleware,
    makeEnsureAuthenticatedMiddleware,
} from "../middlewares";

const specificationsRouter = Router();

specificationsRouter.post(
    "/",
    adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
    adaptMiddleware(makeEnsureAdminMiddleware()),
    adaptRoute(makeCreateSpecificationController())
);

export { specificationsRouter };
