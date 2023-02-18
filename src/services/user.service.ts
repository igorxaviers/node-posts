import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from "bcrypt";
import db from '../db/dbClient';

class UserService {

    createUser = async (user: User) => {
        user.password = await bcrypt.hash(user.password, 10);
        const newUser: User = await db.user.create({
            data: {
                email: user.email,
                password: user.password,
                name: user.name
            }
        });
        newUser.password = "";
        return newUser;
    }

    getUserByEmail = async (email: string) => {
        const user: User | null = await db.user.findUnique({
            where: { email }
        });
        return user;
    }



}

export default new UserService();