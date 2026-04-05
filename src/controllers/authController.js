const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User,Role } = require('../models');

//JWT-token based auth.
//require('crypto').randomBytes(32).toString('hex');
const JWT_SECRET = process.env.JWT_SECRET 

const login = async(req,res,next) => {
    try {
        const { email , password } = req.body;
        if(!email || !password){
            //Bad request 400
            return res.json(400).json({
                message: "Email and password are required."
            });
        }

        const user = await User.findOne({
            where: {
                email: email
            },
            include: {
                model: Role,
                as: 'role'
            }
        });

        if(!user){
            //Unauthorized access 401
            return res.status(401).json({
                message: "Invalid credentials."
            })
        }

        const match = bcrypt.compare(password,user.passwordHash);
        if(!match){
            return res.json(401).json({
                message: "Invalid credentials"
            })
        }

        if(user.status !== "active"){
            return res.status(403).json({
                message: "User is inactive."
            });
        }

        const payload = {userId: user.id, role: user.role.name};
        console.log(payload);
        //Generate a JWT-session token.
        const token = jwt.sign(payload,JWT_SECRET,{expiresIn: '2h'});
        
        //On successful login, return the token 
        //as well as the user details as JSON.
        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                role: user.role.name
            }
        });

    } catch (error) {
        next(error);
    }
}

module.exports = login;