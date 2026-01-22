import express from 'express'

const app = express()

app.listen (814, () => { 
    console.log('814 포트에서 서버 구동 중') 
})

app.get ('/:id', (req, res) => { 
    let {id} = req.params
    id = parseInt (id) //"숫자" => 숫자

    if (db.get(id) == undefined) {
       res.json({
        message: "없는 상품입니다."
       })
    } else {
       const product = db.get(id)
        product["id"] = id // product.id = id

        res.json(product)
    }

})

let db = new Map()

let NoteBook = {
    productName : "NoteBook",
    price : 200000
}

let Cup = {
    productName : "Cup",
    price : 3000
}

let Chair = {
    productName : "Chair",
    price : 20000
}

let Poster = {
    productName : "Poster",
    price : 10000
}
// 키로 벨류를 찾을 수 있는 한 쌍을 저장
db.set(1, NoteBook) 
db.set(2, Cup)
db.set(3, Chair)
db.set(4, Poster)

console.log(db)
console.log(db.get(1))
// console.log(db.get("1"))
console.log(db.get(2))
console.log(db.get(3))