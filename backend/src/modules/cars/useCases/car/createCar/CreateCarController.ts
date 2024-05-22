import { ok } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController implements IController {
    constructor(private readonly createCarUseCase: CreateCarUseCase) {}

    async handle(params: HttpRequest): Promise<HttpResponse> {
        const {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        } = params.body;

        const car = await this.createCarUseCase.execute({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        return ok(car);
    }
}
