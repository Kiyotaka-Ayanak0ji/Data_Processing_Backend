const express = require("express");

const router = express.Router();

router.get("/signin",(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
});

module.exports = router; 