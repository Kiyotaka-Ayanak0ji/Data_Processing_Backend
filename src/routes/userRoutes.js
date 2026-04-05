const express = require("express");
const { login } = require("../controllers/userController");
const router = express.Router();

//Routes:
// login
// listusers
// updateStatus ( admin only )
// updateRole ( admin only )

router.post('/user',login);

module.exports = router; 