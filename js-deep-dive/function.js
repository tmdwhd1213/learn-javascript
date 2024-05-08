var add = new Function("x", "y", "return x + y"); // anonymous함수
console.log(add(1, 3));

// 함수 선언문
function add2(x, y) {
  return x + y;
}
console.dir(add2);

// 변수 f에 함수 리터럴을 할당
var f = function add3(x, y) {
  return x + y;
};

console.dir(f);

// 변수에 할당한 함수 리터럴은 함수명을 생략할 수 있지만, 함수 선언문은 함수명을 생략할 수 없다.
var f2 = function (x, y) {
  return x + y;
};

console.dir(f2);

// 크롬 개발자 도구(F12)에서 함수 선언문을 실행하면 완료 값 undefined가 뜸.
// 함수 선언문이 표현식인 문이라면 완료 값이 undefined가 아닌 표현식이 평가되어 생성된 함수가 출력되어야 함.
