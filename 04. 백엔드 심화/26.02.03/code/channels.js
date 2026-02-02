//express 모듈 셋팅
const express = require('express')
const router = express.Router()

const conn = require('./mariadb')

router.use(express.json())



// 임시 사용자 데이터 
let db = new Map()
let id = 1

// 채널 개별 생성
router
    .route('/')
    .get((req, res) => {
        const { userId } = req.body;

        // userId가 없는 경우 예외 처리
        if (!userId) {
            return res.status(400).json({
                message: "유저 ID가 필요합니다."
            })
        }

        const sql = `SELECT * FROM channels WHERE user_id = ?`

        conn.query(sql, userId, (err, results) => {


            // 결과 존재 여부에 따른 응답
            if (results && results.length > 0) {
                res.status(200).json(results)
            } else {
                notFoundChannel(res)
            }
        })
    })

    // 채널 개별 생성 = db에 저장
    .post((req, res) =>{
        const {name, userId} = req.body
        if (name && userId) {
            let sql = `INSERT INTO channels (name, userId) VALUES (?, ?)`
            let values = [name, userId]
            conn.query(sql, values, 
                function (err, results) {
                    res.status(201).json(results);
                }
            )
        } else {
            res.status(400).json ({
                message : "요청 값을 제대로 보내주세요."
            })
        }
    }) 


router
    .route('/:id')

    .get((req, res) =>{
        let {id} = req.params
        id = parseInt(id)

         let sql = `SELECT * FROM channels WHERE id = ? `
            conn.query(sql, id,
                function(err, results) {
                    if (results.length)
                        res.status(200).json(results)
                    else
                        notFoundChannel(res)
                }
            )

    })// 채널 개별 조회

    .put((req, res) =>{
        let {id} = req.params;
        id = parseInt(id);

        let channel = db.get(id);

        if (channel) {
            if (req.body.channelTitle) {
                channel.channelTitle = req.body.channelTitle;
                db.set(id, channel);

                res.status(200).json({
                    message: `채널명이 ${channel.channelTitle}님으로 수정되었습니다.`
                });
            } else {
                res.status(400).json({
                    message: "수정할 채널명을 보내주세요."
                });
            }
        } else {
            notFoundChannel()
        }
    })// 채널 개별 수정

    .delete((req, res) =>{
        let {id} = req.params
        id = parseInt(id)
        var channel = db.get(id)

        if (channel) {
            db.delete(id)

           res.status(200).json ({
            message : `${channel.channelTitle}님이 정상적으로 삭제되었어요.`
           })
        } else {
            notFoundChannel()
        }
    })// 채널 개별 삭제

function notFoundChannel(res) {
    res.status(404).json ({
        message : "채널 정보를 찾을 수 없습니다."
    })
}

module.exports = router