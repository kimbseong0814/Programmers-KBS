let nodejsBook = {
    title : "Node.js를 공부해보자",
    price : 20000,
    description : "이 책 좋음 왜? 누가 지음"
};

function print(book) {
    console.log("책 제목: " + book.title);
    console.log("책 가격: " + book.price + "원");
    console.log("책 설명: " + book.description);
}

print(nodejsBook);