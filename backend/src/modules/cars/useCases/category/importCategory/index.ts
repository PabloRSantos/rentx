import { makeCategoriesRepository } from "@/modules/cars/repositories/factories";
import { IController } from "@/shared/protocols";

import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export const makeImportCategoryController = (): IController => {
    const importCategoryUseCase = new ImportCategoryUseCase(
        makeCategoriesRepository()
    );
    const importCategoryController = new ImportCategoryController(
        importCategoryUseCase
    );

    return importCategoryController;
};
