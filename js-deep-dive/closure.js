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

function f() {
  const x = 1;
  const y = 2;

  // 일반적으로 클로저라고 하지 않는다.
  function ba() {
    const z = 3;

    //   debugger;
    // 상위 스코프의 식별자를 참조하지 않는다.
    console.log(z);
  }
  return ba;
}
const ba = f();
ba();

function f2() {
  const x = 1;
  //bar함수는 클로저였지만 곧바로 소멸한다.
  // 이러한 함수는 일반적으로 클로저라고 하지 않는다.
  function bar() {
    //debugger;
    // 상위 스코프의 식별자를 참조한다.
    console.log(x);
  }
  bar();
}

f2();

// ----- 클로저 ------
function outerCloser() {
  const x = 1000;
  const y = 1;

  // 클로저
  // 중첩 함수 bar는 외부 함수보다 더 오래 유지되면 상위 스코프으이 식별자를 참조한다.
  function bar() {
    //debugger;
    console.log(x);
  }
  return bar;
}

const innerCloser = outerCloser();
innerCloser();

// 클로저의 활용
// 클로저는 상태를 안전하게 변경하고 유지하기 위해 사용함. (상태를 안전하게 은닉, 특정 함수에게만 상태 변경을 허용)

// 카운터 사태 변수
let num = 0;

// 카운트 상태 변경 함수
// 이 함수는 변수를 통해 관리되고 있음(암묵적 결합) -> 누구나 접근가능, 카운트 상태 즉, 전역 변수 num이 변경되면 오류 발생
const increase = function () {
  // 카운트 상태를 1만큼 증가시킴.
  return ++num;
  // 별로 안 좋은 코드.
};
console.log(increase());

// 이전 상태를 유지못한다는 단점이 있다. increase2()로 호출해도 계속 1임.
// 지역변수가 0으로 계속 초기화되므로.
const increase2 = (function () {
  let num = 0;
  return ++num;
})();
// console.log(increase2);
// console.log(increase2);

// ---- 클로저
// 즉시실행함수는 한번만 실행되므로 increase가 호출될 때마다 초기화할 일은 없다.
const increaseClosure = (function () {
  let num = 0;

  // 클로저
  return function () {
    // 카운트 상태를 1만큼 증가시킨다.
    return ++num;
  };
})();

console.log(increaseClosure()); // 1
console.log(increaseClosure()); // 2

// 감소하는 것도 만들어보자.
const counter = (function () {
  // 카운트 상태 변수
  let num = 0;

  // 클로저인 메서드를 갖는 객체를 반환
  // 객체 리터럴은 스코프를 만들지 않음.
  // 따라서 아래 메서드들의 상위 스코프는 즉시실행함수의 렉시컬 환경이다.
  return {
    // num: 0 -> 프로퍼티는 public하므로 은닉되지 않음. 따라서 X
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    },
  };
})();

console.log(counter.decrease()); // 0
console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
console.log(counter.decrease()); // 0

// 생성자 함수 버전
const Counter = (function () {
  let num = 0;

  function Counter() {}

  Counter.prototype.increase = function () {
    return ++num;
  };
  Counter.prototype.decrease = function () {
    return num > 0 ? --num : 0;
  };

  return Counter;
})();

const myCounter = new Counter();

console.log(myCounter.increase()); // 1
console.log(myCounter.decrease()); // 0

// 함수형 프로그래밍에서 클로저를 활용하는 예제.

// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
function makeCounter(predicate) {
  let counter = 0;

  // 클로저를 반환
  return function () {
    // 인수로 전달받은 헬퍼 함수에 상태 변경을 위임함.
    counter = predicate(counter);
    return counter;
  };
}

// 헬퍼 함수
function increaseCounter(n) {
  return ++n;
}

function decreaseCounter(n) {
  return n > 0 ? --n : 0;
}

const increaser = makeCounter(increaseCounter);
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser함수와는 별개의 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decreaseCounter);
console.log(decreaser()); // -1
console.log(decreaser()); // -2

// 함수를 반환하는 고차함수.
// 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환.
const makeCounter2 = (function () {
  let counter = 0;

  // 함수를 인수로 전달받는 클로저를 반환
  return function (predicate) {
    // 인수로 전달받은 헬퍼 함수에 상태 변경을 위임함.
    counter = predicate(counter);
    return counter;
  };
})();

console.log(makeCounter2(increaseCounter)); // 1
console.log(makeCounter2(increaseCounter)); // 2

console.log(makeCounter2(decreaseCounter)); // 1
console.log(makeCounter2(decreaseCounter)); // 0

function Person(name, age) {
  this.name = name; // 프로퍼티는 public하다. (인스턴스가 가질 프로퍼티)
  let _age = age; // 지역 변수이므로 private하다. _는 private하다는 의미

  // 인스턴스 메서드
  this.sayHi = function () {
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  };
}

const me = new Person("Lee", 20);
me.sayHi(); // Hi! My name is Lee. I am 20.
console.log(me.name); // Lee
console.log(me._age); // undefined

// 인스턴스 메서드는 인스턴스를 생성할 때마다(Person 객체가 생성) 중복 생성된다.
// sayHi 메서드를 프로토타입 메서드로 변경하여 sayHi 메서드의 중복 생성을 방지해보자.
function Person2(name, age) {
  this.name = name; // public
  let _age = age; // private
}

// 프로토타입 메서드
Person2.prototype.sayHi = function () {
  // Person 생성자 함수의 지역 변수 _age를 참조할 수 없다.
  console.log(`Hi! My name is ${this.name}. I am ${this._age}.`); // _age is undefined
};

const me2 = new Person2("Kim", 28);
me2.sayHi();

// 즉시 실행 함수로 모아서 해결해보자.
const Person3 = (function () {
  let _age = 0; // private

  // 생성자 함수
  function Person(name, age) {
    this.name = name; // public;
    _age = age;
  }

  // 프로토타입 메서드
  Person.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me3 = new Person3("Oh", 30);
me3.sayHi(); // Hi! My name is Oh. I am 30.
console.log(me3._age); // undefined

// 이 코드도 문제가 있다.
// 인스턴스를 여러 개 생성하면, _age 변수의 상태가 마지막 것으로 통일된다.
const you3 = new Person3("YOu", 10000);
me3.sayHi(); // Hi! My name is Oh. I am 10000.

// 클로저를 사용할 때 자주 발생하는 실수
var funcs = [];
for (var i = 0; i < 3; i++) {
  funcs[i] = function () {
    return i;
  };
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); // 3 3 3
}

// 클로저를 이용한 해결
for (var i = 0; i < 3; i++) {
  funcs[i] = (function (id) {
    return function () {
      return id;
    };
  })(i);
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); // 0 1 2
}

// let 키워드로 쉽게 해결하기
