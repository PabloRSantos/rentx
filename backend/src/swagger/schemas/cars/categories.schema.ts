export const createCategorySchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
        },
        description: {
            type: "string",
        },
    },
    example: {
        name: "any_category",
        description: "any_description",
    },
};

export const categorySchema = {
    type: "object",
    properties: {
        id: {
            type: "string",
        },
        name: {
            type: "string",
        },
        description: {
            type: "string",
        },
        created_at: {
            type: "string",
        },
    },
};

export const uploadCategorySchema = {
    type: "object",
    properties: {
        file: {
            type: "string",
            format: "binary",
        },
    },
};
