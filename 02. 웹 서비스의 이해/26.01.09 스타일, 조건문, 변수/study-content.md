## CSS란?

### CSS 정의

- **CSS (Cascading Style Sheets)** 는  
  HTML 문서를 **꾸며주는 언어**이다.

- HTML이 구조를 담당한다면,  
  CSS는 **디자인(색상, 크기, 위치 등)** 을 담당한다.

---

### CSS의 특징

- 문서를 한 번에 꾸미는 것이 아니라  
  **HTML 태그 하나하나에 스타일을 적용**한다.

- HTML과 역할이 분리되어  
  **유지보수가 쉽다.**

---

## 2️⃣ HTML에 CSS를 적용하는 방법 (3가지)

### ① 인라인 스타일 (inline)

- HTML 태그 **안에 직접 작성**

```html
<p style="color: red;">텍스트</p>
② 내부 스타일 시트 (internal style sheet)

HTML 문서 안에 <style> 태그로 작성

<style>
p {
  color: rgb(14, 0, 139);
}
</style>

③ 외부 스타일 시트 (external style sheet)

CSS를 별도 파일로 작성 후 연결

<link rel="stylesheet" href="login.css">

```
---

## 3️⃣ 스크립트 언어란?
스크립트 언어의 특징

독립적인 프로그램 언어는 아님

프로그램 내부에서 동작을 제어하는 역할

실행 환경이 발전하면서
최근에는 단독 프로그램도 가능해짐 (JavaScript 등)

---

## 4️⃣ 함수(Function)
함수란?

특정 기능을 수행하는 코드 덩어리

반복되는 작업을 묶어서 사용

함수 정의 형태
function 함수이름() {
  // 함수가 할 일
}

함수 호출
함수이름();


괄호 ()는 반드시 필요

---

## 5️⃣ JavaScript란?
JavaScript의 역할

HTML과 CSS를 동적으로 제어

사용자와의 상호작용 처리

웹 페이지에 동작(Behavior) 을 추가하는 언어

---

## 6️⃣ HTML에 JavaScript 적용하는 방법 (3가지)
① 인라인 스크립트

사용자 이벤트 발생 시 실행

```html
<input id="login_btn" type="button" value="login" onclick="myfunction()">

<script>
function myfunction() {
  alert('1');
  alert('2');
  alert('3');
}
</script>

```

구조와 로직이 섞이므로 권장 ❌

② 내부 스크립트 (internal script)

```html
<script>
alert("Hello");
</script>

```
③ 외부 스크립트 (external script)

JavaScript 파일을 분리하여 연결

```html
<script src="script.js"></script>

```

가장 권장되는 방식 ⭕

유지보수 및 협업에 유리

---

## 7️⃣ if문 (조건문)
if문이란?

조건에 따라 다른 결과를 선택

프로그램의 분기 처리

if (조건) {
  // 조건이 참일 때 실행
}

---

## 8️⃣ 변수(Variable)
변수란?

데이터를 담는 상자

숫자, 문자, element 등 저장 가능

변수 선언 예시
let box = 10;
let name = "user";
let element = document.getElementById("txt_id");


변수는 데이터를 임시로 저장하고
이후 코드에서 재사용하기 위해 사용한다.

