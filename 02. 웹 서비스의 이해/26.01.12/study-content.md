# 01. 백엔드

백엔드는 웹 서버, 애플리케이션 서버, 데이터베이스로 구성된다.
각 구성 요소는 역할이 분리되어 있으며, 요청을 단계적으로 처리한다.

웹 서버는 동적 로직을 직접 수행하지 않고,
필요한 경우 애플리케이션 서버로 요청을 전달한다.

* 정적 페이지: 화면의 내용/ 데이터 등의 변동이 없는 페이지를 말한다.
* 동적 페이지: 데이터 처리/ 연산을 통해 화면의 내용, 데이터가 변하는 페이지를 말한다.

---

# 02. Node.js

Node.js는 자바스크립트를 브라우저 밖에서 실행할 수 있게 해주는 실행 환경이다.  
이를 통해 자바스크립트로 백엔드 서버를 구현할 수 있다.

- 서버 프로그램 작성 가능
- HTTP 요청과 응답 처리 가능
- 자바스크립트 하나로 프론트엔드와 백엔드 모두 개발 가능

---

# Node.js 서버 코드 개념 설명

```html
let http = require('http');
```
Node.js 기본 모듈인 http를 불러온다.

```html
function onRequest(request, response)
```

클라이언트 요청이 들어올 때 실행되는 함수이다.

```html
response.writeHead(200, {'Content-Type': 'text/html'});
```

HTTP 상태 코드와 응답 타입을 설정한다.
200은 정상 응답을 의미한다.

```html
response.write('Hello Node.js');
response.end();
```
클라이언트에게 보낼 응답 내용을 작성하고 응답을 종료한다.

```html
http.createServer(onRequest).listen(8888);
```

8888번 포트에서 서버를 실행한다.

---

# HTTP 프로토콜과 Header

HTTP는 클라이언트와 서버가 통신할 때 사용하는 규칙(프로토콜)이다.  
서버의 응답에는 Header 정보가 포함된다.

Header: 통신 상태를 알려주는 역.

- 상태 코드(Status Code)
  - 200 : 정상 처리
  - 404 : 요청한 자원을 찾을 수 없음
  - 500 : 서버 내부 오류
- 응답 데이터 타입
  - HTML
  - JSON 등
 
# 03. Server와 Router의 역할

Server는 클라이언트로부터 요청을 수신하고 응답을 반환하는 주체이다.
Router는 요청에 포함된 URL을 기준으로 처리 위치를 결정한다.
URL은 요청이 향하는 위치와 목적을 나타내는 주소이다.


## 실습

메인페이지 브라우저 화면 캡쳐

<img width="642" height="648" alt="스크린샷 2026-01-10 174233" src="https://github.com/user-attachments/assets/262d8c73-04ae-4a3c-bf5b-444dc4accd2f" />

start() 함수 실행시 브라우저에 본인이름 보이게 코드 작성해서 실행 화면 캡쳐

<img width="638" height="214" alt="스크린샷 2026-01-10 180602" src="https://github.com/user-attachments/assets/3bc68767-67ac-4eb6-925b-0d2d79c56310" />


