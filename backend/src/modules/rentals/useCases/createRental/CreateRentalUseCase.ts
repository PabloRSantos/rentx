import { ICarsRepository } from "@/modules/cars/repositories";
import { BadRequestError } from "@/shared/helpers";
import { IDateAdapter } from "@/shared/infra/date/models";

import { ICreateRentalDTO } from "../../dtos";
import { Rental } from "../../infra/typeorm/entities";
import { IRentalsRepository } from "../../repositories/models";

type IRequest = ICreateRentalDTO;

export class CreateRentalUseCase {
    constructor(
        private readonly rentalsRepository: IRentalsRepository,
        private readonly dateAdapter: IDateAdapter,
        private readonly carsRepository: ICarsRepository
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (carUnavailable) {
            throw new BadRequestError("Car is unavailable");
        }

        const rentalOpenToUser =
            await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new BadRequestError(
                "There is a rental in progress for user!"
            );
        }

        const dateNow = this.dateAdapter.dateNow();
        const compare = this.dateAdapter.compareInHours(
            dateNow,
            expected_return_date
        );

        const minimumHour = 24;
        if (compare < minimumHour) {
            throw new BadRequestError("invalid return time!");
        }
        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}
