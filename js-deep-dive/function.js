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

var add = function add(x, y) {
  return x + y;
};

// 함수 호출
console.log(add(2, 5));

// 함수명은 함수 몸체 내부에서만 호출할 수 있음.
// (function bar(x,y) {return x+y});
// bar();

// 하지만 함수 선언문의 foo는 함수 외부에서 호출하고 있음.
function foo1(x, y) {
  return x + y;
}

console.log(foo1(2, 3));

// foo라는 이름으로 함수를 호출하려면 함수명이 아닌, 함수 객체를 가리키는 식별자여야 한다.
// 우리는 식별자 foo를 선언한 적도, 할당한 적도 없다.
// foo는 무엇? -> 자바스크립트 엔진이 암묵적으로 생성한 식별자이다.
// 자바스크립트 엔진은 생성된 함수를 호출하기 위해 함수명과 동일한 식별자를 암묵적으로 생성하고, 거기에 함수 객체를 할당한다.
// 아래는 foo의 의사코드
var foo2 = function foo2(x, y) {
  return x + y;
};

console.log(foo2(3, 2));

// 함수는 함수명으로 호출하는 것이 아닌 함수 객체를 가리키는 식별자로 호출.

// 함수 생성 시점과 호이스팅
// 함수 참조
console.dir(addA);
console.dir(subA); // undefined

// 함수 호출
console.log(addA(2, 5));
// console.log(subA(2,5)); // Uncaught TypeError TypeError: subA is not a function

// 함수 선언문
function addA(x, y) {
  return x + y;
}

// 함수 표현식
var subA = function (x, y) {
  return x - y;
};

// 모든 선언문이 그렇듯, 함수 선언문도 코드가 한 줄씩 순차적으로 실행되는 시점인 런타임 이전에 자바스크립트 엔진에 의해 먼저 실행된다.
// 함수 선언문으로 함수를 정의하면 런타임 이전에 함수 객체가 먼저 생성된다.
//

// 변수 호이스팅(var 키워드만 가능)은 undefined로 초기화하지만, 함수 호이스팅은 함수 호출을 할 수 있을 만큼 런타임 이전에 함수 객체로 초기화한다.(모든 내용이 다 들어있음)
console.log(d);
var d = 1;

// 함수 표현식은 변수에 할당되는 값이 함수 리터럴인 문이다.
// 변수 선언은 런타임 이전에 undefined로 초기화하고, 변수에 할당된 함수 리터럴은 할당문이 실행되는 시점에 평가되어(런타임 이후) 함수 객체가 됨.
// 따라서 함수 표현식은 변수 호이스팅이 발생한다.

// 인수를 매개변수보다 더 많이 전달하면 무시되지만, 사실 arguments 객체로 확인할 수 있다.
// 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하게 사용됨.
function ax(x, y) {
  console.log(arguments);
  //Arguments(4) [1, 3, 2, 1, callee: <accessor>, Symbol(Symbol.iterator): ƒ]
  return x + y;
}
ax(1, 3, 2, 1);

// ES6 이후에는 for, if 블록 안에서도 함수를 정의할 수 있다.
// 호이스팅으로 인해 혼란이 발생할 수 있으므로 if, for에서 함수 선언문을 통해 함수를 정의하는 것은 바람직하지 않다.

// 중첩함수
function repeat1(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}
repeat1(5); // 중첩함수는 console.log에 의존하고있다. 하지만 콜백함수를 쓰면 의존성이 없어짐.

// 콜백함수 repeat함수는 함수를 매개변수로 받는 고차함수(HOF)
function repeat(n, callback) {
  for (let i = 0; i < n; i++) {
    callback(i); // 외부에서 고차함수 내부로 주입하기 때문에 자유롭게 교체할 수 있다.
  }
}

var logAll = function (i) {
  console.log(i);
};

repeat(5, logAll);

// 순수 함수 (매개변수를 통해 함수 내부로 전달된 인수에게만 의존해 반환값을 만든다.)
var count = 0;
function increase(n) {
  return ++n;
}
count = increase(count);
console.log(count); // 1
count = increase(count);
console.log(count); // 2

// 비순수 함수 : 외부 상태에 따라 반환값이 달라지는 함수. 외부 상태에 의존하는 함수.
// 외부 상태를 변경하는 부수 효과가 있다. (외부 상태에 의존하거나 외부 상태를 변경하는 함수다.)

// 비순수 함수 지양. 상태 변화를 추적하기 어려워지고 코드 복잡도 증가
function increaseNonFure() {
  return ++count;
}

increaseNonFure();
console.log(count); // 3
