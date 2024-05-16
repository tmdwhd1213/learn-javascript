// 프로퍼티 어트리뷰트를 이해하기 위해 내부 슬롯과 내부 메서드의 개념에 대해 알아보자.
// ECMAScript 스펙에서 사용하는 Pseudo property와 Pseudo method는 이중 대괄호로 등장함.([[...]])
// 직접적으로 접근은 불가. but [[prototype]]만은 __proto__로 간접적으로 접근 가능함.
const obj = {};
console.log(obj["[[prototype]]"]); // undefined
console.log(obj.__proto__); // {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}

// JS 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.
// 프로퍼티 상태란 프로퍼티의 값(value), 값의 갱신 가능 여부(writable), 열거 가능 여부(enumerable), 재정의 가능 여부(configurable)을 말함.

// Object.getOwnPropertyDescriptor 메서드를 사용하여 간접적으로 확인할 수 있다.
const person = {
  name: "SJ",
};
console.log(Object.getOwnPropertyDescriptor(person, "name")); // {value: 'SJ', writable: true, enumerable: true, configurable: true}

// ES8에서 도입된 Object.getOwnPropertyDescriptors(Object) 는 모든 프로퍼티를 대상으로 디스크립터 객체를 반환함.
person.age = 28; // 프로퍼티 동적 생성
console.log(JSON.stringify(Object.getOwnPropertyDescriptors(person)));
// {"name":{"value":"SJ","writable":true,"enumerable":true,"configurable":true},
// "age":{"value":28,"writable":true,"enumerable":true,"configurable":true}}

// 프로퍼티는 데이터 프로퍼티, 접근자 프로퍼티로 구분한다.
// 데이터 프로퍼티: 우리가 흔히 아는 프로퍼티는 전부 데이터 프로퍼티다.
// 접근자 프로퍼티: 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티다.

// [[value]] -> 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값.
// [[writable]] -> 값의 변경 여부. Boolean 타입. false인 경우 읽기 전용 프로퍼티가 됨.
// [[Enumerable]] -> 열거 가능 여부. Boolean 타입. false인 경우 for...in문이나 Object.keys 등으로 열거할 수 없다.
// [[Configurable]] -> 프로퍼티 재정의 가능 여부. Boolean 타입. false인 경우 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지됨.
// 단, [[Writable]]이 true인 경우 [[value]의 변경과 [[Writable]]을 false로 변경하는 것은 허용됨.

// 접근자 프로퍼티
// [[Get]] -> 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수. 프로퍼티 키로 값에 접근하면 getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환됨.
// [[Set]] -> 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수. 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 setter 함수가 호출되고 그 결과가 프로퍼티 값으로 저장됨.
// [[Enumerable]], [[Configurable]]은 데이터 프로퍼티와 동일하다

const person2 = {
  firstName: "SJ",
  lastName: "Oh",

  // 접근자 함수로 구성된 접근자 프로퍼티 (getter 함수)
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  // setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  },
};
// 데이터 프로퍼티를 통한 프로퍼티 값 참조
console.log(person2.firstName + " " + person2.lastName); // SJ Oh

// 접근자 프로퍼티를 통한 프로퍼티 값 저장. (setter)
person2.fullName = "Jimmy Kim";
console.log(person2); // {firstName: 'Jimmy', lastName: 'Kim', fullName: <accessor>}

// 접근자 프로퍼티를 통한 프로퍼티 값 참조. (getter)
console.log(person2.fullName); // Jimmy Kim

// firstName은 데이터 프로퍼티다.
let descriptor = Object.getOwnPropertyDescriptor(person2, "firstName");
console.log(descriptor); // {value: 'Jimmy', writable: true, enumerable: true, configurable: true}
// fullName은 접근자 프로퍼티다.
descriptor = Object.getOwnPropertyDescriptor(person2, "fullName");
console.log(descriptor); // {get: ƒ, set: ƒ, enumerable: true, configurable: true}

// 프로토타입: 어떤 객체의 상위(부모) 객체의 역할을 하는 객체다. (프로토타입 체인은 프로토타입이 단방향 링스드 리스트 형태로 연결되어 있는 상속 구조를 말함.)

// 일반 객체의 __proto__는 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__")); // {get: ƒ, set: ƒ, enumerable: false, configurable: true}
// 함수 객체의 prototype은 데이터 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(function () {}, "prototype")); // {value: {…}, writable: true, enumerable: false, configurable: false}

// 프로퍼티 정의 -> Object.defineProperty 메서드로 프로퍼티의 어트리뷰트를 정의할 수 있다.
const person3 = {};
Object.defineProperty(person3, "firstName", {
  value: "Ungmo",
  writable: true,
  enumerable: true,
  configurable: true,
});

descriptor = Object.getOwnPropertyDescriptor(person3, "firstName");
console.log(descriptor); // {value: 'Ungmo', writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
Object.defineProperty(person3, "lastName", {
  value: "Lee",
});
descriptor = Object.getOwnPropertyDescriptor(person3, "lastName");
console.log(descriptor); // {value: 'Lee', writable: false, enumerable: false, configurable: false}

// lastName의 enumerable이 false여서 아래의 열거에 포함되지 않는다.
console.log(Object.keys(person3)); // ["firstName"]

// lastName의 [[Writable]]이 false이므로 값이 갱신되지 않는다.
// person3.lastName = "asd"; // Uncaught TypeError TypeError: Cannot assign to read only property 'lastName' of object '#<Object>'
console.log(person3.lastName);

// lastName의 [[Configurable]]이 false이므로 해당 프로퍼티를 삭제할 수 없다.
// delete person3.lastName;  // TypeError: Cannot delete property 'lastName' of #<Object>

// lastName의 [[Configurable]]이 false이므로 해당 프로퍼티를 재정의할 수 없다.
// Object.defineProperty(person3, "lastName", {
//   enumerable: true,
// }); // TypeError: Cannot redefine property: lastName

// 접근자 프로퍼티 정의
Object.defineProperty(person3, "fullName", {
  // getter함수
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter함수
  set(name) {
    this.firstName = name;
  },
  enumerable: true,
  configurable: true,
});

descriptor = Object.getOwnPropertyDescriptor(person3, "fullName");
console.log(descriptor); // {get: ƒ, set: ƒ, enumerable: true, configurable: true}
person3.fullName = "Matin";
console.log(person3); // {firstName: 'Matin', fullName: <accessor>, lastName: 'Lee'}

// Object.defineProperties() 메서드를 쓰면 여러 개의 프로퍼티를 한 번에 정의할 수 있다.

// 객체 변경 방지
// JS는 객체의 변경을 방지하는 다양한 메서드를 제공함. -> 금지하는 강도가 다름. X라고 표시한 것 말곤 나머지는 다 된다.
// 객체 확장 금지: Object.preventExtensions -> 프로퍼티 추가 X
// 객체 밀봉: Object.seal() -> 프로퍼티 추가 x, 프로퍼티 삭제 x, 프로퍼티 어트리뷰트 재정의 x
// 객체 동결: Obejct.freeze() -> 프로퍼티 추가 x, 프로파티 삭제 x, 프로퍼티 값 쓰기 x, 프로퍼티 어트리뷰트 재정의 x

// 객체 확장 금지: 프로퍼티 동적 추가와 Object.defineProperty 메서드를 통해 확장할 수 있는데, 이 두가지 방법 모두 금지된다.
// 객체 확장 가능 여부는 Object.isExtensible 메서드로 확인가능.
console.log(Object.isExtensible(person3)); // true -> 확장 가능

// person3 객체의 추가 확장을 금지함.
Object.preventExtensions(person3);
console.log(Object.isExtensible(person3)); // false -> 확장 금지

// 프로퍼티 추가가 금지되었음.
// person3.age = 30; // Cannot add property age, object is not extensible

// 프로퍼티 정의에 의한 추가도 금지됨.
// Object.defineProperty(person3, "age", { value: 30 }); // Cannot define property age, object is not extensible

// 객체 밀봉: 밀봉된 객체는 읽기와 쓰기만 가능하다.
// 밀봉 여부는 Object.isSealed 메서드로 확인 가능하다.
const sealObj = { name: "Lee" };
console.log(Object.isSealed(sealObj)); // false

// person3 객체를 밀봉하여 추가, 삭제, 재정의를 금지한다.
Object.seal(sealObj);
console.log(Object.isSealed(sealObj)); // true
// 밀봉된 객체는 configurable(재정의)가 false로 바뀜.
console.log(Object.getOwnPropertyDescriptor(sealObj, "name")); // {..., configurable: false}

// sealObj.age = 20; // Cannot add property age, object is not extensible
// delete sealObj.name;  // Cannot delete property 'name' of #<Object>
// 프로퍼티 값 갱신은 가능하다. ([[Writable]])
sealObj.name = "SJ";
console.log(sealObj); // {name: 'SJ'}

// 프로퍼티 어트리뷰트 재정의 금지
// Object.defineProperty(sealObj, "name", { configurable: true }); // Cannot redefine property: name

// 객체 동결: 동결된 객체는 읽기만 가능함. 위의 기능 전부 다 안 됨.
// 동결여부: Object.isFrozen()메서드로 확인
const frozenObj = { name: "Oh" };
console.log(Object.isFrozen(frozenObj)); // false
Object.freeze(frozenObj);
console.log(Object.isFrozen(frozenObj)); // true
console.log(Object.getOwnPropertyDescriptor(frozenObj, "name")); // {value: 'Oh', writable: false, enumerable: true, configurable: false}

// 불변 객체: Object.freeze()가 가장 강력한 메서드지만, 이것도 얕은 변경 방지만 되므로, 중첩된 객체는 적용이 안됨.
// 따라서 재귀함수를 만들어 Object.freeze를 호출해야 함.
const neverChangeObj = {
  name: "SJ",
  address: {
    city: "Seoul",
    detail: {
      dong: "Hogye",
      road: "gyoungSu-daero",
    },
  },
};

// 직속 프로퍼티만 동결한다.
// Object.freeze(neverChangeObj);
console.log(Object.isFrozen(neverChangeObj)); // true
console.log(Object.isFrozen(neverChangeObj.address)); // false

// 얕은 변경 방지이므로 중첩된 객체인 address.city는 변경이 가능함.
neverChangeObj.address.city = "Busan";
console.log(neverChangeObj.address); // {city: 'Busan', detail: {…}}

function deepFreeze(target) {
  // 객체이고 동결되지 않은 객체만 동결함.
  if (target && typeof target === "object" && !Object.isFrozen(target)) {
    Object.freeze(target);

    // Object.keys()는 key들의 배열을 만들고, forEach 배열 메서드로 순회하여 재귀적으로 freeze 시킴.
    Object.keys(target).forEach((key) => deepFreeze(target[key]));
  }
  return target;
}

// 깊은 객체 동결
deepFreeze(neverChangeObj);

console.log(Object.isFrozen(neverChangeObj.address)); // true
// neverChangeObj.address.city = "Anyang";  // Cannot assign to read only property 'city' of object '#<Object>'
console.log(neverChangeObj.address);
