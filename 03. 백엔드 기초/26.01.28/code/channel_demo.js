//express 모듈 셋팅
const express = require('express')
const app = express()


app.use(express.json())
app.listen(7777)


// 임시 사용자 데이터 
let db = new Map()
let id = 1

// 채널 개별 생성
app
    .route('/channels')
    // 채널 전체 조회
    .get((req, res) => {
    if (db.size >= 1) {
        var channels = [];

        db.forEach(function (value, key) {
            channels.push(value);
        });

        res.status(200).json(channels);
    } else {
        res.status(404).json({
            message: "조회할 채널이 없습니다."
        });
    }
})

    // 채널 개별 생성
    .post((req, res) =>{
        if (req.body.channelTitle) {
            db.set(id++, req.body)
            
            res.status(201).json({
                message : `${db.get(id-1).channelTitle}님의 채널을 응원합니다.`
            })
        } else {
            res.status(400).json ({
                message : "요청 값을 제대로 보내주세요."
            })
        }
    }) 


app
    .route('/channels/:id')

    .get((req, res) =>{
        let {id} = req.params
        id = parseInt(id)
        var channel = db.get(id)

        if (channel) {
           res.status(200).json(channel)
        } else {
            res.status(404).json ({
                message : "채널 정보를 찾을 수 없습니다."
            })
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
            res.status(404).json({
                message: "채널 정보를 찾을 수 없습니다."
            });
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
            res.status(404).json ({
                message : "채널 정보를 찾을 수 없습니다."
            })
        }
    })// 채널 개별 삭제

