import 'express-async-errors'
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./middlewares/error";
import { validate } from './middlewares/validate';
import { ApiError, BadRequestError, NotFoundError } from "./utils/apiError";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// user-routes
app.use("/", userRoutes);
app.use("/", authRoutes);
app.get("/", async (req: Request, res: Response) => {
    throw new NotFoundError("User not found");
});


// eror middleware handler
app.use(validate);
app.use(errorMiddleware);


export default app;