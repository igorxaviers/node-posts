import { UserSchema } from "../schema/user.schema";
import { z } from "zod";
// export type User = z.infer<typeof UserSchema>;

export interface User{
    id?: number;
    email: string;
    password: string;
    name?: string | null;
    photo?: string | null; 

}




