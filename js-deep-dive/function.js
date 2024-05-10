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

// 표현식이 아닌 문은 변수에 할당할 수 없다.
// 하지만 함수 선언문은 변수에 할당할 수 있는 것처럼 보인다.

var add = function add(x,y) {
  return x+y;
}

// 함수 호출
console.log(add(2,5));

// 함수명은 함수 몸체 내부에서만 호출할 수 있음.
// (function bar(x,y) {return x+y});
// bar();

// 하지만 함수 선언문의 foo는 함수 외부에서 호출하고 있음.
function foo1(x,y) {
  return x+y;
}

console.log(foo1(2,3));

// foo라는 이름으로 함수를 호출하려면 함수명이 아닌, 함수 객체를 가리키는 식별자여야 한다.
// 우리는 식별자 foo를 선언한 적도, 할당한 적도 없다.
// foo는 무엇? -> 자바스크립트 엔진이 암묵적으로 생성한 식별자이다.
// 자바스크립트 엔진은 생성된 함수를 호출하기 위해 함수명과 동일한 식별자를 암묵적으로 생성하고, 거기에 함수 객체를 할당한다.
// 아래는 foo의 의사코드
var foo2 = function foo2(x,y) {
  return x+y;
}

console.log(foo2(3,2));

// 함수는 함수명으로 호출하는 것이 아닌 함수 객체를 가리키는 식별자로 호출.

// 함수 생성 시점과 호이스팅
// 함수 참조
console.dir(addA);
console.dir(subA);  // undefined

// 함수 호출
console.log(addA(2,5));
// console.log(subA(2,5)); // Uncaught TypeError TypeError: subA is not a function

// 함수 선언문
function addA(x,y) {
  return x+y;
}

// 함수 표현식
var subA = function (x,y) {
  return x-y;
}

// 모든 선언문이 그렇듯, 함수 선언문도 코드가 한 줄씩 순차적으로 실행되는 시점인 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행된다.
// 함수 선언문으로 함수를 정의하면 런타임 이전에 함수 객체가 먼저 생성된다.
// 

// 변수 호이스팅(var 키워드만 가능)은 undefined로 초기화하지만, 함수 호이스팅은 함수 호출을 할 수 있을 만큼 런타임 이전에 함수 객체로 초기화한다.(모든 내용이 다 들어있음)
console.log(d);
var d = 1;

// 함수 표현식은 변수에 할당되는 값이 함수 리터럴인 문이다.
// 변수 선언은 런타임 이전에 undefined로 초기화하고, 변수에 할당된 함수 리터럴은 할당문이 실행되는 시점에 평가되어(런타임 이후) 함수 객체가 됨.
// 따라서 함수 표현식은 변수 호이스팅이 발생한다.
