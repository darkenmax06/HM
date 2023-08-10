const router = require('express').Router()
const Paciente = require('../models/Paciente')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

/* global process */

router.get('/', async (req, res, next) => {
	const { hcn } = req.query
	if (!hcn) return next({ name: 'MISSING_DATA' })

	/*--- TOKEN AND DISABLED VALIDATION ---*/
	const { authorization } = req.headers
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

	console.log(decodeToken)

	if (!decodeToken || !decodeToken.id) return next({ name: 'INVALID_TOKEN' })

	let user = null
	try {
		user = await User.findById(decodeToken.id)
	} catch (err) {
		return next(err)
	}
	if (!user || user.disable) return next({ name: 'INVALID_USER' })
	/*--- END ---*/

	let paciente = null
	try {
		paciente = await Paciente.find({ hcn })
			.populate('usuario', {userName: 1})
	} catch (err) { return next(err) }

	res.json(paciente)
})

router.get('/:id', async (req, res, next) => {
	const { id } = req.params
	if (!id) return next({ name: 'MISSING_DATA' })

	/*--- TOKEN AND DISABLED VALIDATION ---*/
	const { authorization } = req.headers
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

	console.log(decodeToken)

	if (!decodeToken || !decodeToken.id) return next({ name: 'INVALID_TOKEN' })

	let user = null
	try {
		user = await User.findById(decodeToken.id)
	} catch (err) {
		return next(err)
	}
	if (!user || user.disable) return next({ name: 'INVALID_USER' })
	/*--- END ---*/

	let paciente = null
	try {
		paciente = await Paciente.findById(id)
			.populate('usuario', {userName: 1})
	} catch (err) { return next(err) }

	res.json(paciente)
})

router.post('/', async (req, res, next) => {
	const { hcn,
		referencia,
		fechaDeIngreso,
		ubicacion,
		fechaDeRecibo,
		patologia } = req.body

	/*--- TOKEN AND DISABLED VALIDATION ---*/
	const { authorization } = req.headers
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

	let user = null
	try {
		user = await User.findById(decodeToken.id)
	} catch (err) {
		return next(err)
	}
	if (!user || user.disable) return next({ name: 'INVALID_USER' })
	/*--- END ---*/

	if (!hcn ||
        !referencia ||
        !fechaDeIngreso ||
        !ubicacion ||
        !fechaDeRecibo ||
        !patologia) return next({ name: 'MISSING_DATA' })

	const fechaDeProceso = new Date()

	const paciente = new Paciente({
		hcn,
		referencia,
		fechaDeIngreso,
		ubicacion,
		fechaDeRecibo,
		fechaDeProceso,
		patologia,
		usuario: user._id
	})

	try {
		await paciente.save()
		res.json({message: 'registro creado de manera exitosa'})
	} catch (err) {
		next(err)
	}
})

router.put('/:id', async(req,res,next)=>{
	const { hcn,
		referencia,
		fechaDeIngreso,
		ubicacion,
		fechaDeRecibo,
		patologia } = req.body

	const {id} = req.params

	/*--- TOKEN AND DISABLED VALIDATION ---*/
	const { authorization } = req.headers
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

	console.log(decodeToken)

	if (!decodeToken || !decodeToken.id) return next({ name: 'INVALID_TOKEN' })

	let user = null
	try {
		user = await User.findById(decodeToken.id)
	} catch (err) {
		return next(err)
	}
	if (!user || user.disable) return next({ name: 'INVALID_USER' })
	/*--- END ---*/

	if (
		!id ||
		hcn == ''||
    referencia == ''  ||
    fechaDeIngreso == '' ||
    ubicacion == '' ||
    fechaDeRecibo == '' ||
    patologia == ''
	) return next({ name: 'MISSING_DATA' })

	let paciente = null
	try{
		paciente = await Paciente.findById(id)
	}catch(err){
		return next(err)
	}
	if (!paciente) return next({name: 'INVALID_ID'})

	Object.assign(paciente,req.body)

	try{
		await paciente.save()
		res.json({message: 'registro actualizado de manera exitosa'})
	}catch(err){
		next(err)
	}

})

router.delete('/:id', async (req, res, next) => {
	const { id } = req.params
	if (!id) return next({ name: 'ID_LOST' })

	/*--- TOKEN AND DISABLED VALIDATION ---*/
	const { authorization } = req.headers
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

	let user = null
	try {
		user = await User.findById(decodeToken.id)
	} catch (err) {
		return next(err)
	}
	if (!user || user.disable) return next({ name: 'INVALID_USER' })
	/*--- END ---*/

	let paciente = null
	try {
		paciente = await Paciente.findById(id)
	} catch (err) {
		return next(err)
	}
	if (!paciente) return next({ name: 'INVALID_ID' })

	try {
		await Paciente.findByIdAndDelete(id)
		res.json({ message: 'registro eliminado' })
	} catch (err) {
		next(err)
	}
})

module.exports = router