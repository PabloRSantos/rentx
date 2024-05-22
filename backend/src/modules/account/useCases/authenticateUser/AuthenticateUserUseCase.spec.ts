import { BadRequestError } from "@/shared/helpers";
import { DayJsAdapter } from "@/shared/infra/date/implementations";

import { EncrypterInMemory } from "../../infra/encrypter/in-memory";
import { HashCompareInMemory } from "../../infra/hasher/in-memory";
import { User } from "../../infra/typeorm/entities";
import {
    IUsersRepository,
    UsersRepositoryInMemory,
    UsersTokensRepositoryInMemory,
} from "../../repositories";
import { makeUser } from "../../test/mocks";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;
let encrypterInMemory: EncrypterInMemory;
let hashCompareInMemory: HashCompareInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateAdapter: DayJsAdapter;

describe("Authenticate User", () => {
    beforeEach(() => {
        hashCompareInMemory = new HashCompareInMemory();
        encrypterInMemory = new EncrypterInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateAdapter = new DayJsAdapter();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            hashCompareInMemory,
            encrypterInMemory,
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateAdapter
        );
    });

    it("should be able to authenticate an user", async () => {
        const user = await usersRepositoryInMemory.create(makeUser());

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: "password",
        });

        expect(hashCompareInMemory.params).toMatchObject({
            value: "password",
            hash: user.password,
        });

        expect(encrypterInMemory.options).toMatchObject({
            subject: user.id,
            expiresIn: "30d",
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () => {
        const promise = authenticateUserUseCase.execute({
            email: "false@email.com",
            password: "password",
        });

        await expect(promise).rejects.toEqual(
            new BadRequestError("Email or password incorrect")
        );
    });

    it("should not be able to authenticate an user if password not match", async () => {
        const user = await usersRepositoryInMemory.create(makeUser());
        hashCompareInMemory.response = false;
        const promise = authenticateUserUseCase.execute({
            email: user.email,
            password: "wrong_password",
        });

        await expect(promise).rejects.toEqual(
            new BadRequestError("Email or password incorrect")
        );
    });
});
