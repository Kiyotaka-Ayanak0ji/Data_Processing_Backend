const jwt = require('jsonwebtoken');

const authenticate = async (req,res,next) => {
    //Fetch the auth header.
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        //Unauthorized access 401.
        return res.status(401).json({
            message: "Missing or invalid authorization header"
        });
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        //Verification successful
        req.user = decoded; // { userId,role }
        return next();
    }catch(error){
        console.log(error.message);
        //Unauthorized access
        return res.status(401).json({
            message: "Invalid or expired token."
        })
    }
};

module.exports = authenticate;