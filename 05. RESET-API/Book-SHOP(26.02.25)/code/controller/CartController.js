const { StatusCodes } = require('http-status-codes'); // statud code 모듈
const conn = require('../mariadb'); // db 모듈

// 장바구니 담기
const addToCart = (req, res) => {
    const {book_id, quantity, user_id} = req.body;

    const sql = "INSERT INTO cartitems (book_id, quantity, user_id) VALUES (?, ?, ?);"; 
    let values = [book_id, quantity, user_id]

    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(results);
    });
}

const getCartItems = (req, res) => {
  const {user_id, selected} = req.body;

  const sql = `
    SELECT cartitems.id, cartitems.book_id, books.title, books.summary, cartitems.quantity, books.price
    FROM cartitems
    LEFT JOIN books ON cartitems.book_id = books.id
    WHERE cartitems.user_id = ? AND cartitems.id IN (?);`;

  const values = [user_id, selected];

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  })
};

const removeCartItems = (req, res) => {
    const {id} = req.params;

    const sql = "DELETE FROM cartItems WHERE id = ?;"; 

    conn.query(sql, id, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(results);
    });
}

module.exports = {
  addToCart,
  getCartItems,
  removeCartItems
};