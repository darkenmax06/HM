const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { validateUser, validateAdmin } = require('../middlewares/tokenValidate')


router.get('/', validateUser, async (req, res, next) => {
	try {
		const users = await User.find()
		res.json(users)
	} catch (err) {
		return next(err)
	}
})

router.post('/', validateAdmin, async (req, res, next) => {
	const { name, lastName, password, userName } = req.body

	if (!name || !lastName || !userName || !password) return next({ name: 'MISSING_DATA' })

	let isCreated = null
	try {
		isCreated = await User.findOne({ userName })
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

router.put('/disable', validateAdmin,async (req, res, next) => {
	console.log(req.body)
	const { id, disabled } = req.body
	if (disabled === undefined || !id ) return next({ name: 'ID_LOST' })

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


router.put('/password', validateAdmin, async (req, res, next) => {
	const { id, password } = req.body
	if (!id || !password) return next({ name: 'ID_LOST' })

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