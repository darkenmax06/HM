const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res, next) => {
	const { name, lastName, password, key, userName } = req.body

	if (!name ||
        !lastName ||
        !password ||
        !userName ||
        !key) return next({ name: 'MISSING_DATA' })
	if (key !== process.env.SECRET_KEY) return next({ name: 'INVALID_KEY' })

	let isCreated = null
	try {
		isCreated = await User.findOne({ name, lastName })
	} catch (err) { return next(err) }
	if (isCreated) return next({ name: 'USER_ALREADY_EXISTS' })

	const date = new Date()
	const SALT_ROUNDS = 10
	const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

	const user = new User({
		name,
		lastName,
		createAt: date,
		password: passwordHash,
		userName,
		type: 'admin'
	})

	try {
		const savedUser = await user.save()
		const token = jwt.sign({id: savedUser.id}, process.env.SECRET_KEY)
		res.json({
			...savedUser.toJSON(),
			token
		})
	} catch (err) {
		next(err)
	}
})



module.exports = router