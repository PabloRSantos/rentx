import { Request, Response } from "express";

import { AppError } from "@/shared/helpers";
import { IController, HttpRequest, IFile } from "@/shared/protocols";

export const adaptRoute = (controller: IController) => {
    return async (req: Request, res: Response): Promise<Response> => {
        const httpRequest: HttpRequest = {
            body: req.body,
            params: req.params,
            file: req.file,
            files: req.files as IFile[],
            userId: req?.userId,
            query: req.query,
        };

        try {
            const httpResponse = await controller.handle(httpRequest);

            return res.status(httpResponse.statusCode).json(httpResponse.body);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({
                    error: error.message,
                });
            }

            console.log(error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
};
