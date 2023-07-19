const router = require("express").Router()
const User = require('../models/User')
const bcrypt = require("bcrypt")


router.get("/", async (req, res, next) => {
    const users = await User.find()
    res.json(users)
})

router.post("/", async (req, res, next) => {
    const { name, lastName, password, type } = req.body
    if (!name || !lastName) return next({ name: 'MISSING_DATA' })

    let isCreated = null
    try {
        isCreated = await User.findOne({ name, lastName })
    } catch (err) { return next(err) }
    if (isCreated) return next({ name: "USER_ALREADY_EXISTS" })

    const date = new Date()
    const SALT_ROUNDS = 10
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const userName = name.split("")[0].toUpperCase() + lastName.split(" ")[0]

    const user = new User({
        name,
        lastName,
        createAt: date,
        password: passwordHash,
        userName,
        type
    })

    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params
    console.log(id)
    if (!id) return next({ name: "ID_LOST" })

    let user = null
    try {
        user = await User.findById(id)
    } catch (err) {
        return next(err)
    }
    if (!user) return next({ name: "INVALID_ID" })

    try {
        await User.findByIdAndDelete(id)
        res.json({ message: "usuario eliminado" })
    } catch (err) {
        next(err)
    }
})

module.exports = router