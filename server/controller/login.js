const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.login = async(req, res) => {

    try{

        const {email, password} = req.body;
        const user = await User.findOne({email}).populate("plan")

        if(!user){
            return res.status(200).json({
                success:false,
                message: "Invalid email or password"
            })
        }

        const result = await bcrypt.compare(password, user.password);

        if(!result){
            return res.status(200).json({
                success:false,
                message:"Invalid email or password"
            })
        }

        user.password = undefined;
        const payload = {
            id: user._id,
            email: user.email,
            plan: user.plan,
            name: user.name
        }
        // cookie and secret will expire in 2hour
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"2h"});
        const options = {
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
            httpOnly:true
        }
        user.token = token;
        res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            user,
            message:"User Logged in successfully!"
        })
    }catch(err){
        console.log("Error while loggin in: ", err)
        res.status(500).json({
            success:false,
            message: "Internal server error."
        })
    }

}