
const express = require("express")
const planRoute = express.Router()

const {subscribePlan} = require("../controller/subscribePlan")
const {cancelPlan} = require("../controller/cancelPlan")
const {getPlan} = require("../controller/getPlan")
const {auth} = require("../middleware/auth")

planRoute.get("/", getPlan)
planRoute.post("/subscribe", subscribePlan)
planRoute.post("/cancel", cancelPlan)

module.exports = planRoute;
