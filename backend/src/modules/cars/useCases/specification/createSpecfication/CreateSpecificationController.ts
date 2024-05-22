import { noContent } from "@/shared/helpers/http";
import { IController, HttpRequest, HttpResponse } from "@/shared/protocols";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

export class CreateSpecificationController implements IController {
    constructor(
        private readonly createSpecificationUseCase: CreateSpecificationUseCase
    ) {}

    async handle({ body }: HttpRequest): Promise<HttpResponse> {
        const { name, description } = body;

        await this.createSpecificationUseCase.execute({ name, description });

        return noContent();
    }
}
