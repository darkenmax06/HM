const {app}= require("../index")
const supertest = require("supertest")

const api = supertest(app)

test('the database is empty', async()=>{
    const res = await api.get("/api/users")
    console.log(res)

    res.expect("content-type", /application\/json/)
    .expect(200)
    .expect(res.body).toBeEqual([])
})