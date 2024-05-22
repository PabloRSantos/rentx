import { getRepository, Repository } from "typeorm";

import { ICreateCategoryDTO } from "../../../dtos";
import { ICategoriesRepository } from "../../../repositories";
import { Category } from "../entities";

export class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
        const category = this.repository.create({ name, description });
        return this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        return this.repository.find();
    }

    async findByName(name: string): Promise<Category> {
        return this.repository.findOne({
            name,
        });
    }
}
