import { CategoriesRepositoryInMemory } from "@/modules/cars/repositories";
import { BadRequestError } from "@/shared/helpers";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });
    it("should be able to create a new category", async () => {
        const category = {
            name: "category test",
            description: "category description test",
        };

        await createCategoryUseCase.execute(category);
        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category if name already exists", async () => {
        const category = {
            name: "category test",
            description: "category description test",
        };

        await createCategoryUseCase.execute(category);
        const promise = createCategoryUseCase.execute(category);

        await expect(promise).rejects.toEqual(
            new BadRequestError("Category Already exists!")
        );
    });
});
