const express = require('express');
const app = express();

const routes = require('./src/routes');

app.use(express.json());

app.use('/', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 정상 동작 중입니다.`);
});