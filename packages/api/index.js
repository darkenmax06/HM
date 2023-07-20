require("dotenv").config()
require("./db")
const express = require('express')
const cors = require("cors")
const errorHandler = require("./errorHandler")

/*--- imported Routes ---*/
const usersRoutes = require("./routes/user.routes")
const loginRoute = require("./routes/login.routes")
const pacientesRoutes = require('./routes/pacientes.routes')
const adminRoutes = require('./routes/admin.routes')
const deleteAll = require('./routes/deleteAll.route')

/*-- config ---*/
const app = express()

app.use(cors())
app.use(express.json())

/*--- Routes ---*/
app.use('/api/users', usersRoutes)
app.use('/api/login', loginRoute)
app.use("/api/pacientes", pacientesRoutes)
app.use("/api/admin", adminRoutes)
app.delete("/api/deleteAll", deleteAll)
app.use("/*", (req, res) => res.json({ message: "recurso no encontrado" }))
app.use(errorHandler)

/*--- server ---*/

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log("sserver on port ", port))

module.exports = {
    app,
    server
}