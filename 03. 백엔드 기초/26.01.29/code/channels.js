//express 모듈 셋팅
const express = require('express')
const router = express.Router()

router.use(express.json())



// 임시 사용자 데이터 
let db = new Map()
let id = 1

// 채널 개별 생성
router
    .route('/')
    // 채널 전체 조회
    .get((req, res) => {
        if (db.size) {
            var {userId} = req.body
            var channels = []


            db.forEach(function (value, key) {
                if (value.userId === userId)
                    channels.push(value);
                })

                if (channels.length) {
                    res.status(200).json(channels)
                } else {
                    notFoundChannel()
                }
            } else {
                notFoundChannel()
            }
        
        })

    // 채널 개별 생성 = db에 저장
    .post((req, res) =>{
        if (req.body.channelTitle) {
            let channel = req.body

            db.set(id++, channel)
            
            res.status(201).json({
                message : `${db.get(id-1).channelTitle}님의 채널을 응원합니다.`
            })
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
        var channel = db.get(id)

        if (channel) {
           res.status(200).json(channel)
        } else {
            notFoundChannel()
        }
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