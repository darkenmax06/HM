const router = require("express").Router()
const Paciente = require('../models/Paciente')


router.get("/", async (req, res, next) => {
    const pacientes = await Paciente.find()
    res.json(pacientes)
})

router.get("/:hcn", async (req, res, next) => {
    const { hcn } = req.params
    if (hcn === null || hcn === undefined) return next({ name: "MISSING_DATA" })

    let paciente = null
    try {
        paciente = await Paciente.findOne({ hcn })
    } catch (err) { return next(err) }
    if (!hcn) return next({ name: "INVALID_HCN" })

    res.json(paciente)
})

router.post("/", async (req, res, next) => {
    const { hcn,
        referencia,
        fechaDeIngreso,
        ubicacion,
        fechaDeRecibo,
        fechaDeProceso,
        patologia,
        usuario } = req.body

    if (!hcn ||
        !referencia ||
        !fechaDeIngreso ||
        !ubicacion ||
        !fechaDeRecibo ||
        !fechaDeProceso ||
        !patologia ||
        !usuario) return next({ name: 'MISSING_DATA' })

    const paciente = new Paciente({
        hcn,
        referencia,
        fechaDeIngreso,
        ubicacion,
        fechaDeRecibo,
        fechaDeProceso,
        patologia,
        usuario
    })

    try {
        const savedPaciente = await paciente.save()
        res.json(savedPaciente)
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params
    if (!id) return next({ name: "ID_LOST" })

    let paciente = null
    try {
        paciente = await Paciente.findById(id)
    } catch (err) {
        return next(err)
    }
    if (!paciente) return next({ name: "INVALID_ID" })

    try {
        await Paciente.findByIdAndDelete(id)
        res.json({ message: "registro eliminado" })
    } catch (err) {
        next(err)
    }
})

module.exports = router