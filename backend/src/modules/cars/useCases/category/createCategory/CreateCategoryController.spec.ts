import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "@/shared/app";
import { makeConnection } from "@/shared/infra/typeorm";

const makeToken = async (): Promise<string> => {
    const loginResponse = await request(app).post("/sessions").send({
        email: "admin@rentx.com.br",
        password: "admin",
    });

    return loginResponse.body.token;
};

let connection: Connection;
describe("Create Category Controller", () => {
    beforeAll(async () => {
        connection = await makeConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);
        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
                values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("should be able to create a new category", async () => {
        const token = await makeToken();

        const response = await request(app)
            .post("/categories")
            .send({
                name: "category supertest",
                description: "category supertest",
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(204);
    });

    it("should not be able to create a new category with name exists", async () => {
        const token = await makeToken();

        const response = await request(app)
            .post("/categories")
            .send({
                name: "category supertest",
                description: "category supertest",
            })
            .set({ Authorization: `Bearer ${token}` });

        expect(response.status).toBe(400);
    });
});
