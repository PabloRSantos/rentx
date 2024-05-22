export const carImagesPath = {
    post: {
        tags: ["Cars"],
        summary: "Upload images",
        description: "Upload images",
        security: [{ bearerAuth: [] }],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "Car id",
                required: true,
                schema: {
                    type: "string",
                },
            },
        ],
        requestBody: {
            content: {
                "multipart/form-data": {
                    schema: {
                        type: "object",
                        properties: {
                            images: {
                                type: "array",
                                items: {
                                    type: "string",
                                    format: "binary",
                                },
                            },
                        },
                    },
                },
            },
        },
        responses: {
            204: {
                description: "Created",
            },
        },
    },
};
