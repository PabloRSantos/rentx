import { noContent } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController implements IController {
    constructor(
        private readonly updateUserAvatarUseCase: UpdateUserAvatarUseCase
    ) {}

    async handle({ file, userId }: HttpRequest): Promise<HttpResponse> {
        const avatarFile = file.filename;

        await this.updateUserAvatarUseCase.execute({ avatarFile, userId });

        return noContent();
    }
}
