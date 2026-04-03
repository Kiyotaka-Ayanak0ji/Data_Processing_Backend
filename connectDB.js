const mysql = require("mysql");

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME
});

const connect = () => {
    connection.connect((error) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT
        });
        console.log("Database Connected");
    })
}

module.exports = {connection,connect};