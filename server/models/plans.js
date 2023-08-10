const mongoose = require("mongoose")

const Plan = new mongoose.Schema({
    billing:{
       type:String,
       require:true 
    }, 
    type:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    quality:{
        type:String,
        requier:true
    },
    resolution:{
        type:String,
        required:true,
    },
    devices:[{
        type:String
    }]
})

module.exports = mongoose.model("Plan", Plan);
