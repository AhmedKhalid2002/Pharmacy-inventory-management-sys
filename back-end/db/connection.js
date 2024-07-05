import mysql from 'mysql2';
let connection = mysql.createConnection(
    {
        user:"root",
        password:"",
        host:"localhost",
        database:"phramacy_inventory",
    }
)
export default connection;
