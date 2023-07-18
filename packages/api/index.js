require("dotenv").config()
require("./db")
const express = require('express')
const cors = require("cors")

/*-- config ---*/
const app = express()

app.use(cors())
app.use(express.json())

/*--- Routes ---*/
app.get("/", (req,res)=>{
    res.json({message: "hola mundo"})
})

/*--- server ---*/
const port = process.env.PORT || 3000

app.listen(port,()=> console.log("sserver on port ", port))