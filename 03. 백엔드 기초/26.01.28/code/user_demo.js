//express 모듈 셋팅
const express = require('express')
const app = express()


app.use(express.json())
app.listen(7777)


// 임시 사용자 데이터 
let db = new Map()
let id = 1

//로그인
app.post('/login', function(req, res) {
    //userId가 디비에 저장된 회원인지 확인
    const {userId, password} = req.body
    var loginUser = {}

    db.forEach(function(user, id) {
        // a: valus, b : key, c: map
        
        if (user.userId === userId) {
            loginUser = user
            
        } 
    })
    // id 값을 못 찾았으면
    if(isExist(loginUser)) {
        console.log("같은 거 찾음")

    //pwd도 맞는지 비교
        if (loginUser.password === password) {
            console.log("패스워드도 같아")
        } else {
            console.log("패스워드는 틀렸다")
         }
    } else {
        console.log("아이디를 다시 입력 하세요!")
    }
    
})


function isExist(obj) {
    if (Object.keys(obj).length) {
        return true
    } else {
        return false
    }
}
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



