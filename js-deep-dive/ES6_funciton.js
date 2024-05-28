class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    // ES5 버전
    var that = this;
    return arr.map(
      function (item) {
        // 콜백함수를 일반함수로 작성하면 this는 전역객체를 가리킴.
        // 그리고 class 내부는 strict mode가 적용됨. 따라서 전역객체가 아닌 undefined가 바인딩됨.
        // return that.prefix + item;
        return this.prefix + item;
      }.bind(this),
      this
    );
  }
}
const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["transition", "user-select"]));

// ES6이전에는 이러한 문제를
// 1. 콜백함수에 Function.prototype.bind()메서드를 추가하여 add 메서드를 호출한 prefixer 객체를 가리키는 this를 바인딩함.
// 2. 외부함수에서 this를 const that = this; 로 회피시키거나
// 3. Array.prototype.map()의 두번째 인수에 this로 사용할 객체를 전달할 수 있다. -> 외부함수에서의 this랑 콜백함수에서의 this를 맞추는 것.

// 화살표함수는 함수 자체의 this 바인딩을 갖지 않는다.
// 따라서 상위 스코프의 this를 그대로 참조함. 이를 lexical this라 한다.

class Foo {
  constructor(a) {
    this.a = a;
  }

  bar() {
    return () => this.a;
  }

  baz() {
    return function () {
      return this.a;
    }.bind(this);
  }
}

const foo = new Foo("test");
console.log(foo.bar()());

// 화살표함수가 아닌 제일 가까운 함수의 this를 스코프를 통해 찾아감.
(function () {
  const foo = () => console.log(this);
  foo();
}).call({ a: 1 });

(function () {
  const bar = () => () => () => console.log(this);
  bar()()();
}).call({ b: 2 });

const counter = {
  num: 1,
  increase() {
    return ++this.num;
  },
};

console.log(counter.increase()); // 2
console.log(counter.increase()); // 3
console.log(counter.increase()); // 4

// 생성자 함수에 ES6 메서드를 동적 추가하는 법.
function Person(name) {
  this.name = name;
}
Person.prototype = {
  // constructor 프로퍼티와 생성자 함수 간의 연결을 재설정
  constructor: Person,
  sayHi() {
    console.log(`Hi ${this.name}`);
  },
};

const person = new Person("Oh");
person.sayHi(); // Hi Oh

// 클래스 필드에 화살표 함수를 할당할 수 있지만, 비추천 -> 프로토타입 메서드가 아닌 인스턴스 메서드가 됨.(메모리 낭비)
// Bad
class Pers {
  name = "Sa";
  // 클래스 필드에 할당한 sayHi 메서드의 상위 스코프는 constructor이다.
  // 따라서 sayHi 화살표함수 내부에서 참조한 this는 constructor 내부의 this 바인딩과 같다.
  // constructor 내부의 this 바인딩은 클래스가 생성한 인스턴스를 가리킴. -> 클래스 필드 내의 화살표함수는 인스턴스 메서드가 된다.
  // 따라서 클래스 필드에서 메서드를 정의할 땐, ES6 메서드 축약 표현으로 하는 것 O.
  sayHi = () => console.log(`Hi ${this.name}`);
}
const per = new Pers();

// 화살표함수는 super를 갖지 않는다. 따라서 상위 스코프의 super를 참조함.
class Base {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    return `Hi! ${this.name}!`;
  }
}

class Derived extends Base {
  // 화살표 함수의 super는 상위 스코프인 constructor의 super를 가리킴.
  sayHi = () => `${super.sayHi()} What's you doin?`;
}
const derived = new Derived("캄");
console.log(derived.sayHi());

(function () {
  // 화살표 함수는 arguments를 갖지 않는다. 따라서 상위 스코프 함수의 arguments를 가리킴.
  const foo = () => console.log(arguments); // [Arguments] {'0':1, '1': 2}
  foo("test", "asd");
})(1, 2);

// 화살표 함수에서 가변인자함수를 구현하려면 ...Rest 파라미터로 구현해야함.
(function foo(...rest) {
  console.log(rest);
})(1, 2, 3, 4); // [1,2,3,4]
