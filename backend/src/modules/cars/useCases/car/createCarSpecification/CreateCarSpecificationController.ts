import { ok } from "@/shared/helpers";
import { HttpRequest, HttpResponse, IController } from "@/shared/protocols";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

export class CreateCarSpecificationController implements IController {
    constructor(
        private readonly createCarSpecificationUseCase: CreateCarSpecificationUseCase
    ) {}

    async handle(params: HttpRequest): Promise<HttpResponse> {
        const { specifications_id } = params.body;
        const { id } = params.params;

        const car = await this.createCarSpecificationUseCase.execute({
            car_id: id,
            specifications_id,
        });

        return ok(car);
    }
}
