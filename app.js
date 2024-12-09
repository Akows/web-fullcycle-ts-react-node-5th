const express = require('express');
const app = express();
const dotenv = require('dotenv');

// 라우터 파일 호출
const booksRouter = require('./src/routes/books');
const usersRouter = require('./src/routes/users');
const cartRouter = require('./src/routes/cart');
const ordersRouter = require('./src/routes/orders');
const mainRouter = require('./src/routes/main');
const authRouter = require('./src/routes/auth');

// dotenv 모듈 설정
dotenv.config();

// 미들웨어 설정
app.use(express.json());

// 라우터 설정
app.use('/books', booksRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter);
app.use('/main', mainRouter);
app.use('/auth', authRouter);

// 포트 설정
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`서버가 ${PORT} 포트에서 정상 동작 중입니다.`);
});