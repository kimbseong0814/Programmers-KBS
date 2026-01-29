# 강의 내용 정리 (26.01.29)

## Express 실행 흐름

Express 서버는 클라이언트 요청이 들어오면 다음과 같은 순서로 처리됩니다.

1. Express 애플리케이션(`app`)이 요청을 수신
2. `app.use(prefix, router)` 설정에 따라 prefix에 맞는 라우터로 요청 전달
3. 라우터 내부에서 `route(path).get / post / put / delete`를 통해  
   HTTP 메서드 + 경로를 기준으로 핸들러 매칭
4. 매칭된 핸들러에서  
   - `req` 객체로 요청 데이터 수신  
   - `res` 객체로 응답 반환

---

## 현재 서버 라우터 구조

```js
app.use("/", userRouter)
app.use("/channels", channelRouter)
```
- 사용자 라우터(userRouter)는 / 경로부터 시작

- 채널 라우터(channelRouter)는 /channels 경로부터 시작

---
## 라우팅 설계 요약
### 1️. Users 라우팅 (users.js)
사용자 관련 기능을 담당하는 라우터입니다.

데이터 저장소는 **Map() 기반 메모리 DB**를 사용하며,

서버 재시작 시 데이터는 초기화됩니다.

### 🔹 로그인
**POST /login**

입력 데이터:

```js
{
  "userId": "bseon",
  "password": "1234"
}
```
동작 방식:

- Map(db)에서 userId 검색

- 존재하면 password 비교

- 결과 메시지 반환

### 🔹 회원가입
**POST /join**

입력 데이터:

```js
{
  "userId": "bseon",
  "password": "1234",
  "name": "김병성"
}
```
동작 방식:

- `db.set(userId, req.body)` 형태로 사용자 정보 저장

- 회원가입 성공 메시지 반환

### 🔹 회원 조회
**GET /users**

현재는 `req.body.userId`를 기준으로 회원 정보 조회

- (추후 REST 구조에서는 `/users/:id` 형태로 개선 가능)

### 🔹 회원 탈퇴
**DELETE /users**

- 현재는 `req.body.userId`를 기준으로 회원 삭제 처리

---
## 2️. Channels 라우팅 (channels.js)
채널 관련 기능을 담당하며,

`router.route('/')`, `router.route('/:id')`를 사용해

REST API 형태로 구성되어 있습니다.

### 🔹 채널 목록 조회
**GET /channels**

- `req.body.userId` 기준으로

- 해당 사용자의 채널만 필터링하여 반환

### 🔹 채널 생성
**POST /channels**

입력 데이터:

```js
{
  "userId": "bseon",
  "channelTitle": "KBS 백엔드 공부방"
}
```
동작 방식:

- `db.set(id++, channel)` 형태로 채널 저장

- 생성 완료 메시지 반환

### 🔹 채널 단건 조회
**GET /channels/:id**

- 채널 id 기준 단건 조회

### 🔹 채널 수정
**PUT /channels/:id**

입력 데이터:

```js
{
  "channelTitle": "수정된 채널명"
}
```
동작 방식:

- 기존 채널 조회

- `channelTitle` 값 수정 후 저장

### 🔹 채널 삭제
**DELETE /channels/:id**

- 채널 id 기준 삭제 처리

---
### 미들웨어 처리 구조
각 라우터 내부에 다음 미들웨어가 적용되어 있습니다.

```js
router.use(express.json())
```
- JSON 형태의 요청 body를 파싱

- req.body로 데이터 접근 가능

- users / channels 라우터 모두 동일한 구조

---

## 정리
- Express는 요청 → 라우터 → 핸들러 → 응답 흐름으로 동작

- app.use()를 통해 기능별 라우터 분리

- Map을 활용해 간단한 메모리 DB 구조 구현

- REST API 설계 방식(GET / POST / PUT / DELETE) 실습
