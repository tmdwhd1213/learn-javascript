// 이터러블 프로토콜을 구현하여 무한 이터러블을 생성하는 함수
const createInfinityByIteration = function () {
  let i = 0; // 자유 변수
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return { value: ++i };
    },
  };
};

for (const n of createInfinityByIteration()) {
  if (n > 5) break;
  console.log(n);
}

// 무한 이터러블을 생성하는 제너레이터 함수
function* createInfinityByGenerator() {
  let i = 0;
  while (true) {
    yield ++i;
  }
}

for (const n of createInfinityByGenerator()) {
  if (n > 5) break;
  console.log(n);
}

// 제너레이터 함수는 일반 함수와는 다른 독특한 동작을 한다.
// 제너레이터 함수는 함수 코드 블록의 실행을 일시 중지했다가 필요한 시점에
// 재시작할 수 있는 특수한 함수이다.
function* counter() {
  console.log("첫번째 호출");
  yield 1;
  console.log("두번째 호출");
  yield 2;
  console.log("세번째 호출");
}

const generatorObj = counter();

console.log(generatorObj.next());
// console.log(generatorObj.next());
// console.log(generatorObj.next());
