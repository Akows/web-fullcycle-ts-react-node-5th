const express = require('express');
const router = express.Router();

const { createChannel, updateChannel, deleteChannel } = require('../handlers/channelHandlers');

router.post('/create', createChannel);
router.post('/update/:id', updateChannel);
router.post('/delete/:id', deleteChannel);

module.exports = router;
