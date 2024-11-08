const mariadb = require('mysql');

const conn = mariadb.createConnection({
    host: '127.0.0.1',    // 데이터베이스 서버 주소 (Docker의 경우 로컬 호스트)
    port: 3307,           // 데이터베이스 포트 번호 (Docker의 경우 설정한 포트)
    user: 'root',         // 데이터베이스 사용자 이름
    password: 'root',     // 데이터베이스 비밀번호
    database: 'tennis'    // 사용할 데이터베이스 이름 (스키마 이름)
});

module.exports = conn;

// const mariadb = require('mariadb');

// mariadb 모듈 사용시 코드
// const pool = mariadb.createPool({
//     host: '127.0.0.1',  // Docker MariaDB의 IP 주소
//     port: 3307,         // Docker MariaDB의 포트 번호
//     user: 'root',       // MariaDB 사용자 이름
//     password: 'root',   // MariaDB 비밀번호
//     database: 'tennis',  // 사용할 데이터베이스 이름 (스키마 이름)
//     connectionLimit: 5
// });

// module.exports = pool;
