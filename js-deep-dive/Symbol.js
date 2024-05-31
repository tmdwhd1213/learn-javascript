// 심벌: 유일한 프로퍼티 키를 만들기 위해 사용됨.

// Symbol()함수에 선택적으로 문자열을 인수로 전달할 수 있다.
// 이 문자열은 설명(description)으로 디버깅 용도롤만 사용되며, 심벌 값 생성에 아무 영향도 주지 않는다.
const symbol1 = Symbol("마");
const symbol2 = Symbol("마");
console.log(symbol1 === symbol2); // false
// 심벌 값도 객체처럼 접근하면 암묵적으로 래퍼 객체를 생성한다.
// Symbol.prototype의 프로퍼티
console.log(symbol1.description); // 마
console.log(symbol1.valueOf()); // Symbol(마)

// 심벌은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않지만, 불리언으로는 변환 가능
// console.log(symbol1 + "");  // Cannot convert a Symbol value to a string
console.log(!!symbol1); // true
if (symbol1) console.log("symbol1 is not empty");

// Symbol 함수는 호출될 때마다 유일무이한 심벌 값을 생성한다.
// JS엔진이 관리하는 심벌 값 저장소인 전역 심벌 레지스트리에서 심벌 값을 검색할 수 있는 키를 지정할 수 없으므로
// 전역 심벌 레지스트리에 등록되어 관리되지 않는다.

// Symbol.for 메서드를 사용하면 애플리케이션 전역에서 중복되지 않는 유일무이한 상수인 심벌 값을 단 하나만 생성하여
// 전역 심벌 레지스트리를 통해 공유가 가능하다.

// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
const s1 = Symbol.for("mySymbol");
// 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 있으면 해당 심벌 값을 반환
const s2 = Symbol.for("mySymbol");
console.log(s1 === s2); // true

// Symbol.keyFor 메서드 => 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출할 수 있다.
console.log(Symbol.keyFor(s1)); // mySymbol

// Symbol 함수를 호출하여 생성한 심벌 값은 전역 심벌 레지스트리에 등록되지 X.
console.log(Symbol.keyFor(symbol1)); // undefined

// 예제
// 값에는 특별한 의미가 없고 상수 이름 자체에 의미가 있는 경우가 있다.
let Direction = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};

Direction = {
  UP: Symbol("up"),
  DOWN: Symbol("down"),
  LEFT: Symbol("left"),
  RIGHT: Symbol("right"),
};
// 변수에 상수를 할당
const myDirection = Direction.UP;
if (myDirection === Direction.UP) console.log("You are going UP.");

// JS enum
// Direction2 객체는 불변 객체이며 프로퍼티 값은 유일무이한 값이다.
const Direction2 = Object.freeze({
  UP: Symbol("up"),
  DOWN: Symbol("down"),
  LEFT: Symbol("left"),
  RIGHT: Symbol("right"),
});
// 변수에 상수를 할당
const myDirection2 = Direction2.UP;
if (myDirection2 === Direction2.UP) console.log("You are going UP.");

// Direction2.asd = 1; //  TypeError: Cannot add property asd, object is not extensible

let obj = {
  // 심벌 값으로 프로퍼티 키 생성
  [Symbol.for("mySymbol")]: 1,
};

console.log(obj[Symbol.for("mySymbol")]); // 1

// 심벌 값을 프로퍼티 키로 만들면 외부에 노출할 필요없는 프로퍼티를 은닉할 수 있다.
obj = {
  [Symbol("심벌")]: 1,
  a: 1,
};

console.log(Object.keys(obj)); // ['a']
console.log(Object.getOwnPropertyNames(obj)); // ['a']

// ES6에서 Object.getOwnPropertySymbols 메서드를 사용하면 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티를 찾을 수 있다.
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(심벌)]
let symbolKey = Object.getOwnPropertySymbols(obj)[0];
console.log(obj[symbolKey]); // 1

// 일반 객체를 이터러블처럼 구현하고 싶다면 이터레이션 프로토콜을 따르자. 객체에 [Symbol.iterator]() {} 메서드 작성
let iterable = {
  [Symbol.iterator]() {
    let cur = 1;
    const max = 5;
    // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환
    return {
      next() {
        return { value: cur++, done: cur > max + 1 };
      },
    };
  },
};

for (const num of iterable) console.log(num);
console.log(iterable);

// 이터러블 (순회 가능한 자료구조) [Symbol.iterator](){...}
// 이터레이터: 이터레이터가 반환하는 이터러블 요소를 탐색하기 위한 포인터 next() {return {value: any, done: boolean}} -> 리절트 객체

// 이터러블인지 확인하는 함수
const isIterable = (v) =>
  v !== null && typeof v[Symbol.iterator] === "function";

console.log(isIterable({})); // false

let obj1 = { a: 1, b: 2 };
console.log({ ...obj1 }); // 2020 스프레드 프로퍼티 제안

// 사용자 정의 이터러블
const fibonacci = {
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1];
    const max = 10;

    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { value: cur, done: cur >= max };
      },
    };
  },
};

for (const num of fibonacci) console.log(num); // 1,2,3,5,8
const arr = [...fibonacci]; // [1,2,3,5,8]
console.log(arr);

// 피보나치 수열 함수로 이터러블을 만들어보자
const fibonacciFunc = (max) => {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur >= max };
        },
      };
    },
  };
};

const arr2 = [...fibonacciFunc(100)];
console.log(arr2); // [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]

// 이터러블이면서 이터레이터인 객첼르 생성하는 함수
const iterable1 = fibonacciFunc(5);
// 이터러블의 함수의 Symbol.iterator 메서드는 이터레이터를 반환한다.
const iterator1 = iterable1[Symbol.iterator]();

console.log(iterator1.next()); // {value: 1, done: false}
console.log(iterator1.next()); // {value: 2, done: false}
console.log(iterator1.next()); // {value: 3, done: false}
console.log(iterator1.next()); // {value: 5, done: true}

// fibonacciFunc 함수를 이터러블이면서 이터레이터인 객체를 생성하여 반환하는 함수로 변경해보자.
const fibonacciFunc1 = (max) => {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur, done: cur >= max };
    },
  };
};

let iter = fibonacciFunc1(10);
console.log([...iter]); // [1,2,3,5,8]

iter = fibonacciFunc1(10);
// iter는 이터레이터이므로 이터레이션 리절트 객체를 반환하는 next 메서드를 소유한다.
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next()); // {value: 13, done: true}

// 무한 이터러블과 지연 평가: 이를 통해 무한 수열을 간단히 구현할 수 있다.
const fibonacciFunction = () => {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      // 무한을 구현해야 하므로 done을 생략한다.
      return { value: cur };
    },
  };
};
let p = [];
// 무한 (for...of는 이터러블만)
for (const num of fibonacciFunction()) {
  if (num > 10000) break;
  p.push(num);
}
console.log(p); // [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]

// 배열 디스트럭처링 할당을 통해 무한 이터러블에서 3개만 취한다.
const [f1, f2, f3] = fibonacciFunction();
console.log(f1, f2, f3); // 1 2 3

// 배열이나 문자열 등은 모든 데이터를 메모리에 미리 확보한 다음 데이터를 공급함.
// but 이터러블은 지연 평가를 통해 데이터를 생성함.
// 지연 평가란? -> 데이터가 필요한 시점이 되서야 비로소 데이터를 생성하는 기법이다. (그 전에는 생성 X)
