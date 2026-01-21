import express from 'express'

const app = express()

app.listen (814, () => { 
    console.log('814 포트에서 서버 구동 중') 
})

let youtuber1 = {
    channelTitle : "십오야", 
    sub : "593만명",
    videoNum : "993개"
}

let youtuber2 = {
    channelTitle : "침착맨", 
    sub : "227만명",
    videoNum : "6.6개"
}

let youtuber3 = {
    channelTitle : "테오", 
    sub : "54.8만명",
    videoNum : "726개"
}

app.get('/:nickname', function(req, res) {

    const {nickname} = req.params

    if (nickname == "@15ya.fullmoon") {
        res.json(youtuber1)
    } else if (nickname == "@ChimChakMan_Official") {
        res.json(youtuber2)
    } else if (nickname == "@TEO_universe") {
        res.json(youtuber3)
    } else {
        res.json({
            message : "저희가 모르는 유튜버입니다."
        })
    }
    // 개발자가 예상하지 못한 에러 = 예외가 발생했다
})
