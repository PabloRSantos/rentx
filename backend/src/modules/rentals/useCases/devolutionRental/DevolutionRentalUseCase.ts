import { ICarsRepository } from "@/modules/cars/repositories";
import { Rental } from "@/modules/rentals/infra/typeorm/entities";
import { IRentalsRepository } from "@/modules/rentals/repositories/models";
import { BadRequestError } from "@/shared/helpers";
import { IDateAdapter } from "@/shared/infra/date/models";

interface IRequest {
    rental_id: string;
}

export class DevolutionRentalUseCase {
    constructor(
        private readonly carsRepository: ICarsRepository,
        private readonly rentalsRepository: IRentalsRepository,
        private readonly dateAdapter: IDateAdapter
    ) {}

    async execute({ rental_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(rental_id);
        const minumum_daily = 1;
        const dateNow = this.dateAdapter.dateNow();

        if (!rental) {
            throw new BadRequestError("Rental does not exists");
        }

        const car = await this.carsRepository.findById(rental.car_id);
        if (!car) {
            throw new BadRequestError("Car does not exists");
        }

        let daily = this.dateAdapter.compareInDays(rental.start_date, dateNow);

        if (daily <= 0) {
            daily = minumum_daily;
        }

        const delay = this.dateAdapter.compareInDays(
            rental.expected_return_date,
            dateNow
        );

        let total = 0;
        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;
        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);
        return rental;
    }
}
