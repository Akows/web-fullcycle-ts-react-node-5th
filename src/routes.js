const express = require('express');
const router = express.Router();

const { getFruits, getFruit } = require('./fruitHandlers');

router.get('/', (req, res) => {
    console.log('서버가 정상적으로 가동되었습니다.');
    res.send('환영합니다.');
});

router.get("/getfruits", getFruits);
router.get('/getfruit/:id', getFruit);

module.exports = router;
