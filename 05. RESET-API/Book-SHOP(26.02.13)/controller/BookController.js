const { StatusCodes } = require('http-status-codes'); // statud code 모듈
const conn = require('../mariadb'); // db 모듈


// 전체 도서 조회  GET /books
// 카테고리별 목록 조회
const allBooks = (req, res) => {
    let {category_id} =  req.query;

    if(category_id) {
        let sql = "SELECT * FROM books WHERE category_id=?";
        conn.query(sql, category_id,
            (err, results) => {
                if(err) {
                    console.log(err);
                    return res.status(StatusCodes.BAD_REQUEST).end();
                }

                if(results.length)
                    return res.status(StatusCodes.OK).json(results);
                else
                    return res.status(StatusCodes.NOT_FOUND).end();
        })

    } else {
        // (요약된) 전체 도서 리스트
        let sql = "SELECT * FROM books"
        conn.query(sql, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }
            return res.status(StatusCodes.OK).json(results);
        })
    }

};

// 개별 도서 조회  GET /books/:id
const bookDetail = (req, res) => {
    let {id} = req.params;

    let sql = "SELECT * FROM books WHERE id=?"
    conn.query(sql, id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if(results[0]) 
            return res.status(StatusCodes.OK).json(results[0]);
        else
            return res.status(StatusCodes.NOT_FOUND).end();
    });
};
  


module.exports = {
  allBooks,
  bookDetail,
};