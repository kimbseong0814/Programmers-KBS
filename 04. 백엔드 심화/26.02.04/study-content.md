# 강의 내용 정리(26.02.04)

# Channels API 정리

## 1. 유효성 검사 (Validation)

### 개념

클라이언트로부터 받은 값이 **비어있지 않은지, 타입이 맞는지**를 서버에서 먼저 검증한다.

잘못된 요청을 **DB까지 보내지 않기 위해** 사용한다.

### 코드

```jsx
const { body, param, validationResult } =require('express-validator')

```

```jsx
body('userId').notEmpty().isInt().withMessage('숫자 입력 필요')
body('name').notEmpty().isString().withMessage('문자 입력 필요')
param('id').notEmpty().withMessage('채널id 필요')

```

### 이유

- 클라이언트는 항상 신뢰할 수 없다
- 서버가 **마지막 방어선**
- 잘못된 값 → 400 Bad Request

---

## 2. userId 검증

### 적용 위치

- 채널 전체 조회 `GET /channels`
- 채널 생성 `POST /channels`

### 의미

```jsx
body('userId').notEmpty().isInt()

```

- userId는 **필수값**
- 숫자가 아니면 DB 조회/삽입 불가

### 왜 필요한가?

- userId가 문자열이면 SQL 조건이 깨질 수 있음
- 데이터 무결성 유지 목적

---

## 3. name 추가 + return 처리

### 채널 생성 API

```
POST /channels

```

### 코드

```jsx
let sql =`INSERT INTO channels (name, user_id) VALUES (?, ?)`

```

```jsx
res.status(201).json(results)

```

### 설명

- `name`은 채널의 이름
- INSERT 성공 시:
    - **201 Created**
    - DB 결과를 JSON으로 반환

---

## 4. SQL 에러 처리 (err)

### 공통 패턴

```jsx
if (err) {
console.log(err)
return res.status(400).end()
}

```

### 이유

- SQL 문법 오류
- 컬럼명 불일치
- DB 연결 문제

→ 에러 발생 시 **정상 흐름 중단 + 즉시 응답 반환**

---

## 5. channels 리팩토링 + API 우선순위

### 리팩토링 포인트

- 반복되는 검증 로직을 **미들웨어로 분리**
- API 흐름을 **검증 → 로직 → 응답** 구조로 통일

```jsx
constvalidate = (req, res, next) => {
const err =validationResult(req)
if (!err.isEmpty()) {
return res.status(400).json(err.array())
  }
next()
}

```

### 장점

- 코드 중복 제거
- 가독성 향상
- 유지보수 쉬움

---

## 6. update (채널 수정)

### API

```
PUT /channels/:id

```

### 코드 핵심

```jsx
UPDATE channelsSET name=?WHERE id=?

```

```jsx
if (results.affectedRows ==0) {
return res.status(400).end()
}

```

### 설명

- affectedRows = 0
    - 수정 대상이 없음
- 정상 수정
    - 200 OK

---

## 7. delete (채널 삭제)

### API

```
DELETE /channels/:id

```

### 로직

```jsx
DELETEFROM channelsWHERE id = ?

```

- 삭제 성공 → 200
- 대상 없음 → 400 처리

---

## 8. 검사 미들웨어 분리

### 목적

- validationResult를 매 API마다 쓰지 않기 위함
- **검사 로직과 비즈니스 로직 분리**

### 구조

```jsx
[검증 rules] → validate → 실제 handler
```

### 효과

- API 흐름이 명확해짐
- 실무 스타일에 가까운 구조

---

## 9. 상태 코드 설계 요약

| 상황 | 상태 코드 |
| --- | --- |
| 정상 조회 | 200 OK |
| 생성 성공 | 201 Created |
| 잘못된 요청 | 400 Bad Request |
| 데이터 없음 (단일 조회) | 404 Not Found |
| SQL 에러 | 400 |

---

## 한 줄 회고

> 단순히 API를 만드는 것이 아니라,
> 
> 
> **검증 → 처리 → 응답 → 상태 코드** 흐름을 기준으로
> 
> 서버가 어떤 책임을 가져야 하는지 이해할 수 있었다.
>
