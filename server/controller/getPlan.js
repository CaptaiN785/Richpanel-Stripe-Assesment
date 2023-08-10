const Plan = require("../models/plans")

exports.getPlan = async(req, res) => {
    
    try{

        const plans = await Plan.find();
        // console.log(plans)
        console.log("Calling get plans")
        if(!plans){
            return res.status(404).json({
                success:false,
                message: "Unable to get plans",
            })
        }

        res.status(200).json({
            success:true,
            message: "Plans has been fetched",
            data: plans
        })
    
    }catch(err){
        console.log("Error while fetching the plan!", err);
        res.status(500).json({
            success:false,
            message: "Internal server error!"
        })
    }
}