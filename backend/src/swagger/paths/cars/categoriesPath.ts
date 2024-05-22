export const categoriesPath = {
    post: {
        tags: ["Category"],
        summary: "Create a category",
        description: "Create a new category",
        security: [{ bearerAuth: [] }],
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/createCategory",
                    },
                },
            },
        },
        responses: {
            201: {
                description: "Created",
            },
            500: {
                description: "Category already exists",
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
    import: {
        post: {
            tags: ["Category"],
            summary: "Upload a new category",
            description: "Upload a new category",
            security: [{ bearerAuth: [] }],
            requestBody: {
                content: {
                    "multipart/form-data": {
                        schema: {
                            $ref: "#/schemas/uploadCategory",
                        },
                    },
                },
            },
            responses: {
                204: {
                    description: "Created",
                },
                500: {
                    description: "Category already exists",
                },
            },
        },
    },
};
