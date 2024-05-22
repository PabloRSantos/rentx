import { createSessionsSchema } from "./schemas/accounts";
import {
    createCategorySchema,
    categorySchema,
    createSpecificationSchema,
    uploadCategorySchema,
    createCarSchema,
} from "./schemas/cars";

export const schemas = {
    createCategory: createCategorySchema,
    uploadCategory: uploadCategorySchema,
    category: categorySchema,
    createSpecification: createSpecificationSchema,
    createSession: createSessionsSchema,
    createCar: createCarSchema,
};
