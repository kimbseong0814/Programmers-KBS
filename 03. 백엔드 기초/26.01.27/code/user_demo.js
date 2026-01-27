//express 모듈 셋팅
const express = require('express')
const app = express()


app.use(express.json())

app.listen(7777, () => {
    console.log('서버가 7777 포트에서 실행중입니다.')
})

// 임시 사용자 데이터 
let db = new Map()
let id = 1

//로그인
app.post('/login', function(req, res) {

})
//회원가입
app.post('/join', function(req, res) {
    console.log(req.body)

    if(req.body == undefined) {
         res.status(400).json({
            message : `입력 값을 다시 확인해주세요.`
        })
    } else {
        db.set(id++, req.body)

        res.status(201).json({
            message : `${db.get(id-1).name}님 환영합니다.`
        })
    }
    
})

app
    .route('/users/:id')

//회원 개별 조회   
    .get(function(req, res) {
    let {id} = req.params
    id = parseInt(id)
    
    const user = db.get(id)
    if (user == undefined) {
        res.status(404).json({
            message : "회원님의 정보를 찾을 수 없습니다."
        })
    } else {
        res.status(200).json({
            userId : user.userId,
            name : user.name
        })
        res.json(user)
    }
})

//회원 개별 탈퇴
    .delete(function(req, res) {
    let {id} = req.params
    id = parseInt(id)
    
    const user = db.get(id)
    if (user == undefined) {
        res.status(404).json({
            message : "회원님의 정보를 찾을 수 없습니다."
        })
    } else {
        db.delete(id)

        res.status(200).json({
            message : `${user.name}님 다음에 또 뵙겠습니다.`
        })
        res.json(user)
    }
})



