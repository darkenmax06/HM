const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.get('/', async (req, res, next) => {
	/*--- TOKEN VALIDATION ---*/
	const authorization = req.headers?.authorization
	let token = null
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		token = authorization.substring(7)
	}

	let decodeToken = {}
	const secretKey = process.env.SECRET_KEY
	try {
		decodeToken = jwt.verify(token, secretKey)
	} catch (err) {
		return next(err)
	}
	if (!decodeToken || !decodeToken.id) return next({ name: 'INVALID_TOKEN' })

	let verifyUser = null
	try {
		verifyUser = await User.findById(decodeToken.id)
	} catch (err) {
		return next(err)
	}
	if (!verifyUser || verifyUser.disabled) return next({ name: 'INVALID_USER' })
	/*--- END ---*/
	const users = await User.find()
	res.json(users)
})


router.post('/', async (req, res, next) => {
	const { name, lastName, password } = req.body
	if (!name ||
        !lastName ||
        !password) return next({ name: 'MISSING_DATA' })

	/*--- TOKEN VALIDATION ---*/
	const authorization = req.headers?.authorization
	let token = null
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		token = authorization.substring(7)
	}

	let decodeToken = {}
	const secretKey = process.env.SECRET_KEY
	try {
		decodeToken = jwt.verify(token, secretKey)
	} catch (err) {
		return next(err)
	}
	if (!decodeToken || !decodeToken.id) return next({ name: 'INVALID_TOKEN' })

	let verifyUser = null
	try {
		verifyUser = await User.findById(decodeToken.id)
	} catch (err) {
		return next(err)
	}
	if (!verifyUser || verifyUser.disabled) return next({ name: 'INVALID_USER' })
	// if (verifyUser.type === "user") return next({ name: "INVALID ROLE" })
	/*--- END ---*/

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
		type: 'user',
		disable: false
	})

	try {
		const savedUser = await user.save()
		res.json(savedUser)
	} catch (err) {
		next(err)
	}
})

module.exports = router