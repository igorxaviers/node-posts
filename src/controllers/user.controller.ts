import { User } from "../models/User";
import db from "../db/dbClient";
import { Request, Response } from "express";
import UserService from "../services/user.service";
import { UserSchema, CreateUserSchema } from "../schema/user.schema";
import { fromZodError } from "zod-validation-error";
import { BadRequestError, UnauthorizedError } from "../utils/apiError";

class UserController {

    findAll = async (req: Request, res: Response) => {
        const users: User[] = await db.user.findMany();
        res.json(users);
    }

    create = async (req: Request, res: Response) => {
        const validateUser = CreateUserSchema.safeParse(req.body);
        if(!validateUser.success){
            res.status(400).json(fromZodError(validateUser.error));
        }
        else {
            const user: User = validateUser.data;
            const existingUser: User | null = await UserService.getUserByEmail(user.email);
            if(!existingUser) {
                const newUser: User | null = await UserService.createUser(user);
                if(newUser) {
                    res.json(newUser);
                }
            }   
            else {
                throw new BadRequestError("Email already exists");
            }
        }
    }

    update = async (req: Request, res: Response) => {
        const user: User = req.body;
        const updatedUser: User = await db.user.update({
            where: { id: user.id },
            data: user
        });
        res.json(updatedUser);
    }

    delete = async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        const deletedUser: User = await db.user.delete({
            where: { id: id }
        });
        res.json(deletedUser);
    }


}

export default new UserController();