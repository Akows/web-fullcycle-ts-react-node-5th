const express = require('express');
const app = express();

const { serverStart } = require('./src/routes');

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 정상 동작 중입니다.`);
});

app.use('/', serverStart);