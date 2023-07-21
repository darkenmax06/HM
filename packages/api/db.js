const mongoose = require("mongoose")

const { NODE_ENV, PRODUCTION, DEVELOPMENT } = process.env

const uri = NODE_ENV === "development"
    ? DEVELOPMENT
    : PRODUCTION

mongoose.connect(uri, {
    useUnifiedTopology: true, // For Mongoose 5 only. Remove for Mongoose 6+
    serverSelectionTimeoutMS: 1000, // Defaults to 30000 (30 seconds)
})
    .then(res => console.log("database connected"))
    .catch(err => console.log(err))