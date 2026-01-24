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

---

### 1. 유튜버 삭제 (DELETE)
DELETE 요청
<img width="233" height="224" alt="스크린샷 2026-01-23 151745" src="https://github.com/user-attachments/assets/fb2d3e27-f89f-4d0e-93a8-3f2e3b64205d" />

```
db.delete(id);
```

- Map의 delete() 메서드를 이용해 데이터 삭제

- 삭제 성공 시 메시지 응답

- 상태 코드: 200 OK

---
### 2. 유튜버 정보 수정 (PUT)
PUT 요청
<img width="261" height="265" alt="스크린샷 2026-01-23 151808" src="https://github.com/user-attachments/assets/7ccfde50-5486-46ef-ba26-c4750202d50d" />



요청 Body:
```
{
  "channelTitle": "쉬고 싶다"
}
```

- 기존 데이터 수정

- POST는 생성, PUT은 수정이라는 차이를 실습으로 확인

### 3. 수정 후 전체 조회 확인
<img width="260" height="284" alt="스크린샷 2026-01-23 161900" src="https://github.com/user-attachments/assets/8c1d0ee3-00f4-4fd9-90c6-527f6b70162e" />


<img width="264" height="204" alt="스크린샷 2026-01-23 161842" src="https://github.com/user-attachments/assets/a297d237-bbb3-435e-9220-053c8adb33ff" />


<img width="271" height="234" alt="스크린샷 2026-01-23 161917" src="https://github.com/user-attachments/assets/f748788f-ed1d-4ed1-a6ff-8901a2b68c14" />

PUT 요청 이후 데이터가 정상적으로 변경된 것을 확인


---

## 오늘 배운 점 요약 및 느낀 점
Express를 이용해 REST API의 기본 구조를 직접 구현해보며 GET, POST, PUT, DELETE의 차이를 명확히 이해할 수 있었습니다. 특히 Postman으로 요청을 직접 보내고 응답을 확인하면서 서버 동작 흐름이 눈에 들어왔습니다. 단순 문법이 아니라 실제 API 흐름을 이해하는 계기가 되었습니다.
