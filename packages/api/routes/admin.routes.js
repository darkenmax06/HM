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

router.put('/users/disable', async (req, res, next) => {
	const { id, disabled } = req.body
	if (!id || disabled) return next({ name: 'ID_LOST' })

	/*--- TOKEN AND ADMIN VALIDATION ---*/
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
	if (verifyUser.type === 'user') return next({ name: 'INVALID ROLE' })
	/*--- END ---*/

	let user = null
	try {
		user = await User.findById(id)
	} catch (err) {
		return next(err)
	}
	if (!user) return next({ name: 'INVALID_ID' })

	user.disable = disabled

	try {
		await user.save()
		const message = disabled ? 'desabilitado' : 'habilitado'
		res.json({ message: 'usuario ' + message })
	} catch (err) {
		next(err)
	}
})

router.put('/users/password', async (req, res, next) => {
	const { id, password } = req.body
	if (!id || !password) return next({ name: 'ID_LOST' })

	/*--- TOKEN AND ADMIN VALIDATION ---*/
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
	if (verifyUser.type === 'user') return next({ name: 'INVALID ROLE' })
	/*--- END ---*/

	let user = null
	try {
		user = await User.findById(id)
	} catch (err) {
		return next(err)
	}
	if (!user) return next({ name: 'INVALID_ID' })

	const SALTROUNDS = 10
	const passwordHash = await bcrypt.hash(password, SALTROUNDS)
	user.password = passwordHash

	try {
		await user.save()
		res.json({ message: 'Password cambiada ' })
	} catch (err) {
		next(err)
	}
})


module.exports = router