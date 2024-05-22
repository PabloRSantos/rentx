import { Rental } from "../../infra/typeorm/entities";
import { IRentalsRepository } from "../../repositories/models";

interface IRequest {
    user_id: string;
}

export class ListRentalsByUserUseCase {
    constructor(private readonly rentalsRepository: IRentalsRepository) {}

    async execute({ user_id }: IRequest): Promise<Rental[]> {
        const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

        return rentalsByUser;
    }
}
