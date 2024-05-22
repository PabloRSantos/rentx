import { HttpResponse } from "../../protocols";

export const ok = (data: any): HttpResponse => ({
    statusCode: 200,
    body: data,
});

export const noContent = (): HttpResponse => ({
    statusCode: 204,
    body: null,
});
