# 강의 내용(26.01.26)

## 1️. forEach
### 개념
forEach는 **배열(Array)이나 Map의 각 요소를 순회(iteration)** 하면서
콜백 함수를 실행하는 메서드이다.

- 요소 개수만큼 자동 반복

- 반환값(return)이 없다

- 주 목적: 출력, 처리

### 배열에서 forEach
```js
const arr = [1, 2, 3, 4, 5];

arr.forEach(function (value, index, array) {
  console.log(value, index, array);
});
```
- value : 현재 요소

- index : 인덱스

- array : 원본 배열

### Map에서 forEach
```js
let map = new Map();
map.set(7, "seven");
map.set(9, "nice");

map.forEach(function (value, key, map) {
  console.log(value, key);
});
```
- **Map의 forEach는 (value, key) 순서**로 전달된다.

---
## 2. delete (Map 삭제)
### 개념
delete는 **Map에서 특정 key에 해당하는 데이터를 제거**하는 메서드이다.

```js
db.delete(id);
```
- 성공 시 true

- 존재하지 않으면 false

### 실제 API 코드 흐름
```js
app.delete('/youtubers/:id', (req, res) => {
  let id = parseInt(req.params.id);

  const youtuber = db.get(id);
  if (youtuber === undefined) {
    res.json({ message: '없는 유튜버입니다.' });
  } else {
    db.delete(id);
    res.json({ message: '삭제 완료' });
  }
});
```
- **삭제 전 존재 여부 확인은 필수** (안 하면 런타임 오류 발생 가능)

---
## 3. PUT (데이터 수정)
### 개념
PUT은 **기존 리소스를 수정(Update)** 할 때 사용하는 HTTP 메서드이다.

- 전체 또는 주요 필드 수정

- REST API에서 **Update 역할**

### 실제 PUT 구현 예제

```js
app.put('/youtubers/:id', (req, res) => {
  let id = parseInt(req.params.id);
  const youtuber = db.get(id);

  if (youtuber === undefined) {
    res.json({ message: '없는 유튜버입니다.' });
  } else {
    youtuber.channelTitle = req.body.channelTitle;
    db.set(id, youtuber);

    res.json({ message: '채널명 수정 완료' });
  }
});
```
- PUT은 **POST와 달리 기존 데이터가 전제**다.

---
## 4. 리팩토링이란?
### 정의

리팩토링(Refactoring)은
**기능은 그대로 유지하면서 코드 구조를 개선하는 작업**이다.

### 목적

- 가독성 향상

- 중복 제거

- 유지보수성 개선

- 버그 발생 가능성 감소

### 예시

```js
// 리팩토링 전
if (youtuber == undefined) {
  ...
}

// 리팩토링 후
if (!youtuber) {
  ...
}
```
- 동작 결과는 같지만, 더 읽기 쉽고 관리하기 쉬운 코드로 개선

---
## 5. HTTP 상태 코드
### 개념
HTTP 상태 코드는 서버가 요청을 어떻게 처리했는지 알려주는 숫자 코드이다.

### 대표 상태 코드
```
코드	의미
200	요청 성공
201	생성 성공
400	잘못된 요청
404	리소스 없음
500	서버 오류
```
### Express 예시

```js
res.status(404).json({
  message: '데이터를 찾을 수 없습니다.'
});
```

- 상태 코드는 클라이언트와 서버의 약속(Protocol) 이다.
