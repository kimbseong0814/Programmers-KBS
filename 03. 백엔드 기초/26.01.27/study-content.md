# 강의 내용(26.01.27)

## 핸들러(Handler)란?

**핸들러 = 라우트(경로)에 요청이 들어왔을 때 실행되는 콜백 함수다.**

Express에서는 아래 형태로 쓰고, 이 function(req, res) { ... } 블록이 곧 핸들러다. 

```js
app.get('/youtubers/:id', function (req, res) { 
  // 요청 들어오면 여기 자동 실행
})
```

핸들러에서 자주 하는 일:

- req에서 입력(Params/Query/Body) 꺼내기

- DB/자료구조에서 데이터 조회/수정

- res로 응답 보내기 (res.status().json() 등)

---
## Params로 id 받기 + 숫자로 변환하는 이유

예: /youtubers/1 같은 요청에서 :id는 문자열로 들어온다.

그래서 Map의 key(숫자)로 조회하려면 parseInt()로 숫자 변환을 한다. 

```js
let { id } = req.params
id = parseInt(id)

const youtuber = db.get(id)
```
---
## if(객체) 의미 (Truthy / Falsy)

자바스크립트에서 if (youtuber)는 **객체가 존재하면(Truthy)** 로 해석된다.

Map에서 db.get(id) 결과가 없으면 undefined가 나오고, 이건 Falsy라서 else로 간다. 


대표적인 Falsy:

- undefined, null

- 0

- "" (빈 문자열)

- NaN

- false

그래서 아래 코드는 유튜버가 있으면 삭제 진행, 없으면 404의 흐름이다. 

```js
var youtuber = db.get(id)
if (youtuber) {
  db.delete(id)
  res.json({ message: '삭제 완료' })
} else {
  res.status(404).json({ message: '존재하지 않음' })
}
```
---
## 긍정문 / 부정문 패턴

API 핸들러는 보통 정상 흐름(긍정문)을 먼저 처리하고, 실패 케이스를 else로 처리한다.

예: POST에서 body 검증

- 긍정문: channelTitle이 있으면 등록(201)

- 부정문: 없으면 잘못된 요청(400) 

```js
const channelTitle = req.body.channelTitle
if (channelTitle) {
  db.set(id++, req.body)
  res.status(201).json({ message: '등록 완료' })
} else {
  res.status(400).json({ message: '요청 값이 비었음' })
}
```
---
## Route(라우트)란?

**Route = HTTP 메서드 + URL 경로 조합이다.**

예:

- GET /youtubers : 전체 조회

- GET /youtubers/:id : 개별 조회

- POST /youtubers : 등록

- PUT /youtubers/:id : 수정

- DELETE /youtubers/:id : 삭제 


.route()로 같은 경로를 묶기

/users/:id처럼 같은 path에 대해 GET/DELETE를 한 덩어리로 체이닝할 수 있다. 

```js
app.route('/users/:id')
  .get((req,res)=>{})
  .delete((req,res)=>{})
```
---
## == vs === 차이

== :형 변환(type coercion) 을 해서 값만 맞추려고 함

=== : 타입 + 값이 둘 다 같아야 하고, 
실무/코테/서버 코드에서는 보통 === 권장 

예시 : 
```js
1 == "1"   // true (문자열 "1"을 숫자로 바꿔 비교해버림)
1 === "1"  // false (타입이 다름: number vs string)
```
