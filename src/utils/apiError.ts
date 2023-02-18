export class ApiError{
    public readonly statusCode: number;
    public readonly name: string;
    public readonly message: string | string[];
    constructor(message: string, statusCode: number) {
        // super(message);
        this.message = message;
        this.name = "Error";
        this.statusCode = statusCode;
    }
}


export class BadRequestError extends ApiError {
    constructor(message: string) {
        super(message, 400);
    }
}

export class NotFoundError extends ApiError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message: string) {
        super(message, 401);
    }
}