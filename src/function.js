// 2. 함수 생성
// 함수는 일급 객체로, 여러 가지 방법으로 생성할 수 있습니다.

// 함수 선언식(Function Declaration)
// 함수 이름을 사용하여 선언합니다. 호이스팅이 적용되어 함수 선언 전에 호출 가능.
function greet() {
    console.log("Hello! 이 함수는 선언식으로 만들어졌습니다.");
}
greet();

// 함수 표현식(Function Expression)
// 함수를 변수에 할당하여 선언합니다. 호이스팅이 적용되지 않아 선언 후에만 호출 가능.
const sayHi = function () {
    console.log("Hi! 이 함수는 표현식으로 만들어졌습니다.");
};
sayHi();

// 화살표 함수(Arrow Function)
// 간결한 문법으로 함수를 선언합니다. this 바인딩이 기존 함수와 다릅니다.
const add = (a, b) => {
    return a + b;
};
console.log("화살표 함수로 더하기: ", add(3, 4));

// 한 줄로 간결하게 표현할 수 있는 경우, return과 중괄호 생략 가능
const multiply = (a, b) => a * b;
console.log("화살표 함수로 곱하기: ", multiply(3, 4));

// 즉시 실행 함수(Immediately Invoked Function Expression, IIFE)
// 선언과 동시에 실행되는 함수.
(function () {
    console.log("이 함수는 즉시 실행됩니다!");
})();

// 3. 고차 함수
// 다른 함수를 인자로 받거나 반환할 수 있는 함수
const executeFunction = (func) => {
    console.log("고차 함수 내부에서 실행:");
    func();
};
executeFunction(() => console.log("인자로 전달된 함수 실행"));

// 4. 함수에서 기본 매개변수 설정
const greetWithName = (name = "익명") => {
    console.log(`안녕하세요, ${name}님!`);
};
greetWithName("철수");
greetWithName(); // 기본값 사용