import { BadRequestError } from "@/shared/helpers";

import { ICreateUserDTO } from "../../dtos";
import { IHasher } from "../../infra/hasher/models";
import { User } from "../../infra/typeorm/entities";
import { IUsersRepository } from "../../repositories/models/IUsersRepository";

export class CreateUserUseCase {
    constructor(
        private readonly usersRepository: IUsersRepository,
        private readonly hasher: IHasher
    ) {}

    async execute({ password, email, ...rest }: ICreateUserDTO): Promise<User> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new BadRequestError("User already exists");
        }

        const passwordHash = await this.hasher.hash(password, 8);
        const user = await this.usersRepository.create({
            ...rest,
            email,
            password: passwordHash,
        });

        delete user.password;
        return user;
    }
}
