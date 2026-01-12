# 데이터베이스(Database)

데이터베이스는 여러 데이터를 통합하여 저장하고 관리하는 **구조화된 데이터 집합**이다.  
데이터를 규칙적으로 구조화함으로써 **중복을 줄이고**, **빠른 검색·수정·삭제**가 가능하다.

## 데이터베이스의 목적

- 데이터 중복 방지  
- 데이터 무결성 유지  
- 대량 데이터의 효율적 관리  

---

# DBMS (Database Management System)

DBMS는 데이터베이스를 **생성, 관리, 제어**하기 위한 소프트웨어이다.  
사용자는 DBMS를 통해 데이터베이스에 접근하며, **직접 파일을 다루지 않는다**.

## 대표적인 DBMS

- Oracle Database  
- MySQL  
- MariaDB  

---

# SQL (Structured Query Language)

SQL은 DBMS에 **데이터 작업을 요청하는 표준 언어**이다.  
데이터를 직접 다루는 것이 아니라, **명령을 통해 DBMS에 작업을 지시**한다.

## SQL로 수행할 수 있는 주요 작업

- 데이터 생성  
- 데이터 조회  
- 데이터 수정  
- 데이터 삭제  

---

# 대표적인 SQL 명령어 역할

**INSERT** (삽입)

- 테이블에 새로운 데이터(행)를 추가
기존 데이터에는 영향을 주지 않음

**SELECT** (조회)

- 테이블에 저장된 데이터를 읽기 전용으로 조회
조건을 사용해 원하는 데이터만 선택 가능

**UPDATE** (수정)

- 이미 저장된 데이터의 값을 변경
조건을 지정하지 않으면 전체 데이터가 변경될 수 있어 주의 필요

**DELETE** (삭제)

- 조건에 맞는 데이터를 테이블에서 제거

## 대표적인 SQL 명령어

- **INSERT** : 데이터 삽입  
- **SELECT** : 데이터 조회  
- **UPDATE** : 데이터 수정  
- **DELETE** : 데이터 삭제  

---

## 조건을 이용한 데이터 조회

특정 데이터만 조회하기 위해 `WHERE` 조건을 사용한다.

```sql
SELECT * FROM member
WHERE id = 'tennisking';

```
## 실습
**SQL 구문**
1. DB 조회
    ```shell
    MariaDB [(none)]> SHOW DATABASES;
    +--------------------+
    | Database           |
    +--------------------+
    | information_schema |
    | mysql              |
    | performance_schema |
    | sys                |
    +--------------------+
    ```
2. DB 생성
    ```shell
    MariaDB [(none)]> CREATE DATABASE Tennis;

    // result
    MariaDB [(none)]> SHOW DATABASES;
    +--------------------+
    | Database           |
    +--------------------+
    | Tennis             |
    | information_schema |
    | mysql              |
    | performance_schema |
    | sys                |
    +--------------------+
    ```
3. DB 조회
    ```shell
    MariaDB [(none)]> USE Tennis;
       Database changed
    ```
    
4. Table 생성
    ```shell
    MariaDB [Tennis]> CREATE TABLE member 
        -> (
        ->  id VARCHAR(30),
        ->  name VARCHAR(30),
        ->  pwd VARCHAR(30)
        -> );

    // result
    MariaDB [Tennis]> SHOW TABLES;
    +------------------+
    | Tables_in_Tennis |
    +------------------+
    | member           |
    +------------------+
    ```
5. Data 삽입
    ```shell
    MariaDB [Tennis]> INSERT INTO member
        -> VALUES ('KBS', 'KimByungSung', 'aaaaa');
    
    // result
    // ID 컬럼 조회
    MariaDB [Tennis]> SELECT id FROM member;
    +------+
    | id   |
    +------+
    | KBS  |
    +------+

    // 모든 데이터 조회
    MariaDB [Tennis]> SELECT * FROM member;
    +------------+--------------+-------+
    | id         | name         | PWD   |
    +------------+--------------+-------+
    | KBS        | KimByungSung | aaaaa |
    | tennisking | ByungSung    | bbbbb |
    | programmer | ByungSungKim | ccccc |
    +------------+--------------+-------+

    // WHERE 절 사용하여 특정 조건의 데이터 조회
    MariaDB [Tennis]> SELECT * FROM member
        -> WHERE id = 'tennisking';
    +------------+-----------+-------+
    | id         | name      | PWD   |
    +------------+-----------+-------+
    | tennisking | ByungSung | bbbbb |
    +------------+-----------+-------+
    ```
6. Data 수정
    ```shell
     MariaDB [Tennis]> UPDATE member
        -> SET pwd = 'zzzzz'
        -> WHERE id = 'tennisking';
    
    // result
    MariaDB [Tennis]> SELECT * FROM member;
    +------------+--------------+-------+
    | id         | name         | PWD   |
    +------------+--------------+-------+
    | KBS        | KimByungSung | aaaaa |
    | tennisking | ByungSung    | zzzzz |
    | programmer | ByungSungKim | ccccc |
    +------------+--------------+-------+
    ```
7. Data 삭제
    ```shell
    MariaDB [Tennis]>  DELETE FROM member
        -> WHERE name = 'ByungSung';
    
    // result
    MariaDB [Tennis]> SELECT * FROM member;
    +------------+--------------+-------+
    | id         | name         | PWD   |
    +------------+--------------+-------+
    | KBS        | KimByungSung | aaaaa |
    | programmer | ByungSungKim | ccccc |
    +------------+--------------+-------+
    ```
