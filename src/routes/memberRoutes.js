const express = require('express');
const router = express.Router();

const { createMember, getAllMembers, getMemberData, deleteMember, loginMember } = require('../handlers/memberHandlers');
const { validateLoginRequest, validateCreateMember, validateGetMemberData, validateDeleteMember, authenticateToken } = require('../middleware/validation');

router.post('/login', validateLoginRequest, loginMember);
router.post('/create', validateCreateMember, createMember);
router.get('/data', authenticateToken, getAllMembers);
router.get('/data/:id', authenticateToken, validateGetMemberData, getMemberData);
router.delete('/delete/:id', authenticateToken, validateDeleteMember, deleteMember);

module.exports = router;
