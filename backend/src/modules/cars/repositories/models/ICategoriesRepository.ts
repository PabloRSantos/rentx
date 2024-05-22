import { ICreateCategoryDTO } from "../../dtos";
import { Category } from "../../infra/typeorm/entities";

export interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create(data: ICreateCategoryDTO): Promise<Category>;
}
