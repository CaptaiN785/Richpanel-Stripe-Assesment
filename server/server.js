const express = require("express")
require("dotenv").config();
const cors = require("cors");
const { connectDB } = require("./config/database");
const uuid = require("uuid").v4;

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const PORT = process.env.PORT || 4321;


const app = express();


app.use(express.json())
app.use(cors())

// Initialize database
connectDB();

app.listen(PORT ,()=> {
    console.log("Server started at port: " + PORT);
})

app.get("/", async(req, res) => {
    res.send("Welcome to richpanel backed API " + uuid());
})

