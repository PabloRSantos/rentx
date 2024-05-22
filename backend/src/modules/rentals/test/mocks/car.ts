import { ICreateCarDTO } from "@/modules/cars/dtos";

export const makeCar = (): ICreateCarDTO => ({
    name: "Test",
    description: "Car Test",
    daily_rate: 100,
    license_plate: "test",
    fine_amount: 40,
    category_id: "1234",
    brand: "brand",
});
