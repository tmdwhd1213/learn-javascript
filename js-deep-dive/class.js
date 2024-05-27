// 클래스 선언문
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name; // name 프로퍼티는 public
  }

  // 프로토타입 메서드
  sayHi() {
    console.log(`H1! My name is ${this.name}`);
  }

  // static 메서드
  static sayHello() {
    console.log("할로");
  }
}

// 인스턴스 생성
const me = new Person("Lee");

// 인스턴스의 프로퍼티 참조
console.log(me.name); // Lee
// 프로토타입 메서드 호출
me.sayHi(); // Hi! My name is Lee
// 정적 메서드 호출
Person.sayHello(); // Hello!

// 생성자 함수와 클래스 비교
/*
var Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHi = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 정적 메서드
  Person.sayHello = function () {
    console.log("Hello!");
  };

  return Person;
})();
*/

// 클래스 선언문
class P {}
console.log(typeof P); // function

// class는 호이스팅 되지 않는 것 처럼 보인다.
// 하지만 let, const처럼 TDZ가 있는 변수 선언 방식처럼 호이스팅된다.

// 클래스에서 정의한 메서드의 특징
// for ...in, Object.keys()등으로 열거 X.[[Enumerable]]: false
// 내부 메서드 [[Construct]]를 갖지 X. new 연산자와 쓸 수 없다.

class A {
  constructor(name) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // A{}
    console.log(Object.getPrototypeOf(this) === A.prototype); // true

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;

    // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  }
}

const A2 = new A("Lee");

class People {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
  // getter 함수
  get fullName() {
    return `${this.firstname} ${this.lastname}`;
  }

  set fullName(name) {
    [this.firstname, this.lastname] = name.split(" ");
  }
}

const peopleA = new People("Ungmo", "Lee");

// 데이터 프로퍼티를 통한 프로퍼티 참조
console.log(`${peopleA.firstname} ${peopleA.lastname}`); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
peopleA.fullName = "SeungJong Oh";
console.log(peopleA); // People {firstname: 'SeungJong', lastname: 'Oh'}

// 접근자 프로퍼티를 통한 프로퍼티 값 참조, Getter 호출
console.log(peopleA.fullName); // SeungJong Oh

console.log(Object.getOwnPropertyDescriptor(People.prototype, "fullName"));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 클래스 필드 정의 제안 -> 클래스 필드는 클래스 내부에서 변수처럼 사용됨.

class Pb {
  // 클래스 필드 정의
  name = "Lee";

  // 클래스 필드에 함수를 할당
  // 클래스 필드에서 메서드를 정의하면 인스턴스 메서드가 됨.
  // 인스턴스 생성할 때마다 메모리 낭비 -> 권장하지 않음.X
  getName = function () {
    return this.name;
  };
}

const mb = new Pb();
console.log(mb.name); // Lee
console.log(mb.getName()); // Lee

// private 필드 -> 클래스 필드에서 변수 앞에 #을 붙여주고, 참조할 때도 #변수로 참조.
class Pp {
  // private 필드 정의;
  #name = "";

  constructor(name) {
    // private 필드 참조
    this.#name = name;
  }
}

const mp = new Pp("Sa");

// private 필드 #name은 클래스 외부에서 참조할 수 없다.
// console.log(mp.#name);  // SyntaxError: Private field '#name' must be declared in an enclosing class

// private 필드는 반드시 클래스 몸체에 정의해야 함. constructor에 정의하면 에러 발생

// static 필드 정의 제안
class MyMath {
  // static public 필드 정의
  static PI = Math.PI;

  // static private 필드 정의
  static #num = 10;

  // static 메서드
  static increment() {
    return ++MyMath.#num;
  }
}

console.log(MyMath.PI); // 3.141592
console.log(MyMath.increment()); // 11

class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }

  eat() {
    return "eat";
  }
  move() {
    return "move";
  }
}

// 상속을 통해 Animal 클래스를 확장한 Bird 클래스
class Bird extends Animal {
  fly() {
    return "fly";
  }
}

const bird = new Bird(1, 5);

console.log(bird);
console.log(bird instanceof Bird); // true
console.log(bird instanceof Animal); // true

// 클래스 동적 상속
function Base1() {}
class Base2 {}
let condition = true;
// 조건에 따라 동적으로 상속 대상을 결정하는 서브클래스
class Derived extends (condition ? Base1 : Base2) {}
const derived = new Derived();
console.log(derived); // Derived {}
console.log(derived instanceof Base1); // true
console.log(derived instanceof Base2); // false

// super()는 부모클래스의 constructor를 호출해 인스턴스를 생성함.
class Base {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  sayHi() {
    return `Hi! ${this.a}`;
  }
}

// 자식 클래스
class Child extends Base {
  // 그대로 쓰면 밑의 constructor(...args){super(...args)} 생략가능
  constructor(...args) {
    super(...args);
  }
}

const child = new Child();
console.log(child); // Child {}

// 부모클래스의 constructor 내부에서 추가한 프로퍼티를 그대로 갖는 인스턴스를 생성한다면
// 서브클래스의 constructor를 생략할 수 있다.

// 그대로 사용 안하고 추가하면 super를 생략할 수 없다.
class ChildA extends Base {
  constructor(a, b, c) {
    super(a, b);
    this.c = c;
  }

  sayHi() {
    return `${super.sayHi()}. How are you doing?`;
  }
}

const childA = new ChildA(1, 2, 3);
console.log(childA); // ChildA {a: 1, b: 2, c: 3}

// 1. 자식클래스에서 constructor를 생략하지 않은 경우 super 무조건 써야함.
// 2. 자식클래스의 constructor에서 super를 호출하기 전에 this를 참조할 수 없다.
// 3. super는 자식클래스에서만 호출가능하다.
// 4. 메서드 내에서 super를 참조하면 수퍼클래스의 메서드를 호출할 수 있다.
console.log(childA.sayHi()); // Hi! 1. How are you doing?

// super는 다음과 같이 동작한다.
class OldChildA extends Base {
  sayHi() {
    // __super는 Base.prototype을 가리킨다.
    const __super = Object.getPrototypeOf(OldChildA.prototype);
    return `${__super.sayHi.call(this)} how are you doing?`;
  }
}
const old = new OldChildA("ㅁ", "ㄴ", "ㅇ");
console.log(old.sayHi()); // Hi! ㅁ how are you doing?

// super는 자신을 참조하고 있는 메서드가 바인딩되어 있는 객체(OldChildA.prototype)의 프로토타입 (Base.prototype)을 가리킨다.
// 따라서 super.sayHi는 Base.prototype.sayHi를 가리킨다.
// 단 super.sayHi, 즉 Base.prototype.sayHi를 호출할 때 call 메서드를 사용해 this를 전달해야 함.
// call 메서드를 사용해 this를 전달하지 않고 Base.prototype.sayHi를 그대로 호출하면 Base.prototype.sayHi 메서드 내부의
// this는 Base.prototype을 가리킨다. sayHi 메서드는 프로토타입 메서드이기 떄문에 내부의 this는 인스턴스를 가리켜야 함. (Base.prototype이 아닌)
// name 프로퍼티는 인스턴스에 존재하기 때문.

// 정리하자면 super 참조가 동작하기 위해서 super를 참조하고 있는 메서드(OldChildA의 sayHi)가 바인딩되어 있는 객체(OldChildA.prototype)의 프로토타입(Base.prototype)
// 을 찾을 수 있어야 한다. 이를 위해 메서드는 내부 슬롯 [[HomeObject]]를 가지며, 자신을 바인딩하고 있는 객체를 가리킨다.

// *** 주의할 것은 ES6의 메서드 축약 표현으로 정의된 함수만이 [[HomeObject]]를 갖는다는 것이다.

// 객체 리터럴에서도 super를 참조할 수 있다. (ES6 축약 메서드만.)
const baseObj = {
  name: "Oh",
  sayHi() {
    return `Hi! ${this.name}`;
  },
};

const derivedObj = {
  __proto__: baseObj,
  // ES6 메서드 축약 표현으로 정의한 메서드. 따라서 [[HomeObject]]를 갖는다.
  sayHi() {
    return `${super.sayHi()}. How are you doing?`;
  },
};

console.log(derivedObj.sayHi()); // Hi! Oh. How are you doing?

// 상속 클래스의 인스턴스 생성 과정
class Rectangle {
  constructor(width, height) {
    // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // ColorRectangle {}
    // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
    console.log(new.target); // 자식 클래스 ColorRectangle
    this.width = width;
    this.height = height;
  }
  getArea() {
    return this.width * this.height;
  }
  toString() {
    return `width = ${this.width}, height = ${this.height}`;
  }
}

// 서브클래스
class ColorRectangle extends Rectangle {
  constructor(width, height, color) {
    super(width, height);
    this.color = color;
  }

  // 메서드 오버라이딩
  toString() {
    return super.toString() + `, color = ${this.color}`;
  }
}

const colorRectangle = new ColorRectangle(2, 4, "red");
console.log(colorRectangle); // ColorRectangle {width: 2, height: 4, color: 'red'}

// 상속을 통해 getArea 메서드 호출
console.log(colorRectangle.getArea()); // 8
// 오버라이딩된 toString 메서드를 호출
console.log(colorRectangle.toString()); // width = 2, height = 4, color = red

// JS 엔진은 부모와 자식 클래스를 구분하기 위해 내부 슬롯 [[ConstructorKind]]를 갖는다.("base", "derived")
// 다른 클래스를 상속 받지 않는 클래스들은 전부 base 값을 갖고,
// extends로 상속받은 클래스는 derived 값을 갖는다.

// 자식클래스는 자신이 직접 인스턴스를 생성하지 않고 부모클래스에게 인스턴스 생성을 위임한다.
// 이것이 바로 자식클래스의 constructor에서 반드시 super를 호출해야 하는 이유다.
