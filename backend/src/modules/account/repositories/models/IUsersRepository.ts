import { ICreateUserDTO } from "../../dtos";
import { User } from "../../infra/typeorm/entities";

export interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}
