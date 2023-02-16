import { expect, test, describe } from "vitest";
import app from "../src/app";

describe("Server test", () => {
    test("Server is running", () => {
        return app.get('/', (req, res) => {
            expect(res.status).toBe(200);
        });
    });
});