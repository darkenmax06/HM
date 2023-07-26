const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res, next) => {
	const { name, lastName, password, key } = req.body

	if (!name ||
        !lastName ||
        !password ||
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
	const userName = name.split('')[0].toUpperCase() + lastName.split(' ')[0]

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
		res.json(savedUser)
	} catch (err) {
		next(err)
	}
})



module.exports = router