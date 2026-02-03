//express 모듈 셋팅
const express = require('express')
const router = express.Router()
const conn = require('./mariadb')

router.use(express.json())



//로그인
router.post('/login', function(req, res) {
    // email이 디비에 저장된 회원인지 확인
    const {email, password} = req.body
    
    let sql = `SELECT * FROM users WHERE email = ? `
    conn.query(sql, email,
            function(err, results) {
                var loginUser = results[0]
                if (loginUser && loginUser.password == password) 
                        res.status(200).json ({
                            message : `${loginUser.name}님 로그인 되었습니다.`
                        })         
                    else 
                        res.status(400).json ({
                            message : `이메일 또는 비밀번호가 틀렸습니다!`
                        })
                }
            )

})


//회원가입
router.post('/join', function (req, res) {

        if (!req.body) {
            return res.status(400).json({
                message: '입력 값을 다시 확인해주세요.'
            })
        } else {
            const { email, name, password, contact } = req.body
            let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`
            let values = [email, name, password, contact]
            conn.query(sql, values, 
                function (err, results) {
                    res.status(201).json(results);
                }
            )
        }
})
      

  


router
        .route('/users')

//회원 개별 조회   
        .get(function(req, res) {
            let {email} = req.body

            // simple query
            let sql = `SELECT * FROM users Where email = ? `
            conn.query(sql, email,
                function(err, results) {
                    res.status(200).json(results)
                }
            )
        })

//회원 개별 탈퇴
        .delete(function(req, res) {
            let {email} = req.body

            // simple query
            let sql = `DELETE FROM users WHERE email = ? `
            conn.query(sql, email,
                function(err, results) {
                    res.status(200).json(results)
                }
            )

            
        })

module.exports = router



