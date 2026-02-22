const express = require('express');
const router = express.Router();

router.use(express.json());

// 주문 하기  POST /orders
router.post('/', (req, res) => {
  res.json({ message: '주문 하기' });
});

// 주문 목록 조회  GET /orders
router.get('/', (req, res) => {
  res.json({ message: '주문 목록 조회' });
});

// 주문 상세 상품 조회  GET /orders/:id
router.get('/:id', (req, res) => {
  res.json({ message: '주문 상세 상품 조회', id: req.params.id });
});

module.exports = router;
