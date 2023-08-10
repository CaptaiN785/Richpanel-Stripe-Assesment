
const User = require("../models/user")

exports.cancelPlan = async(req, res) => {

    try{
        
        const {id} = req.body;

        const user = await User.findByIdAndUpdate(
            {_id: id},
            {planstatus:false},
            {new: true}
        ).populate("plan")

        user.password = undefined;

        if(user){
            res.status(200).json({
                succes:true,
                user:user,
                message:"Plan is calcelled"
            })
        }else{
            res.status(400).json({
                succes:false,
                message: "User not defined"
            })
        }
    
    }catch(err){
        console.log("Error while cancelling plan: ", err);
        res.status(500).json({
            success:false,
            message: "Internal server error."
        })
    }
}