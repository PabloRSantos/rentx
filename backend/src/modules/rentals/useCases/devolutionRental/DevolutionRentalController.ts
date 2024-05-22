import { ok } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

export class DevolutionRentalController implements IController {
    constructor(
        private readonly devolutionRentalUseCase: DevolutionRentalUseCase
    ) {}

    async handle(data: HttpRequest): Promise<HttpResponse> {
        const { id } = data.params;

        const rental = await this.devolutionRentalUseCase.execute({
            rental_id: id,
        });

        return ok(rental);
    }
}
