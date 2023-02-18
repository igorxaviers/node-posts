import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // if its a custom error, then get status code, else set 500
    const statusCode = error.statusCode ?? 500;
    const message = error.message ?? "Something went wrong";
    console.log(error);
    
    res.status(statusCode).send({ message });
};
