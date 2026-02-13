//express 모듈 셋팅
const express = require('express');
const router = express.Router();
const conn = require('../mariadb');

const { 
    join, 
    login,
    passwordResetRequest,
    passwordReset  
    } = require('../controller/UserController');
const {body, param, validationResult} = require('express-validator');


router.use(express.json());

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(StatusCodes.BAD_REQUEST).json(errors.array());
};


// 회원가입
router.post('/join', join);

// 로그인
router.post('/login', login);

// 비밀번호 초기화 요청
router.post('/reset', passwordResetRequest);

// 비밀번호 초기화
router.put('/reset', passwordReset);

module.exports = router;