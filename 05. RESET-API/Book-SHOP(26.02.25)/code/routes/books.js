const express = require('express');
const router = express.Router();

router.use(express.json());

const {
  allBooks,
  bookDetail,
} = require('../controller/BookController');


// 전체 도서 조회  GET /books 
// 또는 카테고리별 목록 조회
router.get('/', allBooks);

// 개별 도서 조회  GET /books/:id
router.get('/:id', bookDetail);

module.exports = router;
