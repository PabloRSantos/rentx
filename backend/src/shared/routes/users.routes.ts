import { Router } from "express";

import { UploadConfig } from "@/config";
import {
    makeCreateUserController,
    makeGetUserProfileController,
    makeUpdateUserAvatarController,
} from "@/modules/account/useCases";

import { adaptMiddleware, adaptRoute } from "../adapters";
import { makeEnsureAuthenticatedMiddleware } from "../middlewares";

const usersRouter = Router();
const uploadAvatar = UploadConfig.upload();

usersRouter.post("/", adaptRoute(makeCreateUserController()));
usersRouter.get(
    "/profile",
    adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
    adaptRoute(makeGetUserProfileController())
);
usersRouter.patch(
    "/avatar",
    adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
    uploadAvatar.single("avatar"),
    adaptRoute(makeUpdateUserAvatarController())
);

export { usersRouter };
