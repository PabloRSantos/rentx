import {
    CarsRepositoryInMemory,
    SpecificationsRepositoryInMemory,
} from "@/modules/cars/repositories";
import { BadRequestError } from "@/shared/helpers";

import { makeCar, makeSpecification } from "../../../test/mocks";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("should not be able to add a new specification to a now-existent car", async () => {
        const request = {
            car_id: "1234",
            specifications_id: [],
        };

        const promise = createCarSpecificationUseCase.execute(request);
        await expect(promise).rejects.toEqual(
            new BadRequestError("Car does not exists!")
        );
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create(makeCar());
        const specification = await specificationsRepositoryInMemory.create(
            makeSpecification()
        );
        const request = {
            car_id: car.id,
            specifications_id: [specification.id],
        };

        const specificationsCars = await createCarSpecificationUseCase.execute(
            request
        );
        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications).toHaveLength(1);
    });
});
