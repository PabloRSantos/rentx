export const createSessionsSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
        },
        password: {
            type: "string",
        },
    },
    example: {
        email: "any_email",
        password: "any_password",
    },
};
