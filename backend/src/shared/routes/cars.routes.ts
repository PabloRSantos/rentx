import { Router } from "express";

import { UploadConfig } from "@/config";
import {
    makeCreateCarController,
    makeCreateCarSpecificationController,
    makeListAvailableCarsController,
} from "@/modules/cars/useCases/car";
import { makeUploadCarImageController } from "@/modules/cars/useCases/car/uploadCarImage";

import { adaptMiddleware, adaptRoute } from "../adapters";
import {
    makeEnsureAdminMiddleware,
    makeEnsureAuthenticatedMiddleware,
} from "../middlewares";

const carsRouter = Router();
const upload = UploadConfig.upload();

carsRouter.post(
    "/",
    adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
    adaptMiddleware(makeEnsureAdminMiddleware()),
    adaptRoute(makeCreateCarController())
);

carsRouter.post(
    "/specifications/:id",
    adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
    adaptMiddleware(makeEnsureAdminMiddleware()),
    adaptRoute(makeCreateCarSpecificationController())
);

carsRouter.post(
    "/images/:id",
    adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
    adaptMiddleware(makeEnsureAdminMiddleware()),
    upload.array("images"),
    adaptRoute(makeUploadCarImageController())
);

carsRouter.get("/available", adaptRoute(makeListAvailableCarsController()));

export { carsRouter };
