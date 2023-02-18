import { expect, test, describe } from "vitest";
import { Request, Response } from "express";
import app from "../src/app";

describe("Server test", () => {
    test("Server is running", () => {
        return app.get('/', (req: Request, res: Response) => {
            expect(res.status).toBe(200);
        });
    });
});