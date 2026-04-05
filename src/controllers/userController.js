const { User, Role } = require('../models');
const bcrypt = require('bcrypt');

const login = async (req,res,next) => {
    try{
        const {name,email,password,roleName} = req.body;
        
        //Check if name, email, password and roleName exist.
        if(!name || !email || !password || !roleName){
            return res.status(400).json({
                message: "name, password, email and roleName are required."
            });
        }

        const role = await Role.findOne({
            where: {
                name: roleName
            }
        });
        if(!role){
            return res.status(400).json({
                message: "Invalid Role."
            })
        }
        const existing = await User.findOne({
            where: {
                email
            }
        });
        if(existing){
            return res.status(409).json({
                message: "User with provided email already exists."
            });
        }

        //Encrypt the password.
        const passwordHash = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            passwordHash,
            roleId: role.id
        });
        //Resource created 201
        return res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: role.name
        })
    }catch(error){
        next(err);
    }
}

const listUsers = async (req, res, next) => {
  try {
    //Fetch all the users.
    const users = await User.findAll({
         include: { 
            model: Role, 
            as: 'role', 
            attributes: ['name'] 
        } 
    });
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['active', 'inactive'].includes(status)) {
        return res.status(400).json({ 
            message: 'Invalid status.' 
        });
    }
    //Find the user and update the status.
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).json({ 
            message: 'User not found.' 
        });
    }
    //Update the status and save.
    user.status = status;
    await user.save();
    return res.json({ 
        id: user.id, 
        status: user.status 
    });

  } catch (err) {
    next(err);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const { roleName } = req.body;
    const role = await Role.findOne({ 
        where: { 
            name: roleName
        } 
    });
    if (!["viewer","analyst","admin"].includes(roleName)) {
        return res.status(400).json({ 
            message: 'Invalid role.' 
        });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).json({ 
            message: 'User not found.' 
        });
    }
    //Set users foreign key.
    user.roleId = role.id;
    await user.save();
    return res.json({ 
        id: user.id, role: role.name 
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {createUser,listUsers,updateStatus,updateRole};