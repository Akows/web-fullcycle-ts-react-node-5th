const express = require('express');
const router = express.Router();

const memberRoutes = require('./memberRoutes');
const channelRoutes = require('./channelRoutes');
const { getFruits, getFruit } = require('../handlers/fruitHandlers');

router.get('/', (req, res) => {
    console.log('서버가 정상적으로 가동되었습니다.');
    res.send('환영합니다.');
});

// Fruits 관련 라우트
router.get('/getfruits', getFruits);
router.get('/getfruit/:id', getFruit);

// Member 및 Channel 라우트
router.use('/member', memberRoutes);
router.use('/channel', channelRoutes);

module.exports = router;
