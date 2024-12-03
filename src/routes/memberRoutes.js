const express = require('express');
const router = express.Router();

const { createMember, getAllMembers, getMemberData, deleteMember, loginMember } = require('../handlers/memberHandlers');
const { validateLoginRequest, validateCreateMember, validateGetMemberData, validateDeleteMember } = require('../middleware/validation');

router.post('/login', validateLoginRequest, loginMember);
router.post('/create', validateCreateMember, createMember);
router.get('/data', getAllMembers);
router.get('/data/:id', validateGetMemberData, getMemberData);
router.delete('/delete/:id', validateDeleteMember, deleteMember);

module.exports = router;
