import { ICategoriesRepository } from "..";

import { ICreateCategoryDTO } from "../../dtos";
import { Category } from "../../infra/typeorm/entities";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(
            (category) => category.name === name
        );
        return category;
    }
    async list(): Promise<Category[]> {
        return this.categories;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const newCategory = new Category();

        Object.assign(newCategory, { name, description });
        this.categories.push(newCategory);

        return newCategory;
    }
}
