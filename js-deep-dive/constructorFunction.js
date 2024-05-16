// Object 생성자 함수

// 빈 객체의 생성
const person = new Object();

// 프로퍼티 추가
person.name = "Lee";
person.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

console.log(person); // {name: 'Lee', sayHello: ƒ}

// 생성자 함수: new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수
// 생성자 함수에 의해 생성된 객체를 인스턴스라고 한다.

// 객체 리터럴에 의한 객체 생성 방식의 문제점.
// 단 한개의 객체만을 생성함. 비슷한 놈들일 경우 매번 같은 프로퍼티를 작성해야하기에 비효율적임.
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle1.getDiameter()); // 10

const circle2 = (function () {
  const radius = 5;
  return {
    getDiameter() {
      return 2 * radius;
    },
  };
})();

console.log(circle2.getDiameter()); // 10

// 생성자 함수의 장점 -> 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 여러 객체를 간편하게 생성할 수 있다.
function Circle(radius) {
  // ES6에 도입된 스코프 세이프 생성자 패턴 : new.target
  // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined이다.
  if (!new.target) {
    // new 연산자와 함께 생성자 함수를 재귀 호출하여 생성된 인스턴스를 반환함.
    return new Circle(radius);
  }
  // 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
  console.log(this); // Circle {}
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킴.
  // 인스턴스 초기화
  // this라는 빈 객체에 인스턴스에서 받아온 값을 프로퍼티에 추가하거나 고정값을 할당한다. (이 처리는 개발자의 몫)
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
  // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

  // 만약 다른 객체를 명시적으로 반환하면 this는 무시되고 객체가 반환됨. (원시값은 반대로 원시값이 무시되고 this가 바인딩됨.)
  // return {}; // console.log(circle3) -> {}
  // return 1; // 원시값은 무시되고 정상적으로 동작함.
}

// JS엔진은 암묵적인 처리를 통해 인스턴스를 생성하고 반환한다.
// 1. 인스턴스 생성과 this 바인딩
// 암묵적으로 빈 객체가 생성됨. -> 생성자 함수가 생성한 인스턴스. 이 인스턴스는 this에 바인딩된다.
// 이 처리는 런타임 이전에 실행되고 생성자 함수 내부의 this가 생성자 함수가 생성할 인스턴스를 가리키는 이유가 바로 이것이다.

// 인스턴스 생성
const circle3 = new Circle(5); // 반지름이 5인 Circle 객체 생성
const circle4 = new Circle(10); // 반지름이 10인 Circle 객체 생성

console.log(circle3.getDiameter()); // 10
console.log(circle4.getDiameter()); // 20

// this -> this가 가리키는 값(this 바인딩)
// 일반 함수로서 호출 ->  전역 객체
// 메서드로서 호출 -> 메서드를 호출한 객체(마침표 앞의 객체)
// 생성자 함수로서 호출 -> 생성자 함수가 (미래에) 생성할 인스턴스
function foo() {
  console.log(this);
}
foo(); // undefined

const obj = { foo }; // ES6 프로퍼티 축약 표현
obj.foo(); // {foo: f} -> obj

// 생성자 함수로서 호출
const inst = new foo(); // foo

// 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작한다!

// 함수 객체는 객체다.
function baz() {}
// 객체이므로 프로퍼티를 소유할 수 있다.
baz.prop = 10;
// 함수는 객체이므로 메서드를 소유할 수 있다.
baz.method = function () {
  console.log(this.prop); // 10
};
baz.method(); // callable

// 하지만 함수 객체는 일반 객체와 다르게 호출할 수 있다. 이러한 성질은 [[callable]]이라는 내부 메서드를 갖기 때문이다.
// 또한 [[Construct]]라는 내부 메서드도 있는데, 이는 new 연산자와 함께 생성자 함수가 될 수 있는지 여부를 알 수 있다.
// 모든 함수는 호출이 가능하다. 따라서 모든 함수는 callable이다.
// 하지만 모든 함수가 [[Construct]]를 갖는 것은 아니다. 따라서 Constructor일수도, non-constructor 일수도 있다.
// Constructor -> 함수 선언문, 함수 표현식, 클래스(클래스도 함수다)
// non-constructor -> 메서드(ES6 메서드 축약 표현), 화살표 함수
