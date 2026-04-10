const express = require('express');
const { connect } = require('./connectDB');
const userRouter = require('./src/routes/userRoutes');
const recordRouter = require('./src/routes/recordRoutes');
require('dotenv').config();

//Connect to a database
connect();

//App
const app = express();

app.use(express.json());

//Port
const PORT = process.env.PORT || 5000;

app.use('/users',userRouter);
app.use('/records',recordRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
