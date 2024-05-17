// 생성자 함수
function Circle(radius) {
  this.radius = radius;

  // 메모리 낭비
  // this.getArea = function () {
  //   return Math.PI * this.radius ** 2;
  // };
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
// 공유해서 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const cir1 = new Circle(1);
const cir2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// 이런 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 쓰는 것이 바람직하다.
console.log(cir1.getArea()); // 3.141592653589793
console.log(cir2.getArea()); // 12.56637...
// 이 위의 방식으로는 메모리 낭비

// 프로토타입을 통해 static 메서드를 구현 (상속)
console.log(cir1.getArea === cir2.getArea); // true -> 같은 것을 공유해 쓴다는 증거

const obj = {};
const parent = { x: 1 };

// getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
// obj.__proto__;
// setter 함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); // 1

// __proto__ 접근자 프로퍼티는 객체가 직접 소유하는 것 X
// Object.prototype의 프로퍼티다.
const person = { name: "lee" };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty("__proto__")); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__")); // {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true

// __proto__ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유 ->
// 단방향 링크드 리스트인데 상호 참조하는 것을 방지하기 위해서.
const parent2 = {};
const child2 = {};
child2.__proto__ = parent2;
// parent2.__proto__ = child2; // TypeError: Cyclic __proto__ value

// 모든 객체가 __proto__ 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문에 사용하는 것을 권하지 않는다.
// obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속 받을 수 있다.
const obj2 = Object.create(null);

console.log(obj2.__proto__); // undefined

// 따라서 __proto__보다 Object.getPrototypeOf() 메서드를 사용하는 편이 좋다.
console.log(Object.getPrototypeOf(obj2)); // null
// 프로토타입 교체는 Object.setPrototypeOf() 메서드로
const obj3 = {};
const parent3 = { x: "상속" };

// obj 객체의 프로토타입을 취득
console.log(Object.getPrototypeOf(obj3));
// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj3, parent3);
console.log(obj3.x);

// 함수 객체는 prototype 프로퍼티를 소유한다.
console.log(function () {}.hasOwnProperty("prototype")); // true
console.log({}.hasOwnProperty("prototype")); // false

// prototype 프로퍼티는 생성자 함수가 생성할 객체(인스턴스)의 프로토타입을 가리킨다.
// non-constructor인 화살표함수, ES6 메서드 축약 표현으로 정의한 메서드는
// prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.

// 화살표함수
const Person = (name) => {
  this.name = name;
};
console.log(Person.hasOwnProperty("prototype")); // false -> 프로토타입 소유 X
console.log(Person.prototype); // undefined -> 프로토타입 생성X
// ES6 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
const obj4 = {
  foo() {},
};

console.log(obj4.hasOwnProperty("prototype")); // false
console.log(obj4.foo.prototype); // undefined

// 모든 객체가 갖고있는 접근자 프로퍼티 __proto__와 함수 객체만이 갖고있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다.
function Foo(name) {
  this.name = name;
}
const me = new Foo("foobao");
console.log(Foo.prototype === me.__proto__); // true

// 모든 프로토타입은 constructor 프로퍼티를 갖는다.
// 이 constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다.
// 이 연결은 생성자 함수가 생성될 때 이뤄진다.
console.log(me.constructor === Foo); // true
console.log(me.constructor);
console.log(Foo.prototype.constructor);

// ECMA 스펙에 따르면 Object 생성자 함수에 인수를 전달하지 않거나, null, undefined를 전달하여 호출할 경우 추산 연산 OrdinaryObjectCreate를 호출하여
// Object.prototype을 프로토타입으로 갖는 빈 객체를 생성한다.
let ob = new Object();
console.log(ob); // {}

// 1. new.target이 undefined거나 Object가 아닌 경우.
// 인스턴스 -> Bar.prototype -> Object.prototype 순으로 프로토타입 체인이 생성됨.
class Bar extends Object {}
console.log(new Bar()); // Bar

// 인수를 전달한 경우 해당 인수의 타입의 객체로 변환한다.
ob = new Object(123); // Number{}
console.log(ob);
ob = new Object("123");
console.log(ob); // String{}

// 사용자 정의 생성자 함수와 프로토타입 생성 시점
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
// 함수 호이스팅 -> 런타임 이전에 실행되어 평가됨
console.log(Que.prototype); // {constructor: f}
// 생성자 함수
function Que(name) {
  this.name = name;
}

// 사용자 정의 생성자 함수는 자신이 평가되어 함수 객체로 생성되는 시점에 프로토타입도 더불어 생성되어,
// 생성된 프로토타입의 프로토타입은 언제나 Object.prototype이다.
// 빌트인 생성자 함수는 전역객체가 생성되는 시점에 프로토타입이 생성된다.
// 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩된다.

console.log(Object.prototype.constructor);

// 오버라이딩: 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용하는 방식
// 오버로딩: 함수의 이름은 동일하지만 매개변수의 타입, 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드는 구별하여 호출하는 방벖(JS는 지원하지 않음

// 하위 객체를 통해 프로토타입의 메서드

// 생성자 함수에 의한 프로토타입 교체
const PersonA = (function () {
  function PersonA(name) {
    this.name = name;
  }

  // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입 교체
  PersonA.prototype = {
    // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
    constructor: PersonA,
    sayHello() {
      console.log(`Hi! my name is ${this.name}`);
    },
  };

  return PersonA;
})();

const meA = new PersonA("Pe");
meA.sayHello();
console.log(meA.constructor === PersonA); // true

// 인스턴스에 의한 프로토타입 교체
// 직접 프로토타입을 교체하지 않는 것이 좋다 -> 번거로움

// instanceof 연산자 : 객체 instanceof 생성자함수

function Po(name) {
  this.name = name;
}

const ch = new Po("Lee");
const pr = {};
Object.setPrototypeOf(ch, pr);

// Po 생성자 함수와 pr 객체는 연결X
console.log(Po.prototype === pr); // false
console.log(pr.constructor === Po); // false

// Po.prototype이 ch 객체의 프로토타입 체인 상에 존재하지 X -> false
console.log(ch instanceof Po); // false
// Object.prototype이 ch 객체의 프로토타입 체인 상에 존재하므로 true
console.log(ch instanceof Object); // true

// pr 객체를 Po 생성자 함수의 prototype 프로퍼티에 바인딩함.
Po.prototype = pr;

// Po.prototype이 ch 객체의 프로토타입 체인 상에 존재하므로 true로 평가
console.log(ch instanceof Po); // true
