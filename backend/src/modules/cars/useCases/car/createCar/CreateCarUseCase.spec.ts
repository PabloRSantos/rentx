import { CarsRepositoryInMemory } from "@/modules/cars/repositories";
import { BadRequestError } from "@/shared/helpers";

import { makeCar } from "../../../test/mocks";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepository);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute(makeCar());
        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with exists license plate", async () => {
        await createCarUseCase.execute(makeCar());
        const promise = createCarUseCase.execute(makeCar());
        await expect(promise).rejects.toEqual(
            new BadRequestError("Car already exists!")
        );
    });

    it("should be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute(makeCar());
        expect(car.available).toBeTruthy();
    });
});
