const express = require("express");

const router = express.Router();

router.get("/test",(req,res) => {
    return res.json({
        message: "Test Success"
    })
});

module.exports = router; 