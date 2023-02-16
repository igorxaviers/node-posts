import { User } from "../models/User";
import db from "../db/dbClient";
import { Request, Response } from "express";

class UserController {


    findAll = async (req: Request, res: Response) => {
        const users: User[] = await db.user.findMany();
        res.json(users);
    }

    create = async (req: Request, res: Response) => {
        const user: User = req.body;
        const newUser: User = await db.user.create({
            data: user
        });
        res.json(newUser);
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

    authenticate = async (req: Request, res: Response) => {
        const user: User = req.body;
        const authenticatedUser: User = await db.user.findUnique({
            where: { email: user.email }
        });
        if (authenticatedUser) {
            res.json(authenticatedUser);
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    }


}

export default new UserController();