import { ICreateSpecificationDTO } from "../../dtos";
import { Specification } from "../../infra/typeorm/entities";

export interface ISpecificationRepository {
    create(data: ICreateSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}
