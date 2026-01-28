const obj1 = {}
const obj2 = { message : "안 빔"}
const num = 1
const str1 = "one"
const str2 = "" // 문자열도 객체입니다

console.log(Object.keys(obj1)) // length === 0

console.log(Object.keys(obj2)) // length === 1

// console.log (Object.keys(num).length === 0)
console.log (Object.keys(str1))
console.log (Object.keys(str2))

function isEmpty(obj) {

    if (obj.constructor === Object) // 자바 스크립트에 기본 문법
    if (Object.keys(obj).length === 0) {
        return true;
    } else {
        return false;
    }
}