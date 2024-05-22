export abstract class AppError {
    readonly message: string;
    readonly statusCode: number;
}

export class ServerError extends AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string) {
        super();
        this.message = message;
        this.statusCode = 500;
    }
}

export class BadRequestError extends AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string) {
        super();
        this.message = message;
        this.statusCode = 400;
    }
}

export class NotFoundError extends AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string) {
        super();
        this.message = message;
        this.statusCode = 404;
    }
}
