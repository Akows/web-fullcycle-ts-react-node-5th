const express = require('express');
const router = express.Router();

const { createChannel, updateChannel, deleteChannel, getChannelsData, getChannelData } = require('../handlers/channelHandlers');
const { validateChannelId, validateUpdateChannel, validateCreateChannel } = require('../middleware/validation');

router.get('/get', getChannelsData);
router.get('/get/:id', validateChannelId, getChannelData);
router.post('/create', validateCreateChannel, createChannel);
router.put('/update/:id', validateUpdateChannel, updateChannel);
router.put('/delete/:id', validateChannelId, deleteChannel);

module.exports = router;
