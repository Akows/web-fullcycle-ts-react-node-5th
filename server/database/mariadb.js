const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: '127.0.0.1',  // Docker MariaDB의 IP 주소
    port: 3307,         // Docker MariaDB의 포트 번호
    user: 'root',       // MariaDB 사용자 이름
    password: 'root',   // MariaDB 비밀번호
    database: 'tennis',  // 사용할 데이터베이스 이름 (스키마 이름)
    connectionLimit: 5
});

module.exports = pool;
