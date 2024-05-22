import { ICreateUserDTO } from "../../dtos";

export const makeUser = (): ICreateUserDTO => ({
    driver_license: "0001321",
    email: "user@test.com",
    password: "hash_password",
    name: "user test",
});
