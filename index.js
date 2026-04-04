const express = require('express');
const { connect } = require('./connectDB');

require('dotenv').config();
//Connect to a database
connect();

//App
const app = express();

//Port
const PORT = process.env.PORT || 5000;

app.get("/test",(req,res) => {
    return res.json({
        message: "Test Success"
    })
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
