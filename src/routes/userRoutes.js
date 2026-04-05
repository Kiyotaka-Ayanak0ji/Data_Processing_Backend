const express = require("express");
const { createUser, listUsers, updateStatus, updateRole } = require("../controllers/userController");
const authenticate = require("../middleware/auth");
const login = require("../controllers/authController");
const authorizeRoles = require("../middleware/authRole");
const router = express.Router();

//Routes:
// login (any user)
// listusers (admin only)
// updateStatus ( admin only )
// updateRole ( admin only )

router.post('/signin',login);
router.post('/signup',createUser);

// Workflow:  Authentication -> Authorization -> Response.
router.get('/list',authenticate,authorizeRoles("admin"),listUsers);
router.patch('/status',authenticate,authorizeRoles("admin"),updateStatus);
router.patch('/role',authenticate,authorizeRoles("admin"),updateRole);

module.exports = router; 