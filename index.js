const express = require('express');
const { connect } = require('./connectDB');
const router = require('./src/routes/userRoutes');

require('dotenv').config();

//Connect to a database
connect();

//App
const app = express();

app.use(express.json());

//Port
const PORT = process.env.PORT || 5000;

app.use('/users',router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
