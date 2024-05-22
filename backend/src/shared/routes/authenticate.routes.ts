import { Router } from "express";

import {
    makeAuthenticateUserController,
    makeRefreshTokenController,
} from "@/modules/account/useCases";

import { adaptRoute } from "../adapters";

const authenticateRouter = Router();

authenticateRouter.post(
    "/sessions",
    adaptRoute(makeAuthenticateUserController())
);
authenticateRouter.post(
    "/refresh-token",
    adaptRoute(makeRefreshTokenController())
);

export { authenticateRouter };
