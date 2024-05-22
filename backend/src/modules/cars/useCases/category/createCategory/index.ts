import { makeCategoriesRepository } from "@/modules/cars/repositories/factories";
import { IController } from "@/shared/protocols";

import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export const makeCategoryController = (): IController => {
    const createCategoryUseCase = new CreateCategoryUseCase(
        makeCategoriesRepository()
    );
    const createCategoryController = new CreateCategoryController(
        createCategoryUseCase
    );

    return createCategoryController;
};
