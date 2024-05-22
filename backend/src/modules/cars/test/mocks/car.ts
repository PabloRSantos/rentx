import { ICreateCarDTO } from "@/modules/cars/dtos";

export const makeCar = (): ICreateCarDTO => ({
    name: "Name Car",
    description: "Description Car",
    daily_rate: 100,
    license_plate: "ABC-1234",
    fine_amount: 60,
    brand: "Brand",
    category_id: "Category",
});
