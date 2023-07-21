const { app } = require("../index")
const supertest = require("supertest")
const User = require("../models/User")

const api = supertest(app)

jest.setTimeout(20000)

describe("users", () => {
    test("create a admin user and login with this user", async () => {
        const userToSend = {
            "name": "maria",
            "lastName": "gonzalez",
            "password": "mariagonzalez",
            "key": process.env.SECRET_KEY
        }

        const res = await api.post("/api/admin")
            .send(userToSend)
            .expect("content-type", /application\/json/)
            .expect(200)
    })
})