# 1. DB 테이블 생성 및 데이터 확인
  - 강의 내용(26.01.29)

## 1-1. Board 스키마 생성
### DB 생성 및 선택

```sql
CREATE DATABASE Board;
USE Board;
```
### 테이블 목록 확인

```sql
SHOW TABLES;
+-----------------+
| Tables_in_Board |
+-----------------+
| user            |
+-----------------+
```

---
## 1-2. 사용자 테이블 생성 (user)

### 테이블 생성

```sql
CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  job VARCHAR(100),
  birth DATE,
  PRIMARY KEY (id)
);
```

### 테이블 구조 확인
```sql
DESC user;

+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int(11)      | NO   | PRI | NULL    | auto_increment |
| name  | varchar(30)  | NO   |     | NULL    |                |
| job   | varchar(100) | YES  |     | NULL    |                |
| birth | date         | YES  |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
```

---
## 1-3. 사용자 데이터 삽입

### 데이터 삽입

```sql
INSERT INTO user (name, job, birth)
VALUES ("SB", "actor", "780512");
```

### 데이터 조회

```sql
SELECT * FROM user;

+----+------+-------+------------+
| id | name | job   | birth      |
+----+------+-------+------------+
|  1 | SB   | actor | 1978-05-12 |
+----+------+-------+------------+
```

---
## 1-4. 게시글 테이블 생성 (posts)

### 테이블 생성

```sql
CREATE TABLE posts (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  content VARCHAR(2000),
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);
```

### 테이블 구조 확인

```sql
DESC posts;

+------------+---------------+------+-----+---------------------+----------------+
| Field      | Type          | Null | Key | Default             | Extra          |
+------------+---------------+------+-----+---------------------+----------------+
| id         | int(11)       | NO   | PRI | NULL                | auto_increment |
| title      | varchar(100)  | NO   |     | NULL                |                |
| content    | varchar(2000) | YES  |     | NULL                |                |
| created_at | timestamp     | YES  |     | current_timestamp() |                |
+------------+---------------+------+-----+---------------------+----------------+
```

---
## 1-5. 게시글 데이터 삽입

### 데이터 삽입

```sql
INSERT INTO posts (title, content)
VALUES ("title1", "content1");
```

### 데이터 조회

```sql
SELECT * FROM posts;

+----+--------+----------+---------------------+
| id | title  | content  | created_at          |
+----+--------+----------+---------------------+
|  1 | title1 | content1 | 2026-01-30 07:40:42 |
+----+--------+----------+---------------------+
```

---
## 1-6. 게시글 테이블에 수정일자(updated_at) 추가

### 컬럼 추가

```sql
ALTER TABLE posts
ADD COLUMN updated_at DATETIME
DEFAULT NOW()
ON UPDATE NOW();
```

### 테이블 구조 확인

```sql
DESC posts;

+------------+---------------+------+-----+---------------------+-------------------------------+
| Field      | Type          | Null | Key | Default             | Extra                         |
+------------+---------------+------+-----+---------------------+-------------------------------+
| id         | int(11)       | NO   | PRI | NULL                | auto_increment                |
| title      | varchar(100)  | NO   |     | NULL                |                               |
| content    | varchar(2000) | YES  |     | NULL                |                               |
| created_at | timestamp     | YES  |     | current_timestamp() |                               |
| updated_at | datetime      | YES  |     | current_timestamp() | on update current_timestamp() |
+------------+---------------+------+-----+---------------------+-------------------------------+
```

---
## 1-7. 게시글 수정 (id = 2)

### 게시글 수정

```sql
UPDATE posts
SET content = "updated!"
WHERE id = 2;
```

### 수정 결과 확인

```sql
SELECT * FROM posts;

+----+--------+----------+---------------------+---------------------+
| id | title  | content  | created_at          | updated_at          |
+----+--------+----------+---------------------+---------------------+
|  1 | title1 | content1 | 2026-01-30 07:40:42 | 2026-01-30 08:00:46 |
|  2 | title2 | updated! | 2026-01-30 08:04:54 | 2026-01-30 08:05:19 |
+----+--------+----------+---------------------+---------------------+
```
→ `UPDATE` 발생 시 `updated_at` 컬럼이 **자동으로 갱신됨**

---
## 1-8. 게시글 테이블에 작성자 컬럼 추가

### 작성자 컬럼 추가

```sql
ALTER TABLE posts
ADD COLUMN user_id INT;
```
### (Key 컬럼에서 보이는) MUL 의미

- MUL
  - 중복 가능 인덱스(Non-Unique Index)
  - 여러 행에서 같은 값 사용 가능
  - 보통 **JOIN / FK 후보 컬럼**에서 자주 보임

---
## 1-9. 게시글 + 사용자 조인(JOIN)

### ① 전체 컬럼 조회

**LEFT JOIN 실행**

```sql
SELECT *
FROM posts
LEFT JOIN user ON posts.user_id = user.id;
```

```sql
실행 결과

+----+--------+----------+---------------------+---------------------+---------+------+------+-------+------------+
| id | title  | content  | created_at          | updated_at          | user_id | id   | name | job   | birth      |
+----+--------+----------+---------------------+---------------------+---------+------+------+-------+------------+
|  1 | title1 | content1 | 2026-01-30 07:40:42 | 2026-01-30 08:00:46 | NULL    | NULL | NULL | NULL  | NULL       |
|  2 | title2 | updated! | 2026-01-30 08:04:54 | 2026-01-30 08:05:19 | NULL    | NULL | NULL | NULL  | NULL       |
|  3 | title4 | content4 | 2026-01-30 08:19:03 | 2026-01-30 08:19:03 | 1       | 1    | SB   | actor | 1978-05-12 |
+----+--------+----------+---------------------+---------------------+---------+------+------+-------+------------+
```

### ② 필요한 컬럼만 선택 조회
**컬럼 지정 JOIN**

```sql
SELECT
  posts.id,
  title,
  content,
  created_at,
  updated_at,
  name,
  job,
  birth
FROM posts
LEFT JOIN user ON posts.user_id = user.id;
```

```sql
실행 결과

+----+--------+----------+---------------------+---------------------+------+-------+------------+
| id | title  | content  | created_at          | updated_at          | name | job   | birth      |
+----+--------+----------+---------------------+---------------------+------+-------+------------+
|  1 | title1 | content1 | 2026-01-30 07:40:42 | 2026-01-30 08:00:46 | NULL | NULL  | NULL       |
|  2 | title2 | updated! | 2026-01-30 08:04:54 | 2026-01-30 08:05:19 | NULL | NULL  | NULL       |
|  3 | title4 | content4 | 2026-01-30 08:19:03 | 2026-01-30 08:19:03 | SB   | actor | 1978-05-12 |
+----+--------+----------+---------------------+---------------------+------+-------+------------+
```

---
## 2. 조인(JOIN)을 말로 풀어서 설명하면

게시글에 있는 사용자 번호(`posts.user_id`)랑

사용자 테이블의 사용자 번호(`user.id`)가 같으면

두 테이블을 하나로 붙여서 보여줘

이 문장이 곧 아래 SQL 의미.

```sql
SELECT *
FROM posts
LEFT JOIN user
ON posts.user_id = user.id;
```

- `ON posts.user_id = user.id`

  - **조인 조건**
  - 어떤 기준으로 두 테이블을 붙일지를 정의

- `LEFT JOIN`

  - 게시글(posts)은 전부 보여주고
  - 사용자(user)는 **번호가 맞는 경우만** 붙임
  - 맞는 사용자가 없으면 `NULL`

---
## 3. `user` 테이블 구조와 INSERT 에러가 난 이유

### user 테이블 구조 핵심

```sql
DESC user;
```

- id
  - PK, 자동 증가

- name
  - NOT NULL ❗

- job, birth

  - NULL 허용

## 에러 ①

```sql
INSERT INTO user (job)
VALUES ("developer");
```

### 에러 메시지

```sql
Field 'name' doesn't have a default value
```

### 이유

- name 컬럼은 NOT NULL

- 그런데 INSERT 할 때:

  - name 컬럼 자체를 아예 안 넣음

  - DEFAULT 값도 없음
     - → DB가 “넣을 값이 없다”라고 판단해서 거부

---
## 에러 ②

```sql
INSERT INTO user (name, job)
VALUES (null, "developer");
```

### 에러 메시지

```sql
Column 'name' cannot be null
```

### 이유

- name은 NOT NULL

- 명시적으로 NULL을 넣는 행위 자체가 금지

### 즉,

- ❌ 값 생략 → 안 됨

- ❌ NULL 직접 입력 → 안 됨

- ✅ 실제 문자열 값 입력 → 가능

### 정상 INSERT 예시

```sql
INSERT INTO user (name, job)
VALUES ("홍길동", "developer");
```

---
## 4. MySQL(MariaDB) 날짜 / 시간 타입 개념 정리

### 2-1. DATE

- 날짜만 저장
- 예: 2026-01-31
- 생일, 기념일 등에 사용

### 2-2. DATETIME

- 날짜 + 시간
- 예: 2026-01-31 10:30:00
- **값을 직접 넣거나 직접 관리할 때** 주로 사용

### 2-3. TIME

- 시간만 저장
- 예: 10:30:00
- 재생 시간, 근무 시간 등

### 2-4. TIMESTAMP

- 날짜 + 시간
- **자동 입력 기능이 강점**

```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

- INSERT 시점의 시간이 자동 저장됨
- `ON UPDATE CURRENT_TIMESTAMP`와 같이 쓰면
  - UPDATE 시점도 자동 관리 가능


---
## 5. `DEFAULT` vs `NOT NULL` (이거 헷갈리면 안 됨)

### NOT NULL

- 비어 있으면 안 된다

- 특징:

  - 컬럼을 **아예 빼고 INSERT** → ❌
  - `NULL`을 직접 넣기 → ❌

- 무조건 값이 들어와야 함

### DEFAULT

- 값이 안 들어오면 이 값으로 채워라

- 상황별 동작:
  - 1️. 컬럼을 생략하고 INSERT
  - → `DEFAULT` 값이 자동 입력

  - 2️. `NULL`을 직접 넣으면
  - → DEFAULT **무시**, `NULL`이 들어감
  - (단, 컬럼이 NULL 허용일 때)
