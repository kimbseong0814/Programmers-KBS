# 강의 내용(26.01.29)

Express 실행 흐름

Express는 요청이 들어오면 보통 아래 순서로 처리된다.

app이 요청을 받음

app.use(prefix, router)에 의해 해당 prefix 라우터로 전달

라우터에서 route(path).get/post/put/delete에 의해 메서드+경로 매칭

매칭된 핸들러에서 req로 입력을 받고 res로 응답을 반환

현재 너의 서버는 아래처럼 라우터를 붙여놨다. 

app

app.use("/", userRouter) → 사용자 라우터는 루트(/)부터 시작

app.use("/channels", channelRouter) → 채널 라우터는 /channels부터 시작

라우팅 설계 요약
1) users 라우팅 (users.js) 

users

POST /login : 로그인

입력: { userId, password }

동작: Map(db)에서 userId 검색 → 비번 비교 → 메시지 반환

POST /join : 회원가입

입력: { userId, password, name, ... }

동작: db.set(userId, req.body) 형태로 저장

GET /users : 회원 조회 (현재는 req.body에서 userId 받는 형태)

DELETE /users : 회원 탈퇴 (현재는 req.body에서 userId 받는 형태)

데이터 저장소는 실제 DB가 아니라 Map()을 사용한 메모리 임시 DB다. 서버 재시작하면 데이터는 초기화된다. 

users

2) channels 라우팅 (channels.js) 

channels

channels.js는 router.route('/')와 router.route('/:id')를 써서 REST 형태로 구성되어 있다. 

channels

GET /channels : 채널 목록 조회

현재는 req.body.userId 기준으로 해당 userId의 채널만 필터링해서 반환

POST /channels : 채널 생성

입력: { channelTitle, userId, ... }

동작: db.set(id++, channel)로 저장 후 생성 메시지 반환

GET /channels/:id : 채널 단건 조회

PUT /channels/:id : 채널명 수정 (req.body.channelTitle)

DELETE /channels/:id : 채널 삭제

미들웨어 처리

router.use(express.json())가 있어서 JSON 바디를 파싱한다.
즉, req.body로 데이터를 받는 구조다. (users/channels 둘 다 동일)

API 예시 (README에 넣기 좋은 형태)
회원가입

POST /join

{
  "userId": "bseon",
  "password": "1234",
  "name": "김병성"
}

로그인

POST /login

{
  "userId": "bseon",
  "password": "1234"
}

채널 생성

POST /channels

{
  "userId": "bseon",
  "channelTitle": "KBS 백엔드 공부방"
}

채널 수정

PUT /channels/1

{
  "channelTitle": "수정된 채널명"
}
