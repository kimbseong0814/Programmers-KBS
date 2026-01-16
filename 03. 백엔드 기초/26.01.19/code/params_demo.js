import express from 'express'

const app = express()

app.listen (814, () => { 
    console.log('814 포트에서 서버 구동 중') 
})

app.get ('/', (req, res) => { 
    res.send('Hello KBS') 
})

app.get('/products/:n', (req, res) => { 
    // products/__빈칸에 오는 값을 n이라는 변수에 담아
    res.json ({ 
        num : req.params.n 
    }) 
})