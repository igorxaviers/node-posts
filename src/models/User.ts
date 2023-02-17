export interface User {
    id: number;
    email: string;
    name?: string | null;
    createdAt: Date;
    password: string;
    photo?: string | null;
    updatedAt: Date;
}