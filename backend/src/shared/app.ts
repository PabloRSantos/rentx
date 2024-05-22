import "reflect-metadata";
import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";

import { UploadConfig } from "@/config";

import swaggerSetup from "../swagger";
import { makeConnection } from "./infra/typeorm";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use("/avatar", express.static(`${UploadConfig.tempFolder}/avatar`));
app.use("/cars", express.static(`${UploadConfig.tempFolder}/cars`));

makeConnection()
    .then(async () => {
        const { router } = await import("./routes");
        app.use(router);
    })
    .catch(console.log);

export { app };
