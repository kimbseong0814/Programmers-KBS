## 1. 병합(Merge)이란?

- 브랜치를 만드는 목적은 **협업**
- 따라서 작업이 끝나면 **반드시 기준 브랜치로 다시 합쳐야 함**
- 이때 사용하는 개념이 **병합(Merge)**

**기본 흐름**  
작업 브랜치 → 기준 브랜치(main)로 병합

---

## 2. 왜 main 브랜치를 바로 수정하지 않을까?

- main 브랜치는 **항상 정상 동작해야 하는 코드**
- 그래서 일반적으로:
  - main 직접 수정 ❌
  - **feature → main 병합만 허용**

- GitHub에서는 이를 **브랜치 보호(Protected Branch)** 라고 한다

---

## 3. 3-way merge 전략

### 상황 예시

- main에서 `feature/login` 브랜치 생성
- 이후:
  - main 브랜치에 새로운 커밋 발생
  - feature/login 브랜치에도 새로운 커밋 발생

→ **두 브랜치가 서로 다른 변경 이력을 가진 상태**

---

### 3-way merge란?

- main과 feature 브랜치의 **공통 조상 커밋**을 기준으로
- 각각의 변경 사항을 비교하여 병합
- 이 과정에서 **merge commit** 이 생성됨

**특징**

- 병합 시점이 명확히 기록됨
- 협업 환경에서 필수적인 병합 방식
- 충돌(conflict) 발생 가능 → 사람이 직접 해결

---

## 4. 3-way + fast-forward는 무슨 의미인가?

- 기본 병합 전략은 **3-way merge**
- 하지만 main 브랜치에 변경 사항이 없다면:
  - merge commit을 만들지 않고
  - **fast-forward 방식으로 병합**

**즉**

- 상황에 따라:
  - fast-forward
  - 3-way merge
- Git이 **자동으로 병합 방식을 판단**

---

## 5. Pull Request(PR)의 역할

### Pull Request를 사용하는 이유

- main 브랜치 보호
- 병합 전에:
  - 코드 리뷰
  - 충돌 여부 확인
  - 변경 내용 설명(PR 메시지)

**PR = 병합 요청서**

---

### PR 기본 흐름

1. `feature/login` 브랜치에서 작업 완료
2. GitHub에서 Pull Request 생성
3. 코드 리뷰 및 충돌 확인
4. merge 실행
5. feature 브랜치 삭제

---

## 6. merge 후 정리 작업

### GitHub와 로컬 브랜치 동기화

```bash
git fetch -p
git checkout main
git pull origin main
git branch -d feature/login
```
---
## 7. GitHub 화면에서 보이는 브랜치 의미
01. `main`
기준 브랜치 

02. `feature/login`
기능 개발 중인 작업 브랜치

03. `Pull Request 병합 후`
feature 브랜치는 일반적으로 삭제됨
