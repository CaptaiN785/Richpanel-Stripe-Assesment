
require("dotenv").config()
const mongoose = require("mongoose")

exports.connectDB = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database connected!!")
    })
    .catch(err => {
        console.log("Unable to connect to database: ", err);
    })
}
