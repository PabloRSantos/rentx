import { NotFoundError } from "@/shared/helpers";

import { IUsersRepository } from "../../repositories";

interface IRequest {
    userId: string;
}

export class GetUserProfileUseCase {
    constructor(private readonly usersRepository: IUsersRepository) {}

    async execute({ userId }: IRequest) {
        const user = await this.usersRepository.findById(userId);

        if (!user) {
            throw new NotFoundError("User not found!");
        }

        return user;
    }
}
