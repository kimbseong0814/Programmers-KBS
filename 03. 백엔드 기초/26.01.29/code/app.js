const express = require('express')
const app = express()

app.listen(7777)

const userRouter = require('./users') // user_demo 소환
const channelRouter = require('./channels')

// /channels는 공동된 URL 빼는 역할
// user는 /가 공동된게 없어서 그대로 둠
app.use("/", userRouter)
app.use("/channels", channelRouter)