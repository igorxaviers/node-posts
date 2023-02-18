import { expect, test, describe, beforeAll } from "vitest";
import { Request, Response, Express } from "express";
import { User } from "../src/models/User";
import app from "../src/app";
import supertest from "supertest";
const request = supertest(app);


const userTest: User = {
    name: "Test",
    email: "test@test.com",
    password: "test"
}

beforeAll(() => {
    return await request.post('/user')
    .send(userTest)
    .then(res => {
        let { status } = res;
        expect(status).toBe(200);
    })
    .catch(err => {
        console.log(err);
        fail(err);
    })
});

// afterAll(() => {
//     return request.delete('/user/1')
//     .then(res => {
//         let { status } = res;
//         expect(status).toBe(200);
//     })
//     .catch(err => {
//         console.log(err);
//     }
// });

describe("User methods test", () => {
    test("Should not create a user with duplicate email", () => {
        return app.post('/user', (req: Request, res: Response) => {
            expect(res.status).toBe(400);
        });
    });
});