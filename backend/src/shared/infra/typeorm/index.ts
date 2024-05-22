import { Connection, createConnection, getConnectionOptions } from "typeorm";

export const makeConnection = async (
    host = "database"
): Promise<Connection> => {
    const options = await getConnectionOptions();

    const isTest = process.env.NODE_ENV === "test";
    Object.assign(options, {
        host: isTest ? "localhost" : host,
        database: isTest ? "rentx_test" : options.database,
    });
    return createConnection(options);
};
