export const createCarSchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
        },
        description: {
            type: "string",
        },
        daily_rate: {
            type: "number",
        },
        license_plate: {
            type: "string",
        },
        fine_amount: {
            type: "number",
        },
        brand: {
            type: "string",
        },
        category_id: {
            type: "string",
        },
    },
    example: {
        name: "any_category",
        description: "any_description",
    },
};
