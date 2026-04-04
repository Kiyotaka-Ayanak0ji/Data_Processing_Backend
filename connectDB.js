const sequelize = require('sequelize');

//Username, password and database name.
const database = process.env.database;
const username = process.env.username;
const password = process.env.password;

//Set up a sequelize client.
const sequelize = new sequelize.Sequelize(database,username,password, {
    host: 'postgres',
    dialect: 'postgres'
});

//Connect and display errors(if any)..
const connect = async() => {
    try {
        sequelize.authenticate();
        console.log("Connection has been established successfully.")
    } catch (error) {
        console.error("Unable to connect to the database.", error);
        process.exit(1);
    }
}

module.exports = {connect,sequelize};