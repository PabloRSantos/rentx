import { ICreateSpecificationDTO } from "../../dtos";
import { Specification } from "../../infra/typeorm/entities";
import { ISpecificationRepository } from "../models";

export class SpecificationsRepositoryInMemory
    implements ISpecificationRepository
{
    specifications: Specification[] = [];

    async create(data: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, data);
        this.specifications.push(specification);

        return specification;
    }
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(
            (specification) => specification.name === name
        );
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specifications.filter((specification) =>
            ids.includes(specification.id)
        );
    }
}
