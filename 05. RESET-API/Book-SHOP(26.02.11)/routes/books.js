const express = require('express');
const router = express.Router();

router.use(express.json());

// 전체 도서 조회  GET /books
router.get('/', (req, res) => {
  res.json({ message: '전체 도서 조회' });
});

// 개별 도서 조회  GET /books/:id
router.get('/:id', (req, res) => {
  res.json({ message: '개별 도서 조회', id: req.params.id });
});

// 카테고리별 목록 조회  
router.get('/', (req, res) => {
  const { category } = req.query;
  res.json({ message: '카테고리별 도서 목록 조회', category });
});

module.exports = router;
