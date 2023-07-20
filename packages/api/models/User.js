const { Schema, model, SchemaType } = require('mongoose')

const schema = new Schema({
    name: String,
    lastName: String,
    createAt: Date,
    password: String,
    userName: String,
    type: String,
    disable: Boolean
})

schema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

module.exports = model("User", schema)