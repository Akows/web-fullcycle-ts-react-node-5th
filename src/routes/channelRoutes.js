const express = require('express');
const router = express.Router();

const { createChannel, updateChannel, deleteChannel, getChannelsData, getChannelData } = require('../handlers/channelHandlers');

router.get('/get/', getChannelsData);
router.get('/get/:id', getChannelData);
router.post('/create', createChannel);
router.put('/update/:id', updateChannel);
router.post('/delete/:id', deleteChannel);

module.exports = router;
