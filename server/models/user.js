const mongoose = require("mongoose")

const User = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true
    },
    planstatus:{
        type: Boolean,
        default:false
    },
    plan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Plan",
        default: null
    },
    startedon:{
        type:String,
        default:null
    },
    expireson:{
        type:String,
        default:null
    }
})

module.exports = mongoose.model("User", User);