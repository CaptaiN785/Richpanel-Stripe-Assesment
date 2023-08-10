const jwt = require("jsonwebtoken")

exports.auth = (req, res, next) => {

    try{

        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ");

        if(!token || token === undefined){
            return res.status(400).json({
                success:false,
                message:"Token not found!"
            })
        }

        // verfiy the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        } catch (err ){
            return res.status(400).json({
                success:false,
                message: "Unbale to decode token"
            })
        }
        next();
    } catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }

}