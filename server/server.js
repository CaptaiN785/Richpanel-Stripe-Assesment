const express = require("express")
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./config/database");
const uuid = require("uuid").v4;
const cookieParser = require("cookie-parser")

// importing user routes
const userRoute = require("./routes/user")
const planRoute = require("./routes/plan")

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const PORT = process.env.PORT || 4321;
const app = express();


app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/user", userRoute)
app.use("/plan", planRoute)

// Initialize database
connectDB();

app.listen(PORT ,()=> {
    console.log("Server started at port: " + PORT);
})

app.get("/", async(req, res) => {
    res.send("<h1>Welcome to richpanel assessment API page.</h1>")
})

