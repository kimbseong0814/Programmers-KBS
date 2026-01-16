import express from 'express'

const app = express()

app.listen(814, () => {
    console.log('Server running on http://localhost:814');
});

// GET /hello, /bye, /nicetomeetyou
// GET /hello
app.get('/hello', (req, res) => {
    res.json({
        say :'안녕 KBS'
    })
})

// GET /bye
app.get('/bye', (req, res) => {
    res.json({
       say : '잘가 KBS'
    })
})

// GET /nicetomeetyou
app.get('/nicetomeetyou', (req, res) => {
    res.json({
       say : '만나서 반가워 KBS'
    })
})