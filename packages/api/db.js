const mongoose = require("mongoose")

const {NODE_ENV,PRODUCTION,DEVELOPMENT} = process.env

const uri = NODE_ENV=== "development"
? DEVELOPMENT
: PRODUCTION

mongoose.connect(uri)
.then(res => console.log("database connected"))
.catch(err => console.log(err))