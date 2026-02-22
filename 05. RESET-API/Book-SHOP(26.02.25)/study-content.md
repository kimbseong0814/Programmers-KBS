# 1) 구현 결과 요약(26.02.25)

## 구현 기능: 장바구니 상품 목록 조회 (Cart Items List)

- **라우팅**
    - `GET /carts` : 장바구니 아이템 목록 조회 / 선택한 장바구니 상품 목록 조회 carts
- **조회 로직**
    - `cartitems` 테이블과 `books` 테이블을 `LEFT JOIN`하여
        - 장바구니 아이템 id, book_id, quantity(장바구니 수량)
        - 도서 title, summary, price(도서 정보)
            
            를 한 번에 조회 
            CartController
            
    - `WHERE cartitems.user_id = ? AND cartitems.id IN (?)` 조건으로
        - 특정 사용자 기준
        - 선택한 장바구니 아이템만 필터링 CartController

---
## 함께 구현된 기능

- `POST /carts` : 장바구니 담기 (book_id, quantity, user_id 저장) carts CartController
- `DELETE /carts/:id` : 장바구니 항목 삭제

---
## 결과
### 장바구니 담기 
- POST /carts로 book_id, quantity, user_id를 받아 cartitems 테이블에 저장. 

<img width="373" height="592" alt="스크린샷 2026-02-22 131016" src="https://github.com/user-attachments/assets/a4f6977a-ffe5-485a-9569-72bbc5f9d54e" />

---

### 장바구니 상품 목록 조회
- GET /carts에서 cartitems와 books를 LEFT JOIN해 장바구니 id, 수량 + 도서(title, summary, price) 정보를 한 번에 조회. 

### 선택한 장바구니 상품만 조회 
- user_id와 selected(장바구니 item id 목록) 조건을 적용해 cartitems.id IN (...) 형태로 선택 구매용 목록 필터링 조회 구현. 

<img width="504" height="613" alt="스크린샷 2026-02-22 131852" src="https://github.com/user-attachments/assets/09d6cdc4-6452-4bd7-99cd-751df06a3937" />

---
### 장바구니 항목 삭제  
- DELETE /carts/:id로 특정 장바구니 item을 삭제.

<img width="1469" height="633" alt="스크린샷 2026-02-22 131938" src="https://github.com/user-attachments/assets/9d41a175-be69-4aa8-a466-7682bd749dcc" />


