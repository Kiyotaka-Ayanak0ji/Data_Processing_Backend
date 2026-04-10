const express = require("express");
const { createUser, listUsers, updateStatus, updateRole, deleteUser } = require("../controllers/userController");
const authenticate = require("../middleware/auth");
const login = require("../controllers/authController");
const authorizeRoles = require("../middleware/authRole");
const userRouter = express.Router();

//Routes:
// login (any user)
// listusers (admin only)
// updateStatus ( admin only )
// updateRole ( admin only )

userRouter.post('/signin',login);
userRouter.post('/signup',createUser);

// Workflow:  Authentication -> Authorization -> Response.
userRouter.get('/',authenticate,authorizeRoles("admin"),listUsers);
userRouter.delete('/:id',authenticate,authorizeRoles("admin"),deleteUser);

//Update status and update role..
userRouter.patch('/status/:id',authenticate,authorizeRoles("admin"),updateStatus);
userRouter.patch('/role/:id',authenticate,authorizeRoles("admin"),updateRole);

module.exports = userRouter; 