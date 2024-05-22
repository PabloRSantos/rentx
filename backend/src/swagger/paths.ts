import { carsPath, categoriesPath, specificationsPath } from "./paths/";
import { carImagesPath } from "./paths/cars";
import { sessionsPath } from "./paths/sessions";

export const paths = {
    "/cars": carsPath,
    "/cars/images/{id}": carImagesPath,
    "/categories": categoriesPath,
    "/categories/import": categoriesPath.import,
    "/specifications": specificationsPath,
    "/sessions": sessionsPath,
};
