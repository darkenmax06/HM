require('dotenv').config()
require('./db')
require('./utils/dropCompare')
const express = require('express')
const cors = require('cors')
const errorHandler = require('./errorHandler')
const path = require('path')

/*--- imported Routes ---*/
const usersRoutes = require('./routes/user.routes')
const loginRoute = require('./routes/login.routes')
const pacientesRoutes = require('./routes/pacientes.routes')
const adminRoutes = require('./routes/admin.routes')
const deleteAll = require('./routes/deleteAll.route')



/*-- config ---*/
const app = express()
app.locals.baseName = "10.10.3.182"

app.use(cors())
app.use(express.json())

/*--- Routes ---*/
app.use(express.static(path.join(__dirname, '../app/dist')))

app.use('/api/public', express.static(path.join(__dirname, './public')))
app.use('/api/users', usersRoutes)
app.use('/api/login', loginRoute)
app.use('/api/pacientes', pacientesRoutes)
app.use('/api/admin', adminRoutes)
app.delete('/api/deleteAll', deleteAll)
app.use(errorHandler)

app.use('*', (_,res)=>{
	res.sendFile(path.join(__dirname, '../app/dist', 'index.html'))
})

/*--- server ---*/

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log('server on port ', port))

module.exports = {
	app,
	server
}