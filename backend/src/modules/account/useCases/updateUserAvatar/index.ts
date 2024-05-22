import { makeDiskStorageAdapter } from "@/shared/infra/storage/factories";
import { IController } from "@/shared/protocols";

import { makeUsersRepository } from "../../repositories/factories";
import { UpdateUserAvatarController } from "./UpdateUserAvatarController";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export const makeUpdateUserAvatarController = (): IController => {
    const updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
        makeUsersRepository(),
        makeDiskStorageAdapter()
    );
    const updateUserAvatarController = new UpdateUserAvatarController(
        updateUserAvatarUseCase
    );

    return updateUserAvatarController;
};
