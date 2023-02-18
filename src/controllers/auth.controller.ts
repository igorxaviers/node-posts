import { User } from "../models/User";
import db from "../db/dbClient";
import { Request, Response, NextFunction } from "express";
import { CreateUserInput, LoginUserInput } from '../schema/user.schema';
import bcrypt from "bcrypt";
import { BadRequestError, UnauthorizedError } from "../utils/apiError";
import jwt from "jsonwebtoken";

class AuthController{

    // login(req: Request, res: Response){
    //     const { email, password } = req.body;
    //     if(!email || !password) throw new BadRequestError("Email or password is missing");
    //     return res.status(200).send();
    // }

    
    login = async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
        
        const user: User = req.body;
        const authenticatedUser: User | null = await db.user.findUnique({
            where: { email: user.email }
        });
        if (authenticatedUser) {
            //move this to a service
            const match = await bcrypt.compare(user.password, authenticatedUser.password);
            if (match) {
                res.json(authenticatedUser);
            } 
            else {
                throw new UnauthorizedError("Invalid credentials");
            }
        } else {
            throw new BadRequestError("Email not found");
        }
    }
}


export default new AuthController();