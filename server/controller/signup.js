
const User = require("../models/user")
const bcrypt = require("bcrypt")

exports.signup = async(req, res) => {

    try{
    
        const {name, email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const prevUser = await User.findOne({email})

        if(prevUser){
            return res.status(400).json({
                success:false,
                message: "User already exists"
            })
        }

        const response = await User.create({
            name, email, password: hashedPassword
        })

        if(!response){
            return res.status(400).json({
                success:false,
                message: "Unable to signup"
            })
        }
        // removing the password
        response.password = undefined;
        
        res.status(200).json({
            success:true,
            data: response,
            message: "User registerd successfully"
        })
    }catch(err){
        console.log("Error while signup: " + err);
        res.status(500).json({
            success:false,
            message: "Internal server error"
        })
    }

}