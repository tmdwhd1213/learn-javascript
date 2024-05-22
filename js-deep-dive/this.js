const circle = {
  // 프로퍼티: 객체 고유의 상태 데이터
  radius: 5,
  // 메서드: 상태 데이터를 참조하고 조작하는 동작
  getDiameter() {
    return 2 * this.radius;
  },
};

console.log(circle.getDiameter()); // 10

// 생성자 함수로 객체 만들기
function Circle(radius) {
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
  this.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // 이 시점에는 생성자 함수 자신이 생성할 인스턴스를 가리키는 식별자를 알 수 없다.
  return 2 * this.radius;
};

// 생성자 함수로 인스턴스를 생성하려면 먼저 생성자 함수를 정의해야 함.
const circle1 = new Circle(5);
console.log(circle1.getDiameter());

// this는 자기가 속한 객체 OR 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다.
// this를 통해 자신이 속한 객체 OR 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.
// this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.
// 바인딩: 식별자와 값을 연결하는 과정

console.log(this); // undefined (일반적으로 window)

function square(number) {
  // 일반 함수 내부에서 this는 전역 객체 window를 가리킴.
  console.log(this); // undefined (일반적으로 window)
  return number * number;
}
square(2);

const person = {
  name: "Lee",
  get naming() {
    // 메서드 내부에서 this는 메서드를 호출한 객체를 가리킴.
    console.log(this); // {name: 'OH', naming: <accessor>}
    return this.name;
  },
  set naming(name) {
    this.name = name;
    return this.name;
  },
};
console.log(person.naming); // Lee
person.naming = "OH";
console.log(person.naming);

function Person(name) {
  this.name = name;
  // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킴.
  console.log(this); // Person {name: 'Lee'}
}

const me = new Person("Lee");

// 렉시컬 스코프는 (함수의 상위 스코프를 결정하는 방식) 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정.
// this 바인딩은 함수 호출 시점에 결정됨

// 다양한 함수 호출 방식
// 1. 일반 함수 호출
// 2. 메서드 호출
// 3. 생성자 함수 호출
// 4. Function.prototype.call/apply/bind 메서드에 의한 간접 호출

// this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.
const foo = function () {
  console.dir(this);
};

// 1. 일반 함수 호출
foo(); // undefined (전역)

// 2. 메서드 호출
// foo 함수를 프로퍼티 값으로 할당하여 호출
// foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킴.
const obj = { foo };
obj.foo(); // {foo: f}

// 3. 생성자 함수 호출
// foo 함수를 new 연산자와 함께 생성자 함수로 호출
// foo 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가리킨다.
console.log(typeof new foo()); // foo {} Object

// 4. Function.prototype.apply/call/bind 메서드에 의한 간접 호츌
// foo 함수 내부의 this는 인수에 의해 결정된다.
const bar = { name: "bar" };
foo.call(bar); // {name: 'bar'} -> call 메서드의 첫 번째 인자인 bar 객체가 foo 함수 내부의 this 값으로 설정됩니다.
foo.apply(bar); // {name: 'bar'}

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price); // Product 생성자 함수를 호출하여 this를 Food의 this로 바꾸고, 나머지 인수도 Food의 인스턴스에 넘김
  this.category = "food";
}

console.log(new Food("cheese", 5));
// Food {name: 'cheese', price: 5, category: 'food'}

// this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서 this는 의미가 없다.
// 그것이 중첩함수이던 일반함수이던 strict mode에서는 undefined(전역 객체)를 가리킨다.
function baz() {
  console.log(`baz's this: ${this}`); // undefined
  function coo() {
    console.log(`coo's this: ${this}`); // undefined
  }
  coo();
}
baz();

// 메서드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
// 콜백 함수가 일반 함수로 호출된다면 콜백 함수 내부의 this에도 전역 객체가 바인딩된다.
// 어떤 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩된다.

var value = 1;
let obj1 = {
  value: 100,
  foo() {
    console.log(`foo's this: ${JSON.stringify(this)}`); // foo's this: {"value":100}
    // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
    setTimeout(function () {
      console.log(`callback's this: ${this}`); // window
      console.log(`callback's this.value: ${this.value}`); // 1
    }, 100);
  },
};

obj1.foo();

// 외부함수인 메서드 내부의 중첩함수, 또는 콜백 함수의 this가 다른 값을 가리키면 문제가 발생한다.
// 같은 값을 가리키게 하기 위한 방법.
obj1 = {
  value: 100,
  foo() {
    // this 바인딩(obj1)을 변수 that에 할당한다. -> this 고정
    const that = this;

    // 콜백 함수 내부에서 this 대신 고정된 this 값인 that을 참조한다.
    setTimeout(function () {
      console.log(that.value); // 100
    }, 100);
  },
};

obj1.foo();

// Function.prototype.call/apply/bind() 는 this를 명시적으로 바인딩할 수 있는 메서드
obj1 = {
  value: 100,
  foo() {
    // 콜백 함수에 명시적으로 thios를 바인딩한다.
    setTimeout(
      function () {
        console.log(this.value); // 100
      }.bind(this),
      100
    );
  },
};

obj1.foo(); // 100

// 화살표 함수로 this 바인딩 일치시키기
obj1 = {
  value: 100,
  foo() {
    setTimeout(() => console.log(this.value), 100); // 100
  },
};

obj1.foo(); // 100

// 메서드 호출
// 메서드 내부의 this는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩된다는 것이다.
let person1 = {
  name: "Lee",
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  },
};

console.log(person1.getName());

// 메서드는 객체에 포함된 것이 아닌, 독립적으로 존재하는 별도의 객체다.
// getName 메서드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수 있고, 일반 변수에 할당하여 일반 함수로 호출될 수도 있다.
let anotherPerson = {
  name: "kim",
};

// getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person1.getName;

// getName 메서드를 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당
const getName = person.getName;

// getName 메서드를 일반 함수로 호출
console.log(getName); // undefined  -> 전역 객체

// 프로토타입 메서드 내부에서 사용된 this도 일반 메서드와 마찬가지로 해당 메서드를 호출한 객체에 바인딩됨.

function Per(name) {
  this.name = name;
}
Per.prototype.getName = function () {
  return this.name;
};

const we = new Per("Lee");

// getName 메서드를 호출한 객체는 we이다.
console.log(we.getName()); // Lee

Per.prototype.name = "Kim";

// getName 메서드를 호출한 객체는 Per.prototype이다/
console.log(Per.prototype.getName()); // Kim

// Function.prototype.apply
/**
 * 주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
 * @param thisArg - this로 사용할 객체
 * @param argsArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체
 * @returns 호출된 함수의 반환값
 */

// Function.prototype.call
/**
 * 주어진 this 바인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출한다.
 * @param thisArg - this로 사용할 객체
 * @param arg1, arg2, ... - 함수에게 전달할 인수 리스트
 * @returns 호출된 함수의 반환값
 */

function getThisBinding() {
  console.log(arguments);
  return this;
}

const thisArg = { a: 1 };
// apply
console.log(getThisBinding.apply(thisArg, [1, 2, 3])); // Arguments(3) [1, 2, 3, callee: <accessor>, Symbol(Symbol.iterator): ƒ], {a: 1}
// call
console.log(getThisBinding.call(thisArg, 1, 2, 3)); // Arguments(3) [1, 2, 3, callee: <accessor>, Symbol(Symbol.iterator): ƒ], {a: 1}

// apply와 call의 대표적 용도는 arguments같은 유사 배열 객체에 배열 메서드를 사용하는 경우
function convertsToArray() {
  console.log(arguments);

  const arr = Array.prototype.slice.call(arguments);
  console.log(arr);

  return arr;
}

convertsToArray(4, 5, 6); // [4, 5, 6]

// Function.Prototype.bind() 는 call, apply와 달리 함수를 호출하지 않음. this로 사용할 객체만 전달함.
console.log(getThisBinding.bind(thisArg)); // f()
// 직접 명시적으로 호출해야함.
console.log(getThisBinding.bind(thisArg)()); // Arguments(0) [callee: <accessor>, Symbol(Symbol.iterator): ƒ], {a: 1}
