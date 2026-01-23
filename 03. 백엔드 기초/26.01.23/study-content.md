# 강의 내용(26.01.23)

## 1. Middleware란?

Middleware는 요청(Request)과 응답(Response) 사이에서 실행되는 함수이다.
요청이 들어오면 Express는 등록된 순서대로 미들웨어를 거쳐 라우트로 이동한다.

### 미들웨어의 역할:

- 요청 데이터 가공

- 요청 로그 처리

- 인증/권한 체크

- 에러 처리

---
## 2. express.json() 미들웨어

```js
app.use(express.json())
```

express.json()은 **JSON 형태의 요청 body를 파싱**해서
req.body에 담아주는 내장 미들웨어다.

- POST 요청에서 JSON 데이터를 사용하려면 필수

- 라우트보다 위에 선언해야 정상 동작

- 없으면 req.body는 undefined
  
---
## 3. POST 요청 개념

POST는 **서버에 데이터를 생성/등록**할 때 사용한다.

- 데이터 전달 위치: Request Body

- Express에서는 req.body로 접근

- JSON 데이터 사용 시 express.json() 필요

---
## 4. 코드 동작 설명
(1) /test POST 요청

```js
app.post('/test', (req, res) => {
  console.log(req.body.message)
  res.send(req.body.message)
})
```

- 클라이언트가 JSON으로 데이터 전송

- req.body.message 값 출력

- 받은 데이터를 그대로 응답

```js
(2) /youtuber POST 요청
app.post('/youtuber', (req, res) => {
  const { channelTitle } = req.body
  youtuber.set(++id, req.body)
  res.json(`${channelTitle}님, 유튜버 생활을 응원합니다!`)
})
```

- POST body로 유튜버 정보 전달

- Map을 DB처럼 사용해 데이터 저장

- 저장 완료 메시지 반환
