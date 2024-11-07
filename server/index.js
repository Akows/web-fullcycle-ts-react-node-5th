const { startServer } = require('./server');
const router = require('./routes/routes');
const { handle } = require('./requestHandler/requestHandler'); 

startServer(3000, router.route, handle);
