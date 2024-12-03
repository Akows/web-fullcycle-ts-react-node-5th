const { body, param, validationResult } = require('express-validator');

// 로그인 요청 유효성 검사 미들웨어
const validateLoginRequest = [
    body('name')
      .notEmpty()
      .withMessage('이름을 입력해주세요.')
      .isString()
      .withMessage('이름은 문자열이어야 합니다.'),
    body('password')
      .notEmpty()
      .withMessage('비밀번호를 입력해주세요.')
      .isString()
      .withMessage('비밀번호는 문자열이어야 합니다.'),
    (req, res, next) => {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      next();
    },
];

// 회원가입 요청 유효성 검사
const validateCreateMember = [
    body('email')
      .isEmail()
      .withMessage('유효한 이메일 주소를 입력해주세요.')
      .notEmpty()
      .withMessage('이메일을 입력해주세요.'),
    body('name')
      .isString()
      .withMessage('이름은 문자열이어야 합니다.')
      .notEmpty()
      .withMessage('이름을 입력해주세요.'),
    body('password')
      .isString()
      .withMessage('비밀번호는 문자열이어야 합니다.')
      .isLength({ min: 6 })
      .withMessage('비밀번호는 최소 6자 이상이어야 합니다.')
      .notEmpty()
      .withMessage('비밀번호를 입력해주세요.'),
    body('contact')
      .optional()
      .isString()
      .withMessage('연락처는 문자열이어야 합니다.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
];

// 특정 회원 조회 요청 유효성 검사
const validateGetMemberData = [
    param('id')
      .isInt({ min: 1 })
      .withMessage('ID는 1 이상의 정수여야 합니다.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
];
  
// 회원 삭제 요청 유효성 검사
const validateDeleteMember = [
    param('id')
      .isInt({ min: 1 })
      .withMessage('ID는 1 이상의 정수여야 합니다.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
];

// 채널 생성 요청 유효성 검사
const validateCreateChannel = [
    body('name')
      .notEmpty()
      .withMessage('채널 이름을 입력해주세요.')
      .isString()
      .withMessage('채널 이름은 문자열이어야 합니다.'),
    body('sub_num')
      .notEmpty()
      .withMessage('구독자 수를 입력해주세요.')
      .isInt({ min: 0 })
      .withMessage('구독자 수는 0 이상의 정수여야 합니다.'),
    body('video_count')
      .notEmpty()
      .withMessage('동영상 개수를 입력해주세요.')
      .isInt({ min: 0 })
      .withMessage('동영상 개수는 0 이상의 정수여야 합니다.'),
    body('user_id')
      .notEmpty()
      .withMessage('사용자 ID를 입력해주세요.')
      .isInt({ min: 1 })
      .withMessage('사용자 ID는 1 이상의 정수여야 합니다.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
];

// 특정 채널 조회 및 삭제 요청 유효성 검사
const validateChannelId = [
    param('id')
      .isInt({ min: 1 })
      .withMessage('채널 ID는 1 이상의 정수여야 합니다.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
];
  
// 채널 업데이트 요청 유효성 검사
const validateUpdateChannel = [
    ...validateChannelId, // ID 유효성 검사 재사용
    body('name')
      .optional()
      .isString()
      .withMessage('채널 이름은 문자열이어야 합니다.'),
    body('sub_num')
      .optional()
      .isInt({ min: 0 })
      .withMessage('구독자 수는 0 이상의 정수여야 합니다.'),
    body('video_count')
      .optional()
      .isInt({ min: 0 })
      .withMessage('동영상 개수는 0 이상의 정수여야 합니다.'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
];
  
module.exports = { 
    validateLoginRequest, 
    validateCreateMember, 
    validateGetMemberData, 
    validateDeleteMember,
    validateCreateChannel,
    validateChannelId,
    validateUpdateChannel
};
