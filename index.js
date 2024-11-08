const { startServer } = require('./server');
const router = require('./routes');
const { handle } = require('./requestHandler'); 

const mariadb = require('./database/connect/mariadb');
mariadb.connect();

startServer(3000, router.route, handle);
