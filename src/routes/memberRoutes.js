const express = require('express');
const router = express.Router();

const { createMember, getMemberData, deleteMember, loginMember } = require('../handlers/memberHandlers');

router.post('/login', loginMember);
router.post('/create', createMember);
router.get('/data/:id', getMemberData);
router.post('/delete/:id', deleteMember);

module.exports = router;
