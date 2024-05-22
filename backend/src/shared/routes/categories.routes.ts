import { Router } from "express";
import multer from "multer";

import {
    makeCategoryController,
    makeListCategoriesController,
    makeImportCategoryController,
} from "../../modules/cars/useCases";
import { adaptMiddleware, adaptRoute } from "../adapters";
import {
    makeEnsureAdminMiddleware,
    makeEnsureAuthenticatedMiddleware,
} from "../middlewares";

const categoryRoutes = Router();

const upload = multer({
    dest: "./tmp",
});

categoryRoutes.post(
    "/",
    adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
    adaptMiddleware(makeEnsureAdminMiddleware()),
    adaptRoute(makeCategoryController())
);
categoryRoutes.get("/", adaptRoute(makeListCategoriesController()));
categoryRoutes.post(
    "/import",
    upload.single("file"),
    adaptMiddleware(makeEnsureAuthenticatedMiddleware()),
    adaptMiddleware(makeEnsureAdminMiddleware()),
    adaptRoute(makeImportCategoryController())
);

export { categoryRoutes };
