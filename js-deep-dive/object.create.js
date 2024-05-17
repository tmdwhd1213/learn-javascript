// Object.create()에 의한 직접 상속

let obj = Object.create(null); // 프로토타입 체인의 종점에 위치
console.log(Object.getPrototypeOf(obj) === null); // true

// obj -> Object.prototype -> null
// obj = {} 와 동일
obj = Object.create(Object.prototype);
console.log(obj.toString()); // [object Object]

// obj = {x:1} 와 동일
obj = Object.create(Object.prototype, {
  x: { value: 1, writable: true, enumerable: true, configurable: true },
});
console.log(obj); // {x:1}

const myProto = { x: 10 };
// 임의의 객체를 직접 상속받는다.
// obj -> myProto -> Object.prototype -> null
obj = Object.create(myProto);
console.log(obj.x);
console.log(Object.getPrototypeOf(obj) === myProto); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}

// obj -> Person.prototype -> Object.prototype -> null
// obj = new Person('Lee');와 동일
obj = Object.create(Person.prototype);
obj.name = "Lee";
console.log(obj); // Person {name: "Lee"}

// Object.create(null) 처럼 프로토타입 체인 종점에 있는 것을 만들어 낼 수 있어서
// ESLint에서는 Object.prototype 빌트인 메서드를 간접적으로 호출할 것을 권장함.
obj = Object.create(null);
obj.a = 1;
// Function.prototype.call() 메서드로 간접적으로 메서드 호출
console.log(Object.prototype.hasOwnProperty.call(obj, "a")); // true

// ES6 이후 스펙에서 객체 리터럴 내부에서 __proto__ 에 의한 직접 상속을 할 수 있다.
const proto = { x: 10 };

// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const objLiteral = {
  y: 20,
  // 객체를 직접 상속받는다
  // obj -> proto -> Object.prototype -> null
  __proto__: proto,
};
/*
// 아래 코드와 같음.
  const objL = Object.create(proto, {
    y: {value: 20, writable: true, enumerable: true, configurable: true}
  })
*/

console.log(objLiteral.x, objLiteral.y); // 10 20
console.log(Object.getPrototypeOf(objLiteral) === proto); // true

// 정적 메서드/프로퍼티
// 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 것.

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! my name is ${this.name}`);
};

// static Prop
Person.staticProp = "정적 프로퍼티";
Person.staticMethod = function () {
  console.log("staticMethod");
};

const me = new Person("Lee");

// 생성자 함수에 추가한 정적 프로/메서드는 생성자 함수 자체로 참조/호출한다
Person.staticMethod(); // staticMethod
console.log(me.staticProp); // undefined

// in 연산자 -> 객체 냉 특정 프로퍼티가 존재하는지 여부를 확인함. (but, 프로토타입 체인 상에 있는 모든 것들을 확인함.)
// 예를 들어
const ex = {
  name: "le",
  address: "seoul",
};

// ex 객체 내에 name, address가 있으니 아래는 참이 된다.
console.log("name" in ex); // true
console.log("address" in ex); // true
// 하지만 toString은 예상에 없던 것. Object.prototype을 상속받기 때문에 toString도 있다고 나옴.
console.log("toString" in ex); // true

// 따라서 Object.prototype.hasOwnProperty()를 쓰자
console.log(Object.prototype.hasOwnProperty.call(ex, "toString")); // false

// for in 문을 정확히 표현하자면, 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중, [[Enumerable]]의 값이 true인 프로퍼티를 순회하며 열거함.
const forIn = {
  name: "Lee",
  address: "Seoul",
  __proto__: myProto,
};
for (const key in forIn) {
  // 객체 자신의 프로퍼티인지 확인한다.
  if (!Object.prototype.hasOwnProperty.call(forIn, key)) continue;
  console.log(key + ": " + forIn[key]);
}
/*
name: Lee
address: Seoul
//x: 10
*/
// 프로퍼티 키가 Symbol이면 열거하지 않음.
const sym = {
  a: 1,
  [Symbol("10")]: 10,
};

for (const key in sym) {
  console.log(`${key}: ${sym[key]}`);
} // a: 1

// for in 문은 순서를 보장하지 않는다.

// for in문 말고 걍 Object.keys(), values(), entries()를 사용하자
