const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/test',(req,res) => {
    return res.json({
        message: "Test success"
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});