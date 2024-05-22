import { noContent } from "@/shared/helpers/http";
import { IController, HttpRequest, HttpResponse } from "@/shared/protocols";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController implements IController {
    constructor(
        private readonly createCategoryUseCase: CreateCategoryUseCase
    ) {}

    async handle({ body }: HttpRequest): Promise<HttpResponse> {
        const { name, description } = body;

        await this.createCategoryUseCase.execute({ name, description });

        return noContent();
    }
}
