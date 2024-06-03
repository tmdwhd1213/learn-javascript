// 스프레드를 쓸 수 있는 대상은 이터러블에 한정된다.
// 펼쳐서 개별적인 값들의 목록으로 만듦,

// console.log(...{ a: 1, b: 2 }); // TypeError: Spread syntax requires ...iterable[Symbol.iterator] to be a function
console.log(..."Hello"); // H e l l o
console.log(...[1, 2, 3]); // 1 2 3
// 스프레드 문법의 결과는 값이 아니다.
// 값을 생성하는 연산자가 아님을 의미한다.
// 스프레드 문법의 결과는 변수에 할당할 수 없다!

/*
 * 함수 호출문의 인수 목록
 * 배열 리터럴의 요소 목록
 * 객체 리터럴의 프로퍼티 목록
 */

// spread가 없을 때는 Function.prototype.apply를 통해 Math.max()의 인수를 전달했었다. -> 가변 인자 메서드
var arr = [1, 2, 5];
var max = Math.max.apply(null, arr); // 5
console.log(max);
// spread로 하면 더 가독성도 좋고 편리함.
max = Math.max(...arr); // 5
console.log(max);

// 배열 리터럴 내부에서 쓰는 경우
// 1. concat (ES5)
arr = [1, 2].concat([3, 4]);
console.log(arr); // [1,2,3,4]

// spread ES6
arr = [...[1, 2], ...[3, 4]];
console.log(arr); // [1,2,3,4]

// 디스트럭처링 할당
arr = [1, 2, 3];
let [one, two, three] = arr;
console.log(one, two, three);

// 우변에 이터러블을 할당하지 않으면 에러가 발생
// const [x,y];  // A destructuring declaration must have an initializer
// const [a, b] = {}; // TypeError: {} is not iterable

function parseURL(url = "") {
  // /^ -> 정규표현식의 시작
  // (\w+) -> [a-zA-z0-9_]+ 랑 같음, 한 개 이상의 문자숫자 언더스코어의 그륩.
  // :\/\/ -> ://
  // ([^/]+) -> /이 아닌 모든 문자 그룹
  // \/ -> / 로 나눠짐.
  // (.*) -> *:0개 이상의 문자, .: 임의의 단어(모든 문자), 호스트 뒤에 나머지 경로에 대한 부분의 그룹
  // $/ -> 정규표현식의 끝
  const parsedURL = url.match(/^(\w+):\/\/([^/]+)\/(.*)$/);
  console.log(parsedURL);
  if (!parsedURL) return {};

  const [, protocol, host, path] = parsedURL;
  return { protocol, host, path };
}

const parsedURL = parseURL(
  `https://developer.mozilla.org/ko/docs/Web/Javascript`
);
console.log(parsedURL); // {protocol: 'https', host: 'developer.mozilla.org', path: 'ko/docs/Web/Javascript'}

// 배열 디스트럭처링의 Rest 요소
let [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [2,3]

// 객체 디스트럭처링
let user = { firstName: "SeungJ", lastName: "Oh" };
let { lastName, firstName } = user; // 프로퍼티 키를 기준으로 디스트럭처링 할당이 이뤄진다. 순서는 의미가 없다.
console.log(firstName, lastName); // {SeungJ Oh}

// 다른 이름으로 하고 싶으면
// 프로퍼티 키가 lastName인 프로퍼티 값을 ln에 할당하고,
// 프로퍼티 키가 firstName인 프로퍼티 값을 fn에 할당함.
let { lastName: ln, firstName: fn } = user;
console.log(fn, ln); // SeungJ Oh

// 기본값 선언 가능
let { firstName: fn1 = "Ungmo", lastName: ln1 } = { lastName: "Lee" };
console.log(fn1, ln1); // Ungmo Lee

var str = "Hello";
// String 래퍼 객체로부터 length 프로퍼티만 추출한다.
var { length } = str;
console.log(length); // 5

var todo = { id: 1, content: "HTML", completed: true };
var { id } = todo;
console.log(id); // 1

function printTodo({ content, completed }) {
  console.log(`할일 ${content}은 ${completed ? "완료" : "비완료"} 상태입니다.`);
}
printTodo(todo); // 할일 HTML은 완료 상태입니다.

// 중첩 객체의 경우
var user2 = {
  name: "Lee",
  address: {
    zipCode: "03068",
    city: "Seoul",
  },
};

const {
  address: { city },
} = user2;
console.log(city); // Seoul

// Rest 프로퍼티
const { x: a, ...rest } = { x: 1, y: 2, z: 3 };
console.log(x, rest); // 1 {y:2, z:3}
