import { NotFoundError } from "@/shared/helpers";
import { DayJsAdapter } from "@/shared/infra/date/implementations";
import { MailAdapterInMemory } from "@/shared/infra/mail/in-memory";

import {
    UsersRepositoryInMemory,
    UsersTokensRepositoryInMemory,
} from "../../repositories";
import { makeUser } from "../../test/mocks";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateAdapter: DayJsAdapter;
let mailAdapter: MailAdapterInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateAdapter = new DayJsAdapter();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailAdapter = new MailAdapterInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateAdapter,
            mailAdapter
        );
    });

    it("should be able to send a forgot password mail to user", async () => {
        const sendMailSpy = jest.spyOn(mailAdapter, "sendMail");
        const user = await usersRepositoryInMemory.create(makeUser());

        await sendForgotPasswordMailUseCase.execute({ email: user.email });

        expect(sendMailSpy).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        const promise = sendForgotPasswordMailUseCase.execute({
            email: "any_email",
        });

        await expect(promise).rejects.toEqual(
            new NotFoundError("User does not exists!")
        );
    });

    it("should be able to create an users token", async () => {
        const usersTokensRepositorySpy = jest.spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );
        const user = await usersRepositoryInMemory.create(makeUser());

        await sendForgotPasswordMailUseCase.execute({ email: user.email });

        expect(usersTokensRepositorySpy).toHaveBeenCalled();
    });
});
