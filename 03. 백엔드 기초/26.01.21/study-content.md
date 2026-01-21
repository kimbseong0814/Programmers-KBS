## 1. Express란?

Express는 Node.js 환경에서 HTTP 서버를 빠르고 간단하게 구축할 수 있도록 도와주는 웹 프레임워크입니다.

### 특징
- 서버 생성 및 실행이 간단함
- URL(라우트) 단위로 요청 처리 가능
- Request / Response 객체 제공

```js
import express from 'express'

const app = express()

app.listen(814, () => {
  console.log('814 포트에서 서버 구동 중')
})

```
---

## 2. Params (req.params)
### 개념
- URL 경로에 포함된 동적 값을 읽는 방식

- 주로 특정 리소스를 식별할 때 사용
```
app.get('/:id', (req, res) => {
  const { id } = req.params
})
```
### 숫자 Params 예제
```
app.get('/products/:n', (req, res) => {
  if (req.params.n > 10) {
    console.log('10보다 큼')
  } else {
    console.log('10보다 작음')
  }

  let number = parseInt(req.params.n - 10)
  res.json({ num: number })
})
```
⚠️ req.params 값은 기본적으로 문자열이므로 숫자 연산 시 형 변환 필요

---

## 3. Query (req.query)
### 개념
- URL 뒤에 붙는 ?key=value 형태의 데이터

- 필터링, 옵션 전달에 적합

```
app.get('/watch', (req, res) => {
  const { v, t } = req.query

  res.json({
    video: v,
    timeline: t ?? null
  })
})
```
---

## 4. 객체 비구조화 (Object)
객체의 속성을 변수로 바로 추출하는 문법입니다.
```
const { nickname } = req.params
```

### 유튜버 정보 예제
```
app.get('/:nickname', (req, res) => {
  const { nickname } = req.params

  if (nickname == '@15ya.fullmoon') {
    res.json(youtuber1)
  } else if (nickname == '@ChimChakMan_Official') {
    res.json(youtuber2)
  } else {
    res.json({ message: '저희가 모르는 유튜버입니다.' })
  }
})
```
---
## 5. 배열 비구조화 (Array)
배열의 요소를 순서대로 변수에 할당합니다.

```
const array = [1, 2, 3, 4, 5]
const [, num2, num3, , num5] = array

console.log(num2) // 2
console.log(num3) // 3
console.log(num5) // 5
```
---
## 6. JavaScript Map
### Map이란?
- key-value 쌍으로 데이터를 저장하는 자료구조

- key의 타입을 구분함
```
let db = new Map()

db.set(1, 'NoteBook')
db.set(2, 'Cup')
db.set(3, 'Chair')
db.set('1', 'KBS')
```
### Map + Params 예제
```
app.get('/:id', (req, res) => {
  let { id } = req.params
  id = parseInt(id)

  if (db.get(id) == undefined) {
    res.json({ message: '없는 상품입니다.' })
  } else {
    res.json({ id, productName: db.get(id) })
  }
})
```
---
## 7. 네이밍 컨벤션
### 7-1️. snake-case (하이픈 케이스)
폴더명 / 파일명

- demo-api

- object-api-demo.js

특징

- 소문자 사용

- 단어 구분은 -

### 7-2️. camelCase
변수명 / 함수명

- channelTitle

- videoNum

특징

- 첫 단어 소문자

- 이후 단어 첫 글자 대문자

---

## 실습
### 1. params-demo.js / 10보다 작은 수 입력, 10보다 큰 수 입력
<img width="545" height="455" alt="스크린샷 2026-01-21 150825" src="https://github.com/user-attachments/assets/bd8dc789-545c-41ea-b1d7-c213c194f93c" />


<img width="545" height="450" alt="스크린샷 2026-01-21 150840" src="https://github.com/user-attachments/assets/9b90bcf6-f3ac-419f-9ac6-8836079f2251" />

---

### 2. object-api-demo.js / youtuber nickname으로 호출
<img width="514" height="126" alt="스크린샷 2026-01-21 140010" src="https://github.com/user-attachments/assets/53fccf6c-149f-4a80-a91b-e86804b9178f" />

---

### 3. map-demo.js / 존재하는 product 호출, 존재하지 않는 product 호출
<img width="254" height="101" alt="스크린샷 2026-01-21 150925" src="https://github.com/user-attachments/assets/4143badb-3921-4b38-80be-00ca7fa54a57" />

<img width="330" height="108" alt="스크린샷 2026-01-21 150936" src="https://github.com/user-attachments/assets/87850f1a-e0fa-4330-905a-3fc80b42037e" />

