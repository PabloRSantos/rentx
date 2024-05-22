import { Router } from "express";

import {
    makeCreateRentalController,
    makeDevolutionRentalController,
    makeListRentalsByUserController,
} from "@/modules/rentals/useCases";

import { adaptMiddleware, adaptRoute } from "../adapters";
import { makeEnsureAuthenticatedMiddleware } from "../middlewares";

const rentalsRouter = Router();

rentalsRouter.post(
    "/",
    adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
    adaptRoute(makeCreateRentalController())
);

rentalsRouter.post(
    "/devolution/:id",
    adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
    adaptRoute(makeDevolutionRentalController())
);

rentalsRouter.get(
    "/user",
    adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
    adaptRoute(makeListRentalsByUserController())
);

export { rentalsRouter };
