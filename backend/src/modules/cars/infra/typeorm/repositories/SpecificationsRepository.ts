import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationDTO } from "@/modules/cars/dtos";
import { ISpecificationRepository } from "@/modules/cars/repositories";

import { Specification } from "../entities";

export class SpecificationRepository implements ISpecificationRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    findByIds(ids: string[]): Promise<Specification[]> {
        return this.repository.findByIds(ids);
    }

    async create({
        description,
        name,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({ name, description });

        return this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        return this.repository.findOne({ name });
    }
}
