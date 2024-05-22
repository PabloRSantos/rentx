import { ok } from "@/shared/helpers";
import { HttpResponse, IController } from "@/shared/protocols";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController implements IController {
    constructor(
        private readonly listCategoriesUseCase: ListCategoriesUseCase
    ) {}

    async handle(): Promise<HttpResponse> {
        const categories = await this.listCategoriesUseCase.execute();

        return ok(categories);
    }
}
