const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

router.post('/', async (req, res, next) => {
	const { userName, password } = req.body

	if (!userName || !password) return next({ name: 'MISSING_DATA' })

	let user = null
	try {
		user = await User.findOne({ userName: userName.toLowerCase() })
	} catch (err) { return next(err) }
	
	if (!user) return next({name: 'BAD_LOGIN'})
	else if (user.disable) return next({name: 'INVALID_USER'})

	const isCorrectPassword = user !== null
		? await bcrypt.compare(password, user.password)
		: false

	if (!isCorrectPassword) return next({ name: 'BAD_LOGIN' })

	const object = { id: user._id }
	const token = jwt.sign(object, process.env.SECRET_KEY)

	res.json({
		token,
		...user.toJSON()
	})
})

module.exports = router