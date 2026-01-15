function first() {
    console.log("첫 째")
}

function second() {
    console.log("둘 째")
}

function third() {
    console.log("셋 째")
}

first();
setTimeout(second, 2000); // second();
third();

