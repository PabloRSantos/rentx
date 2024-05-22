import { Router } from "express";

import {
    makeResetPasswordController,
    makeSendForgotPasswordController,
} from "@/modules/account/useCases";

import { adaptRoute } from "../adapters";

const passwordRouter = Router();

passwordRouter.post("/forgot", adaptRoute(makeSendForgotPasswordController()));
passwordRouter.post("/reset", adaptRoute(makeResetPasswordController()));

export { passwordRouter };
