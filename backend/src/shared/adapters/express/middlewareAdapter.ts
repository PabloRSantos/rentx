import { NextFunction, Request, Response } from "express";

import { AppError } from "@/shared/helpers";

import { IMiddleware, HttpRequest } from "../../protocols";

export const adaptMiddleware = (middleware: IMiddleware) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        const httpRequest: HttpRequest = {
            headers: req.headers,
            userId: req.userId,
        };

        try {
            const httpResponse = await middleware.handle(httpRequest);

            Object.assign(req, httpResponse.body);
            return next();
        } catch (error) {
            if (error instanceof AppError)
                return res.status(error.statusCode).json({
                    error: error.message,
                });

            console.log(error.message);
            return res.status(500).json({ error: "Internal server error" });
        }
    };
};
