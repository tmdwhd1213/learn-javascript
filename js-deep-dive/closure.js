// 클로저: 함수가 선언된 렉시컬 환경
const x = 1;

function outerFunc() {
  const x = 10;
  function innerFunc() {
    console.log(x); // 10
  }
  innerFunc();
}
outerFunc();

// 아래는 x가 전역 x인 1이 나온다.
// 그 이유는 JS가 렉시컬 스코프를 따르는 프로그래밍 언어이기 때문.
// 어디서 호출했냐?X -> 어디에 함수를 정의했냐
// function outerFunc() {
//   const x = 10;
//   innerFunc();
// }

// function innerFunc() {
//   console.log(x); // 1
// }
// outerFunc();
// -------------------------------------------------

// function foo() {
//   const x = 10;
//   bar();
// }
// function bar() {
//   console.log(x);
// }
// foo(); // 1
// bar(); // 1

// 렉시컬 스코프: 렉시컬 환경의 "외부 렉시컬 환경에 대한 참조"에 저장할 참조값.
// 즉 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정된다.

// 클로저와 렉시컬 환경
function outer() {
  const x = 10;
  // 함수 표현식으로 정의했기에 런타임에 평가된다.
  const inner = function () {
    console.log(x);
  };
  return inner;
}

const innerF = outer();
innerF();
