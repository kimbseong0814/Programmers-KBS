# 강의 내용(26.01.28)

## 1. 빈 객체(Object)란 무엇인가

자바스크립트에서 빈 객체란
- 속성(key)이 하나도 없는 객체를 말한다.

```js
var loginUser = {}
```

이 상태에서 중요한 질문은

- 이 객체에 실제 데이터가 들어 있는지,
- 아니면 아직 아무것도 없는 상태인지
- 어떻게 판단할 것인가?

이걸 판단하는 방법이 3가지.

---
## 빈 객체 확인 방법 ① Object.keys()
🔹 개념

Object.keys(객체)
→ 객체가 가진 key 목록을 배열로 반환

```js
Object.keys(obj)
```
- 빈 객체 → []
- 값이 있으면 → ['key1', 'key2', ...]

🔹 코드 (empty_demo.js 기준)

```js
const obj1 = {}
const obj2 = { message: "안 빔" }

console.log(Object.keys(obj1)) // []
console.log(Object.keys(obj2)) // ['message']
```

### 핵심 포인트

```js
Object.keys(obj).length === 0
```

- true → 빈 객체

- false → 값이 있음

---

## 빈 객체 확인 방법 ② for문(for...in)
🔹 개념

객체에 하나라도 key가 있으면

for문이 최소 1번은 실행된다.

```js
for (let key in obj) {
  // 실행되면 빈 객체 아님
}
```

🔹 예제 코드

```js
function isEmpty(obj) {
  for (let key in obj) {
    return false; // 하나라도 있으면 빈 객체 아님
  }
  return true; // 끝까지 안 돌면 빈 객체
}
```

🔹 특징

- 예전 코드에서 많이 보임

- break/return 로직 이해 필요

- 가독성은 Object.keys()보다 떨어짐

개념 설명용으로는 좋지만, 실무에선 ①번이 더 많이 쓰임

---
## 빈 객체 확인 방법 ③ lodash – isEmpty()
🔹 개념

외부 라이브러리 lodash에서 제공하는 함수

```js
_.isEmpty(obj)
```

- 객체

- 배열

- 문자열

- null / undefined

까지 전부 한 번에 처리

🔹 장점

- 가장 강력함

- 예외 케이스까지 커버

🔹 단점

- ❌ 외부 라이브러리 필요

- ❌ 지금 강의 범위에서는 설치 안 함

그래서 강의에서는 개념만 소개, 실제 코드는 안 씀

---
## 2. 왜 “빈 객체 확인”이 중요한가? (login 코드 기준)
🔹 login 코드 핵심 흐름 (user_demo.js)

```js
var loginUser = {}
```
처음엔 무조건 빈 객체로 시작한다.


```js
db.forEach(function(user, id) {
  if (user.userId === userId) {
    loginUser = user
  }
})
```
- 아이디를 찾으면 → loginUser에 값 들어감

- 못 찾으면 → {} 그대로 유지

그래서 반드시 검사해야 함


```js
if (isExist(loginUser)) {
  // 아이디 존재
} else {
  // 아이디 없음
}
```

이때 쓰는 게 바로

```js
Object.keys(obj).length
```

이 부분이 빈 객체 확인이 실제로 쓰이는 대표 예시다 


## 3. route란 무엇인가 (Express)
🔹 **route 개념**

route란
- URL + HTTP 메서드(GET/POST/PUT/DELETE)에 따라
- 어떤 코드가 실행될지를 정해놓은 규칙

```js
app.get('/channels', handler)
```

- /channels 로 GET 요청이 오면

- handler 함수 실행

## 4. app.route()를 쓰는 이유 (channel_demo.js)

🔹 **기존 방식**

```js
app.get('/channels', ...)
app.post('/channels', ...)
```


🔹 **route 방식 (강의 코드)**

```js
app.route('/channels')
   .get(...)
   .post(...)
```
같은 URL을 묶어서 관리


## 5. route 구조 한 눈에 보기

```js
app.route('/channels')
  .get()    // 전체 조회
  .post()   // 생성
```
```js
app.route('/channels/:id')
  .get()    // 개별 조회
  .put()    // 수정
  .delete() // 삭제
```

이게 바로 REST API 기본 구조
