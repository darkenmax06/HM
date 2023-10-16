const jwt = require('jsonwebtoken')
const User = require('../models/User')


/* global process */

const validateUser = async (req,res,next)=>{
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
	console.log("verify User")
	console.log(verifyUser)
	if (!verifyUser || verifyUser.disable) return next({ name: 'INVALID_USER' })

	req.user = verifyUser
	next()
}



const validateAdmin = async(req,res,next)=>{
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
	if (!verifyUser || verifyUser.disable) return next({ name: 'INVALID_USER' })
	if (verifyUser.type === 'user') return next({ name: 'INVALID ROLE' })

	req.admin = verifyUser
	next()
}

module.exports = {
	validateUser,
	validateAdmin
}