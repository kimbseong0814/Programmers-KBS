# 좋아요 결과 핵심 정리 (26.02.24)

---
## 좋아요 추가 API: `POST /likes/:bookId`

 - Body: `{ "user_id": 1 }`

 - 결과: `affectedRows: 1` 확인 → `likes` 테이블에 `(user_id, liked_book_id)` row 생성

### POST: 좋아요 추가 결과
<img width="385" height="589" alt="스크린샷 2026-02-13 152902" src="https://github.com/user-attachments/assets/9b11110b-bd47-495c-866a-810871ad4575" />

### mySQL workbench: 좋아요 추가 결과
<img width="165" height="97" alt="스크린샷 2026-02-13 152910" src="https://github.com/user-attachments/assets/f45d3ee4-3401-4cf3-8176-13c3835f8177" />

---
## 좋아요 삭제 API: `DELETE /likes/:bookId`

  - Body: `{ "user_id": 1 }`

  - 결과: `affectedRows: 1` 확인 → 해당 row 삭제

### POST: 좋아요 삭제 결과
<img width="303" height="531" alt="스크린샷 2026-02-13 152928" src="https://github.com/user-attachments/assets/9460401a-96c1-4fbb-a9ae-21c07184ae89" />

### mySQL workbench: 좋아요 삭제 결과
<img width="160" height="78" alt="스크린샷 2026-02-13 152938" src="https://github.com/user-attachments/assets/fc200676-9a5e-439b-93fa-b25d2979abdc" />

---
## 도서 상세 조회: `GET /books/:bookId` (Body에 `{ "user_id": 1 }`)

  - `likes`: 해당 도서의 좋아요 총 개수(count)

  - `liked`: 해당 유저가 좋아요 했는지 여부(EXISTS, 0/1)

### POST: 도서 상세 조회 결과
<img width="303" height="547" alt="스크린샷 2026-02-13 155237" src="https://github.com/user-attachments/assets/eabf72e4-1bca-4de7-b14d-a162931a17ce" />

