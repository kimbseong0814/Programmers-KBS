import express from 'express'

const app = express()

app.listen (814, () => { 
    console.log('814 포트에서 서버 구동 중') 
})

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/products/:n', (req, res) => {
    if (req.params.n > 10) {
        console.log('url에 입력된 값이 10보다 큽니다.')
    } else {
        console.log('url에 입력된 값이 10보다 작습니다.')
    }

    let number = parseInt(req.params.n - 10)

    res.json({ num: number })
})


// app.get('/:nickname', function(req, res) {

//     const param = req.params
//     res.json({
//         channel : param.nickname
//     })
// })

app.get('/watch', function(req, res) {
    // const query = req.query
    // console.log(q.v)
    // console.log(q.t)

    // JS객체(json)의 비구조화
    const {v, t} = req.query
    console.log(v)
    console.log(t)

    res.json({
        video: v,
        timeline: t ?? null
    })
       
})