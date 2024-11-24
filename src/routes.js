const express = require('express');
const router = express.Router();

const { getFruits, getFruit } = require('./handlers/fruitHandlers');
const { createMember, getMemberData, deleteMember, loginMember } = require('./handlers/authHandlers');
const { createChannel, updateChannel, deleteChannel } = require('./handlers/ChannelHandlers');

router.get('/', (req, res) => {
    console.log('서버가 정상적으로 가동되었습니다.');
    res.send('환영합니다.');
});

router.get('/getfruits', getFruits);
router.get('/getfruit/:id', getFruit);

router.post('/loginmember', loginMember);
router.post('/createmember', createMember);
router.get('/getmemberdata/:id', getMemberData);
router.post('/deletemember/:id', deleteMember);

router.post('/createchannel', createChannel);
router.post('/updatechannel/:id', updateChannel);
router.post('/deletechannel/:id', deleteChannel);

module.exports = router;
