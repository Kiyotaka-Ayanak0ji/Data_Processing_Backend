const express = require('express');
require('dotenv').config();
const { connect } = require('./connectDB.js');
const router = require('./src/routes/userRoutes.js')

//App
const app = express();

//Port
const PORT = process.env.PORT || 5000;

//API Routes..
app.use("/user",router);

//DB Connection
connect();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
