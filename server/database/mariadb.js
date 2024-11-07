const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost', 
    user: 'root', 
    password: 'password', 
    database: 'your_database',
    connectionLimit: 5
});

module.exports = pool;
