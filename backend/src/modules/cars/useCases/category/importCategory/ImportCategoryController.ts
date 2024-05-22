import { noContent } from "@/shared/helpers/http";
import { IController, HttpRequest, HttpResponse } from "@/shared/protocols";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController implements IController {
    constructor(
        private readonly importCategoryUseCase: ImportCategoryUseCase
    ) {}

    async handle({ file }: HttpRequest): Promise<HttpResponse> {
        await this.importCategoryUseCase.execute({ file });

        return noContent();
    }
}
