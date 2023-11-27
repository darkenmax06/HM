const router = require('express').Router()
const Paciente = require('../models/Paciente')
const { validateUser } = require('../middlewares/tokenValidate')
const { addCompare } = require('../utils/addCompare')
const { compare } = require('../utils/compare')


router.get('/', validateUser, async (req, res, next) => {
	const { hcn } = req.query
	if (!hcn) return next({ name: 'MISSING_DATA' })

	let paciente = null
	try {
		paciente = await Paciente.find({ hcn })
			.populate('usuario', {userName: 1})
	} catch (err) { return next(err) }

	res.json(paciente)
})

router.get('/:id', validateUser, async (req, res, next) => {
	const { id } = req.params
	if (!id) return next({ name: 'MISSING_DATA' })

	let paciente = null
	try {
		paciente = await Paciente.findById(id)
			.populate('usuario', {userName: 1})
	} catch (err) { return next(err) }

	res.json(paciente)
})

router.post('/', validateUser,async (req, res, next) => {
	const { hcn,
		referencia,
		fechaDeIngreso,
		ubicacion,
		fechaDeRecibo,
		patologia } = req.body

	const {user} = req

	if (!hcn || !fechaDeIngreso || !ubicacion ) return next({ name: 'MISSING_DATA' })

	const fechaDeProceso = new Date()
	const fDR = fechaDeRecibo || new Date()
	console.log(fDR)

	const paciente = new Paciente({
		hcn,
		referencia,
		fechaDeIngreso,
		ubicacion,
		fechaDeRecibo: fDR,
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

router.post('/some', validateUser,async (req, res, next) => {
	const data = req.body
	const {user} = req
	if (!data || data.length == null) return next({name: "INVALID_DATA"})

	// Validando la data
	for (let i = 0; i < data.length; i++){
		const {hcn,fechaDeIngreso, ubicacion} = data[i]
		if (!hcn || !fechaDeIngreso || !ubicacion ) return next({ name: 'MISSING_DATA' })
	}

	try{
		await compare(data)
	}catch(err){
		return next(err)
	}

	const fechaDeProceso = new Date()

	for (let i = 0; i < data.length; i++){
		const {
			hcn,
			referencia,
			fechaDeIngreso,
			ubicacion,
			fechaDeRecibo,
			patologia,
		} = data[i]

		const fDR = fechaDeRecibo || new Date()

		const paciente = new Paciente({
			hcn,
			referencia,
			fechaDeIngreso,
			ubicacion,
			fechaDeRecibo: fDR,
			fechaDeProceso,
			patologia,
			usuario: user._id
		})
					
		try {
			await paciente.save()
		} catch (err) {
			next(err)
		}
	}

	try{
		await addCompare(data)
		res.json({message: 'registro creado de manera exitosa'})
	}catch(err){
		next(err)
	}
})

router.put('/:id', validateUser ,async(req,res,next)=>{
	const { hcn,
		referencia,
		fechaDeIngreso,
		ubicacion,
		fechaDeRecibo,
		patologia } = req.body

	const {id} = req.params

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

router.delete('/:id', validateUser, async (req, res, next) => {
	const { id } = req.params
	if (!id) return next({ name: 'ID_LOST' })

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