import express from 'express';

const app = express();

app.listen(814, () => {
    console.log('Server running on http://localhost:814');
});

const fruits = [
    { id: 1, name: 'apple' },
    { id: 2, name: 'orange' },
    { id: 3, name: 'strawberry' },
    { id: 4, name: 'blueberry' }
];

// 과일 전체 조회
app.get('/fruits', (req, res) => {
    res.json(fruits);
});

// 과일 개별 조회
app.get('/fruits/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const fruit = fruits.find(f => f.id == id);

    if (!fruit) {
        res.status(404).json({
            message: '해당 과일을 찾을 수 없습니다.'
        });
    } else {
        res.json(fruit);
    }
});
