// 제너레이터는 코드 블록의 실행을 일시 중지했다가 필요한 시점에 재개할 수 있는 특수한 함수

import { request } from "./util.js";
// import { call, put, takeEvery } from "../../node_modules/redux-saga/effects.js";

// 1. 제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
// 일반함수는 호출하면 제어권이 함수에게 넘어가고 함수 코드를 일괄 실행한다.
// 즉 함수호출자(caller)는 함수를 호출한 이후 함수 실행을 제어할 수 없다.
// 제너레이터는 함수 호출자에게 양도(yield)할 수 있다는 것을 의미.

// 2. 제너레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
// 일반 함수는 매개변수를 통해 외부에서 값을 주입받고 함수 코드를 일괄 실행해 결과값을
// 함수 외부로 반환한다.
// 즉 함수가 실행되고 있는 동안에는 함수 외부에서 내부로 값을 전달하여 함수의 상태를 변경X
// 제너레이터 함수는 함수 호출자와 양방향으로 함수의 상태를 주고받을 수 있다.
// 다시 말해, 제너레이터 함수는 함수 호출자에게 상태를 전달할 수 있고, 함수 호출자로부터
// 상태를 전달받을 수도 있다.

// 3. 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
// 일반 함수를 호출하면 함수 코드를 일괄 실행하고 값을 반환한다.
// 제너레이터를 호출하면 함수 코드를 실행하는 것이 아닌,
// 이터러블이면서 동시에 이터레이터인 제너레이터 객체를 반환한다.

// 제너레이터 함수 선언문
function* genDecFunc() {
  yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
  yield 1;
};

// 제너레이터 메서드
const obj = {
  *genObjMethod() {
    yield 1;
  },
};

// 제너레이터 클래스 메서드
class MyClass {
  *genclsMethod() {
    yield 1;
    return "test";
  }
}

const myClass = new MyClass();
var test = myClass.genclsMethod();
// console.log(test.next());
console.log(test.return("test")); // {value: 'test', done: true} return메서드를 쓰면 끝나나봄.
console.log(test.next()); // {value: undefined, done: true}

// 제너레이터 함수는 화살표 함수로 정의 X
// 제너레이터 함수는 new 연산자와 함께 생성자 함수로 호출 X

// 제너레이터 함수를 호출하면 일반 함수처럼 함수 코드 블록을 실행하는 것이 아닌
// 제너레이터 객체를 생성해 반환. -> 반환한 객체는 이터러블임과 동시에 이터레이터임.
// Symbol.iterator() 메서드를 상속받는 이터러블이면서 value,done 프로퍼티를 갖는
// 이터레이터 리절트 객체를 반환하는 next()메서드를 소유하는 이터레이터이다.

function* simpleGener() {
  try {
    yield 1;
    yield 2;
  } catch (err) {
    console.error(err);
  }
}

// 제너레이터 객체 생성 (함수를 호출하면 제너레이터 객체를 반환함.)
const generatorObj = simpleGener();
console.log(Symbol.iterator in generatorObj); // true
// 이터레이터는 next 메서드를 갖는다.
console.log("next" in generatorObj); // true
// console.log(Object.prototype.hasOwnProperty.call(generatorObj, "next"));
console.log(generatorObj.next()); // {value: 1, done: false}
console.log(generatorObj.throw("에러 발생!"));
// 에러 발생!, {value: undefined, done: true}

// 이터레이터의 next 메서드와 달리 제너레이터 next 메서드는 인수를 전달할 수 있다.
// 그 인수는 제너레이터 함수의 yield 표현식을 할당받는 변수에 할당된다.
// yield 표현식을 할당받는 변수에 yield 표현식의 평가 결과가 할당되지 않는 것에 주의하라.
function* genFunc() {
  // 처음 next 메서드를 호출하면 첫 번째 yield 표현식까지 실행되고 일시 중지됨.
  // 이때 yield된 값 1은 next 메서드가 반환한 이터레이터 리절트 객체의 value 프로퍼티에 할당
  // x 변수에는 아직 아무것도 할당X. x변수 값은 next 메서드가 두 번째 호출될 때 결정됨.
  const x = yield 1; // 첫 번째 호출에서 x === undefined
  console.log(x);

  // 두 번째 next 메서드를 호출할 때 전달한 인수 10은 첫 번째 yield 표현식을 할당받는
  // x 변수에 할당됨.
  // 즉, const x = yield 1;은 두 번째 next 메서드를 호출했을 때 완료됨.
  // 두 번째 next 메서드를 호출하면 두 번째 yield 표현식까지 실행되고 일시 중지됨.
  // 이때 yield된 값 x + 3은 next메서드가 반환한 value 프로퍼티에 할당됨.
  const y = yield x + 3;

  // 세 번째 next 메서드를 호출할 때 전달한 인수 20은 변수 y에 할당.
  // 따라서 x + y -> 10 + 20 === 30
  return x + y;
}

const generator = genFunc();
let res = generator.next();
console.log(res); // {value: 1, done: false}
// 전달한 인수 10은 x변수에 할당됨.
// 두번째 yield된 값 20이 할당됨.
res = generator.next(10);
console.log(res); // {value: 13, done: false}
// 전달한 인수 20은 y변수에 할당됨.
// next 메서드가 반환한 value 프로퍼티에는 제너레이터 함수의 리턴값 30이 할당됨.(x+y)
res = generator.next(20);
console.log(res); // {value:30, done: true}

// 제너레이터의 활용
// 1. 이터러블의 구현
// 이터레이션 프로토콜을 준수하여 무한 피보나치 수열을 생성하는 함수를 구현하자.
const infiniteFibonacci = (function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      // 무한 이터러블이므로 done 생략
      return { value: cur };
    },
  };
})();
for (const num of infiniteFibonacci) {
  if (num > 10) break;
  console.log(num); // 1 2 3 5 8
}

// 제너레이터 함수 이용해서 무한 피보나치 수열
const infiniteFibonacciWithGenFunc = (function* () {
  let [pre, cur] = [0, 1];
  while (true) {
    [pre, cur] = [cur, pre + cur];
    yield cur;
  }
})();
for (const num of infiniteFibonacciWithGenFunc) {
  if (num > 10) break;
  console.log(num); // 1 2 3 5 8
}

// 2. 비동기 처리
// next메서드와 yield 표현식을 통해 함수 호출자와 함수의 상태를 주고받을 수 있다.
// 프로미스를 사용한 비동기 처리를 동기 처리처럼 구현할 수 있다.
// 다시말해 프로미스의 후속 처리 메서드 then/catch/finally 없이 비동기 결과 처리를
// 반환하도록 구현할 수 있다.
const async = (generatorFunc) => {
  const generator = generatorFunc(); // 2

  const onResolved = (arg) => {
    const result = generator.next(arg);

    return result.done
      ? result.value
      : result.value.then((res) => onResolved(res));
  };

  return onResolved;
};

async(function* fetchTodo() {
  const url = "http://localhost:5001/todos?id=1";
  const response = yield fetch(url);
  const todo = yield response.json();
  console.log(todo);
})();

// 위처럼 제너레이터를 사용하여 비동기를 동기처럼 처리하면 코드가 장황해지고 복잡해짐.
// ES8(ECMAScript 2017)에서는 async/await를 도입하여 더 쉽게 처리할 수 있도록 함.
// 프로미스 기반으로 동작함.
// 동기처리처럼 프로미스를 사용할 수 있음.
(async function fetchTodo() {
  const url = "http://localhost:5001/todos?id=1";
  const response = await fetch(url);
  const todo = await response.json();
  console.log(todo);
})();

// async 함수 -> 언제나 프로미스를 반환.
// 1. asnyc 함수 선언문
async function foo(n) {
  return n;
}
foo(1).then((v) => console.log(v)); //1

// 2. async함수 표현식
const bar = async function (n) {
  return n;
};
bar(2).then((v) => console.log(v)); // 2

// 3. async 함수 화살표
const baz = async (n) => n;
baz(3).then((v) => console.log(v)); // 3

// async 메서드
const asyncObj = {
  async foo(n) {
    return n;
  },
};
asyncObj.foo(4).then((v) => console.log(v)); // 4

// async 클래스 메서드
class AsyncClass {
  // 클래스의 constructor메서드는 async 메서드가 될 수 없다.
  // constructor 메서드는 인스턴스를 반환해야하는데,
  // async함수는 언제나 프로미스를 반환하기 떄문!
  constructor(a) {
    this.a = a;
  }
  async bar() {
    return this.a;
  }
}
const asyncClass = new AsyncClass(5);
asyncClass.bar().then((v) => console.log(v)); // 5

// await 키워드: 프로미스가 settled 상태(비동기 처리가 수행된 상태)가 될 때까지 대기하다
// settled 상태가 되면 프로미스가 resovle한 처리 결과를 반환함.
// await는 반드시 프로미스 앞에서 사용해야한다.
const getGithubUserName = async (id) => {
  const res = await fetch(`https://api.github.com/users/${id}`);
  const { name } = await res.json();
  console.log(name); // Seung-Jong Oh
};
getGithubUserName("tmdwhd1213");
// await 키워드는 프로미스가 settled 상태가 될때까지 대기.
// 이후 프로미스가 settled 상태가 되면 프로미스가 resolve한 처리 결과가 res변수에 할당됨.
// 이처럼 await는 다음 실행을 일시중지시켰다가 프로미스가 settled되면 재개한다.
// 처리순서가 보장되어야하는 경우 프로미스에 await 키워드를 사용하는 것이 좋음.

// 순차적으로 처리할 필요 없는 경우 Promise.all
(async function 직렬() {
  const a = await new Promise((resolve) => setTimeout(() => resolve(1), 3000));
  const b = await new Promise((resolve) => setTimeout(() => resolve(2), 2000));
  const c = await new Promise((resolve) => setTimeout(() => resolve(3), 1000));

  console.log([a, b, c]); // 약 6초 소요
})();
(async function 병렬() {
  const res = await Promise.all([
    new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
    new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
  ]);
  console.log(res); // 약 3초 소요
})();

// 순차적인 비동기 호출 처리를 할 때 제너레이터를 사용하면 코드가 더 명확해짐.
function* sequentialTasks() {
  const url = `http://localhost:5001`;
  const result1 = yield request
    .get(`${url}/todos`)
    .then((res) => res.json())
    .then((datas) => datas.map((data) => data.id));
  console.log(result1);

  const result2 = yield request
    .get(`${url}/todos`, { id: result1[3] })
    .then((res) => res.json());
  console.log(result2);
}

function run(generator) {
  const it = generator();
  function iterate({ value, done }) {
    if (done) return;
    value.then((result) => iterate(it.next(result)));
  }
  iterate(it.next());
}

run(sequentialTasks);

// 에러 처리
// 비동기 처리를 위한 콜백 패턴의 단점 중 가장 심각한 것은 에러 처리가 곤란하다는 것이다.
// 에러는 호출자 방향으로 전파된다.
// 즉, 콜 스택의 아래 방향 (실행 중인 실행 컨택스트가 푸시되기 직전에 푸시된 실행 컨텍스트 방향)
// 으로 전파된다. 하지만, 비동기 함수의 콜백함수를 호출한 것은 비동기 함수가 아니기 때문에
// try...catch 문으로 에러를 캐치할 수 없다.
try {
  setTimeout(() => {
    throw new Error("Error!");
  }, 0);
} catch (e) {
  // 에러를 캐치하지 못함.
  console.error("캐치한 에러", e);
}

// async/await에서 에러 처리는 try...catch문 사용 가능.
// 콜백 함수를 인수로 전달받는 비동기 함수와는 달리
// 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 떄문에 호출자가 명확하다.
(async function 에러캐치() {
  try {
    const wrongUrl = "https://wrong.url";
    const response = await fetch(wrongUrl);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.error("캐치한 에러", err); // 캐치한 에러 TypeError: Failed to fetch
  }
})();

const 에러캐치 = async () => {
  // async 함수는 프로미스를 반환하므로 후속 메서드로 에러를 캐치할 수 있다.
  const wrongUrl = "https://wrong.url";
  const response = await fetch(wrongUrl);
  const data = await response.json();
  return data;
};

에러캐치().then(console.log).catch(console.error);

// 에러처리 (번외)
// typeScript가 아닌 javascript에서는 별도의 타입처리가 필요함.
const repeat = (n, f) => {
  if (typeof f !== "function") throw new TypeError("f는 함수여야만 함.");

  for (let i = 0; i < n; i++) f(i); // i를 전달하면서 f를 호출
};
try {
  repeat(2, 1); // 두번째 인수가 함수가 아니므로 TypeError를 발생(throw)함.
} catch (err) {
  console.error("캐치한 에러", err);
}

// 비동기 데이터 처리. (redux-saga는 제너레이터를 사용해 비동기 작업을 관리하고)
// 리덕스 액션을 처리함.

// 비동기 API 호출 함수
// const fetchData = async () => {
//   const response = await fetch(`http://localhost:5001/todos`);
//   return response.json();
// };

// // 제너레이터 사가 함수
// function* fetchDataSaga() {
//   try {
//     const data = yield call(fetchData);
//     yield put({ type: "FETCH_SUCCESS", payload: data });
//   } catch (error) {
//     yield put({ type: "FETCH_FAILURE", error });
//   }
// }

// function* watchFetchData() {
//   yield takeEvery("FETCH_REQUEST", fetchDataSaga);
// }

// watchFetchData();
