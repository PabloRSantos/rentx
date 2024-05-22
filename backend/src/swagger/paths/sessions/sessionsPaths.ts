export const sessionsPath = {
    post: {
        tags: ["Sessions"],
        summary: "Authentication user",
        description: "Authentication user",
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/createSession",
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Success",
            },
            400: {
                description: "Email or password incorrect!",
            },
        },
    },
};
