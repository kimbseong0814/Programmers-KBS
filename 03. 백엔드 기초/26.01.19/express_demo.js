import express from 'express'

const app = express()

// GET + "/"
app.get('/', (req, res) => {
  res.send('Hello KBS')
})


// APi : GEt + "http://localhost:0814/test"
// "TEST SUCCESS"

app.listen(814, () => {
    console.log('Server running on http://localhost:814');
});


let nodejsBook = {
    title : "Node.js를 공부해보자",
    price : 20000,
    description : "이 책 좋음 왜? 누가 지음"
};


app.get('/product/1', (req, res) => {
    res.json(nodejsBook)
    // res.sendStatus(20000)
})

// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000')
// })