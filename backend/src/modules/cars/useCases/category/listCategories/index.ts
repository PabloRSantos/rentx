import { makeCategoriesRepository } from "@/modules/cars/repositories/factories";
import { IController } from "@/shared/protocols";

import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export const makeListCategoriesController = (): IController => {
    const listCategoriesUseCase = new ListCategoriesUseCase(
        makeCategoriesRepository()
    );
    const listCategoriesController = new ListCategoriesController(
        listCategoriesUseCase
    );

    return listCategoriesController;
};
