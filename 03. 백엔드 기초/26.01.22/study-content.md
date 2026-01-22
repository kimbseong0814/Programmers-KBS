# 오늘 강의 내용(26.01.22)

## 1) Map Object (JavaScript Map)

Map은 key-value(키-값) 쌍을 저장하는 컬렉션입니다. 

배열/객체와 달리 키로 다양한 타입(숫자, 객체 등)을 그대로 쓸 수 있고, set()/get()으로 다룹니다.

### 핵심 메서드

- new Map() : 맵 생성

- set(key, value) : 저장

- get(key) : 조회 (없으면 undefined)

- has(key) : 존재 여부

- delete(key) / clear() : 삭제

- size : 개수

### 코드 예시 (강의 코드 기반)
map_demo.js에서 상품 데이터를 Map에 저장하고 get()으로 꺼내는 흐름입니다. 

```js

map_demo

let db = new Map()

let NoteBook = { productName: "NoteBook", price: 200000 }
db.set(1, NoteBook)

console.log(db.get(1)) 

```
---
## 2) Express + 객체 (Object)

Express는 Node.js에서 HTTP 서버를 빠르게 만들기 위한 웹 프레임워크입니다.

Express의 라우팅 핸들러는 (req, res) => { ... } 형태로 동작하고, 

응답은 res.send() 또는 res.json() 등으로 반환합니다.

### 가장 기본 구조 (Hello World)

app.js는 Express 서버 기본 뼈대 예시입니다. 

```js
const express = require('express')
const app = express()
const port = 1234

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
---
## 3) Express + Map + 객체 (간단 DB처럼 쓰기)

강의에서 한 방식은 다음 아이디어입니다.

- 객체(Object) : 실제 데이터(상품/유튜버 정보)

- Map : “id → 객체”로 매핑해서 저장

- Express : /:id로 들어온 요청에서 req.params.id를 읽어서 Map에서 조회 후 JSON 응답

req.params는 라우트 경로의 파라미터를 담는 객체입니다.

### (1) 상품 조회 예시

map_demo.js는 /:id 요청을 받아서 db.get(id)로 상품을 찾고 없으면 메시지를 반환합니다. 


- 포인트: req.params.id는 기본적으로 문자열이므로, 숫자 키를 쓰면 parseInt()로 변환해야 합니다.

- 조회 결과가 undefined면 “없는 데이터” 처리.
  
```js
app.get('/:id', (req, res) => { 
  let { id } = req.params
  id = parseInt(id)

  if (db.get(id) == undefined) {
    res.json({ message: "없는 상품입니다." })
  } else {
    const product = db.get(id)
    product["id"] = id
    res.json(product)
  }
})
```

### (2) 유튜버 조회 예시 (REST 형태)

youtuber_demo.js도 동일 패턴이며, Map에 유튜버 객체를 넣고 id로 조회합니다. 

```js
app.get('/youtuber1/:id', (req, res) => {
  let {id} = req.params
  id = parseInt(id)

  const youtuber = db.get(id)
  if (youtuber == undefined) {
    res.json({ message: "유튜버 정보를 찾을 수 없습니다." })
  } else {
    res.json(youtuber)
  }
})
```
---
## 4) Express 구조 이해 (요청이 들어오면 내부에서 무슨 일이 일어나는가)

Express 앱의 기본 흐름은 아래처럼 이해하면 깔끔합니다.

### 1. 서버 생성

- const app = express() 로 “서버 앱 객체” 생성


### 2. 라우팅 등록

- app.get('/path', handler) 처럼 HTTP 메서드 + 경로에 핸들러 연결
  

### 3. 요청(Request) → 라우터 매칭

- 클라이언트가 요청하면 Express가 “경로/메서드”에 맞는 핸들러를 찾음
  

### 4. 핸들러 실행

- (req, res) => { ... } 실행

- req.params, req.query, req.body 같은 입력을 읽고,

- res.send()/res.json()으로 응답 반환
  

### 5. 리스닝 시작
- app.listen(port, callback) 으로 포트 바인딩하고 요청 대기

---
## 5) 자바스크립트 함수 4가지 종류 (강의 코드 기준)

function_demo.js에 4가지 형태가 모두 들어 있습니다. 


1) 함수 선언문 (Function Declaration)

```js
function add1(x, y) {
  return x + y
}

```
2) 함수 표현식 (Function Expression)

```js
let add2 = function(x, y) {
  return x + y
}
```

3) 화살표 함수 (Arrow Function) - 블록 바디

```js
const add3 = (x, y) => {
  return x + y
}
```

4) 화살표 함수 (Arrow Function) - 표현식 바디(축약형)

```js
var add4 = (x, y) => x + y
```

추가로, 화살표 함수는 일반 함수와 완전히 동일하지는 않고(예: this 바인딩 차이 등) “간결한 문법 + 특정 제약”이 있습니다.
