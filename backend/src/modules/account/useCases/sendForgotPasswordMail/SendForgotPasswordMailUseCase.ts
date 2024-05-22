import { resolve } from "path";
import { v4 as uuidV4 } from "uuid";

import { NotFoundError } from "@/shared/helpers";
import { IDateAdapter } from "@/shared/infra/date/models";
import { IMailAdapter } from "@/shared/infra/mail/models";

import { IUsersRepository, IUsersTokensRepository } from "../../repositories";

interface IRequest {
    email: string;
}

export class SendForgotPasswordMailUseCase {
    constructor(
        private readonly usersRepository: IUsersRepository,
        private readonly usersTokensRepository: IUsersTokensRepository,
        private readonly dateAdapter: IDateAdapter,
        private readonly mailAdapter: IMailAdapter
    ) {}

    async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new NotFoundError("User does not exists!");
        }

        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "mails",
            "forgotPassword.hbs"
        );
        const token = uuidV4();

        const expiresDate = this.dateAdapter.addHours(
            this.dateAdapter.dateNow(),
            3
        );
        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date: expiresDate,
        });

        const variables = {
            name: user.name,
            link: `${process.env.BASE_URL}/password/reset?token=${token}`,
        };

        await this.mailAdapter.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        );
    }
}
