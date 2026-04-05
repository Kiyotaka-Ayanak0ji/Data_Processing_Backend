const authorizeRoles = (...allowedRoles) => (req,res,next) => {
    if(!req.user){
        //Unauthorized 401.
        return res.status(401).json({
            message: "Unauthorized."
        })
    }

    if(!allowedRoles.includes(req.user.role.name)){
        //Access denied 403.
        return res.status(403).json({
            message: "Forbidden: Insufficient privileges!"
        });
    }
}