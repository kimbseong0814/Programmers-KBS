# 좋아요 결과 핵심 정리 (26.02.24)


좋아요 추가 API: POST /likes/:bookId

Body: { "user_id": 1 }

결과: affectedRows: 1 확인 → likes 테이블에 (user_id, liked_book_id) row 생성

좋아요 삭제 API: DELETE /likes/:bookId

Body: { "user_id": 1 }

결과: affectedRows: 1 확인 → 해당 row 삭제

도서 상세 조회: GET /books/:bookId (Body에 { "user_id": 1 })

likes: 해당 도서의 좋아요 총 개수(count)

liked: 해당 유저가 좋아요 했는지 여부(EXISTS, 0/1)