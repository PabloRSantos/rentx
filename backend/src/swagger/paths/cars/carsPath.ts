export const carsPath = {
    post: {
        tags: ["Cars"],
        summary: "Create a new car",
        description: "Create a new car",
        security: [{ bearerAuth: [] }],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/createCar",
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Created",
            },
            400: {
                description: "Car already exists!",
            },
        },
    },
    get: {
        tags: ["Category"],
        summary: "List all categories",
        description: "List all categories",
        responses: {
            200: {
                description: "Success",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/schemas/category",
                            },
                        },
                    },
                },
            },
            500: {
                description: "Category already exists",
            },
        },
    },
};
