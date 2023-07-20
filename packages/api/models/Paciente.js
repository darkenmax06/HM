const { Schema, model } = require('mongoose')

const schema = new Schema({
    hcn: String,
    referencia: String,
    fechaDeIngreso: Date,
    ubicacion: String,
    fechaDeRecibo: Date,
    fechaDeProceso: Date,
    patologia: String,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
})

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = model("Paciente", schema)