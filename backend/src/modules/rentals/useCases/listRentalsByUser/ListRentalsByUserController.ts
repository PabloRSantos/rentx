import { ok } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

export class ListRentalsByUserController implements IController {
    constructor(
        private readonly listRentalsByUserUseCase: ListRentalsByUserUseCase
    ) {}

    async handle(data: HttpRequest): Promise<HttpResponse> {
        const rentalsByIser = await this.listRentalsByUserUseCase.execute({
            user_id: data.userId,
        });

        return ok(rentalsByIser);
    }
}
