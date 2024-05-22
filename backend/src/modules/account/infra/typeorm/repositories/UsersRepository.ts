import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@/modules/account/dtos";
import { IUsersRepository } from "@/modules/account/repositories";

import { User } from "../entities";

export class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }
    findById(id: string): Promise<User> {
        return this.repository.findOne({ id });
    }

    findByEmail(email: string): Promise<User> {
        return this.repository.findOne({ email });
    }

    async create(data: ICreateUserDTO): Promise<User> {
        const user = this.repository.create(data);
        return this.repository.save(user);
    }
}
