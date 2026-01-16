import express from 'express'

const app = express()


// APi : GEt + "http://localhost:0814/test"
// "TEST SUCCESS"

app.listen(814, () => {
    console.log('Server running on http://localhost:814');
});

app.get('/test/1', function (req, res) {
    res.send("One!")
})  

app.get('/test', function (req, res) {
    res.send("KBS!")
})  

