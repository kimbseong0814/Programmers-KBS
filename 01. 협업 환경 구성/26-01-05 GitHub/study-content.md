# GitHub 개념 정리

## 1. GitHub란?

- 원격 저장소(Remote Repository) 서비스
- 로컬에서 Git으로 관리하는 프로젝트를 서버에 저장·백업
- 여러 사람이 동일한 프로젝트로 협업 가능

---

## 2. GitHub의 주요 역할

- 로컬 저장소 코드 백업
- 코드 공유 및 협업
- 변경 이력 관리
- 브랜치 기반 협업 지원

---

## 3. 로컬 저장소와 원격 저장소

- 로컬(Local)
  - 개인 PC에 존재하는 프로젝트 저장소

- 원격(Remote)
  - GitHub 서버에 존재하는 저장소

GitHub는 로컬 저장소의 변경 사항을 업로드하고 공유하기 위한 공간이다.

---

## 4. 브랜치
브랜치란 기존 코드(main)를 기준으로 **독립적인 작업 흐름을 분리하는 기능**이다.  
메인 코드에 영향을 주지 않고 새로운 기능이나 수정 작업을 진행할 수 있다.

---

## 5. 명령어
1. 현재 위치한 branch 확인
`git status`
2. 현재 repository에 생성된 branch 목록 확인
`git branch`
3. 현재 repository에 새로운 branch 만들기
`git branch {newBranchName}`
4. 다른 branch로 옮기기
`git checkout {branchName}`


