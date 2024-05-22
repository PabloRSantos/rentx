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
describe("List Categories Controller", () => {
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

    it("should be able to list all available categories", async () => {
        const token = await makeToken();

        await request(app)
            .post("/categories")
            .send({
                name: "category supertest",
                description: "category supertest",
            })
            .set({ Authorization: `Bearer ${token}` });

        const response = await request(app).get("/categories");
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0]).toHaveProperty("name", "category supertest");
    });
});
