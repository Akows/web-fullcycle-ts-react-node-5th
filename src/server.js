const express = require('express');
const app = express();
const { api_test_01 } = require('./api-test-01');
const { api_test_02 } = require('./api-test-02');
const { api_test_03, api_test_03_1 } = require('./api-test-03');
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/test1/:channelName', api_test_01);

app.use('/test2/:id?', api_test_02);

app.post('/test3', api_test_03);
app.get('/test3_1', api_test_03_1);


app.listen(3000, () => {
  console.log(`서버가 ${PORT} 포트에서 정상 동작 중입니다.`);
});