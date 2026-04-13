require('dotenv').config();
const Sequelize = require('sequelize');

//Username, password and database name.
const database = process.env.DATABASE;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

//Set up a sequelize client.
const sequelize = new Sequelize(database,username,password, {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log
});

//Connect and display errors(if any)..
const connect = async() => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.")
    } catch (error) {
        console.error("Unable to connect to the database.", error);
        process.exit(1);
    }
}

module.exports = {connect,sequelize};