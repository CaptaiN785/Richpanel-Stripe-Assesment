
const User = require("../models/user")
const Plan = require("../models/plans")
require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.subscribePlan = async(req, res) => {

    try{
        
        const {id, plan, userid} = req.body;

        // console.log(id, plan, userid);

        const planDetail = await Plan.findById(plan);

        if(planDetail.billing === "Yearly"){
            var expiry = new Date();
                expiry.setFullYear(
                    expiry.getFullYear()+1, 
                    expiry.getMonth(), 
                    expiry.getDate() + 1)
                expiry = expiry.toDateString();
        }else{
            var expiry = new Date();
                expiry.setFullYear(
                    expiry.getFullYear(), 
                    expiry.getMonth() + 1, 
                    expiry.getDate() + 1)
                expiry = expiry.toDateString();
        }

        const payment = await stripe.paymentIntents.create({
            amount: planDetail.price * 100,
            currency: "INR",
            description: planDetail.billing + " " + planDetail.type,
            payment_method: id,
            confirm: true
        });

        // console.log(payment);

        if(!payment){
            return res.status(401).json({
                succes:false,
                message: "Payment failed"
            })
        }

        const user = await User.findByIdAndUpdate(
            {_id: userid},
            {   plan: planDetail._id, 
                planstatus:true,
                startedon: new Date().toDateString(),
                expireson: expiry
            },
            {new: true}
        ).populate("plan")

        user.password = undefined;

        if(user){
            res.status(200).json({
                succes:true,
                user:user,
                message:"Plan is subscribed"
            })
        }else{
            res.status(400).json({
                succes:false,
                message: "User not defined"
            })
        }
    
    }catch(err){
        console.log("Error while subscribing plan: ", err);
        res.status(500).json({
            success:false,
            message: "Internal server error."
        })
    }
}