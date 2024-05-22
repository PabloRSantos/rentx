import { ok } from "@/shared/helpers/http";
import { IController, HttpRequest, HttpResponse } from "@/shared/protocols";

import { IListAvailableCarsDTO } from "../../../dtos";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

export class ListAvailableCarsController implements IController {
    constructor(
        private readonly listAvailableCarsUseCase: ListAvailableCarsUseCase
    ) {}

    async handle({
        query,
    }: HttpRequest<any, any, IListAvailableCarsDTO>): Promise<HttpResponse> {
        const { name, brand, category_id } = query;

        const cars = await this.listAvailableCarsUseCase.execute({
            name,
            brand,
            category_id,
        });

        return ok(cars);
    }
}
