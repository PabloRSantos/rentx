import { IStorage } from "@/shared/infra/storage/models";

import { IUpdateUserAvatarDTO } from "../../dtos";
import { IUsersRepository } from "../../repositories/models";

export class UpdateUserAvatarUseCase {
    constructor(
        private readonly usersRepository: IUsersRepository,
        private readonly storage: IStorage
    ) {}

    async execute({ avatarFile, userId }: IUpdateUserAvatarDTO): Promise<void> {
        const user = await this.usersRepository.findById(userId);

        if (user.avatar) {
            await this.storage.deleteFile(user.avatar, `./tmp/avatar/`);
        }
        await this.storage.saveFile(avatarFile, "avatar");

        user.avatar = avatarFile;
        await this.usersRepository.create(user);
    }
}
