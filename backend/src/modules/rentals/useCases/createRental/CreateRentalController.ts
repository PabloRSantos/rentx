import { ok } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController implements IController {
    constructor(private readonly createRentalUseCase: CreateRentalUseCase) {}

    async handle(params: HttpRequest): Promise<HttpResponse> {
        const { car_id, expected_return_date } = params.body;

        const rental = await this.createRentalUseCase.execute({
            car_id,
            expected_return_date,
            user_id: params.userId,
        });

        return ok(rental);
    }
}
