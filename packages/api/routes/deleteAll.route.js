const User = require("../models/User")
const Paciente = require("../models/Paciente")


const deleteAll = async (req, res, next) => {
    if (process.env.NODE_ENV !== "development") {
        return res.json({ message: "ruta solo valida en modo de desarrollo" })
    }

    try {
        await Paciente.deleteMany()
        await User.deleteMany()
        res.json({ message: "datos eliminados" })
    } catch (err) {
        res.status(400).json(err)
    }
}

module.exports = deleteAll