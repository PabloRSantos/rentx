import { CarsRepositoryInMemory } from "../../../repositories";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all available cars", async () => {
        const newCar = await carsRepositoryInMemory.create({
            name: "Audi A1",
            description: "Carro com espaço",
            daily_rate: 140.0,
            license_plate: "DEF-1212",
            fine_amount: 100,
            brand: "Audi",
            category_id: "category_id",
        });
        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([newCar]);
    });

    it("should be able to list all available cars by brand", async () => {
        const newCar = await carsRepositoryInMemory.create({
            name: "Audi A1",
            description: "Carro com espaço",
            daily_rate: 140.0,
            license_plate: "DEF-1212",
            fine_amount: 100,
            brand: "BrandTest",
            category_id: "category_id",
        });
        const cars = await listAvailableCarsUseCase.execute({
            brand: "BrandTest",
        });
        expect(cars).toEqual([newCar]);
    });

    it("should be able to list all available cars by name", async () => {
        const newCar = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Carro com espaço",
            daily_rate: 140.0,
            license_plate: "DEF-1212",
            fine_amount: 100,
            brand: "BrandTest",
            category_id: "category_id",
        });
        const cars = await listAvailableCarsUseCase.execute({ name: "Car3" });
        expect(cars).toEqual([newCar]);
    });

    it("should be able to list all available cars by category", async () => {
        const newCar = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Carro com espaço",
            daily_rate: 140.0,
            license_plate: "DEF-1212",
            fine_amount: 100,
            brand: "BrandTest",
            category_id: "12345",
        });
        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });
        expect(cars).toEqual([newCar]);
    });
});
