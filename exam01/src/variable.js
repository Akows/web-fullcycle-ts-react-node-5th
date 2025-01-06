// 1. 변수 선언
// ES6 이전에는 var를 사용했으나, 현재는 let과 const를 주로 사용합니다.

// var: 재선언과 재할당이 가능하지만, 호이스팅 문제로 권장되지 않음
var oldVariable = "이 변수는 var로 선언되었습니다.";
console.log(oldVariable);

// let: 재할당 가능하지만 재선언은 불가능. 블록 스코프를 가짐
let mutableVariable = "이 변수는 let으로 선언되었습니다.";
console.log(mutableVariable);
mutableVariable = "값을 변경할 수 있습니다.";
console.log(mutableVariable);

// const: 재할당 불가능. 블록 스코프를 가짐
const immutableVariable = "이 변수는 const로 선언되었습니다.";
console.log(immutableVariable);
// immutableVariable = "값을 변경할 수 없습니다."; // 오류 발생