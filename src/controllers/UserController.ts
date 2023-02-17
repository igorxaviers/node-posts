import { User } from "../models/User";
import db from "../db/dbClient";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

class UserController {


    findAll = async (req: Request, res: Response) => {
        try{
            const users: User[] = await db.user.findMany();
            res.json(users);
        }
        catch(err){
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    create = async (req: Request, res: Response) => {
        const user: User = req.body;
        try{
            user.password = await bcrypt.hash(user.password, 10);
            const newUser: User = await db.user.create({
                data: user
            });
            user.password = "";
            res.json(newUser);
        }
        catch(err){
            res.status(500).json({ message: "Something went wrong" });
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

    authenticate = async (req: Request, res: Response) => {
        const user: User = req.body;
        try{
            const authenticatedUser: User | null = await db.user.findUnique({
                where: { email: user.email }
            });
            if (authenticatedUser) {
                //move this to a service
                const match = await bcrypt.compare(user.password, authenticatedUser.password);
                if (match) {
                    res.json(authenticatedUser);
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        }
        catch(err){
            res.status(500).json({ message: "Something went wrong" });
        }
    }


}

export default new UserController();