const obj = {
  a: 1,
  b: 2,
  // 객체 이터러블로 만들 때 제너레이터함수
  *[Symbol.iterator]() {
    for (const key in this) {
      yield this[key];
    }
  },
};

for (const key in obj) {
  console.log(key); // a,b
}

for (const val of obj) {
  console.log(val);
}

const post = "POST";

switch (post) {
  case "POST":
    console.log("포스트");
    break;

  case "GET":
    console.log("겟");
    break;

  default:
    console.log("디폴트");
}

let count = 0;
do {
  console.log(count++);
} while (count < 3);

const string = "Hello World";
const search = "l";
let index;

for (let i = 0; i < string.length; i++) {
  if (string[i] === search) {
    index = i;
    break;
  }
}

console.log(index); // 2
const regexp = new RegExp(search, "g");
console.log(string.match(regexp)); // ['l','l','l']

if (!undefined) console.log(undefined + " is falsy value");

console.log(Number.MAX_SAFE_INTEGER > Infinity); // false
console.log(Infinity + 2);
console.log(Boolean(-Infinity)); // true

// 기본값으로서 Nullish 연산자 쓰는 법
var foo = "" || "default val"; // 기대: '', 현실: default val
console.log(foo);
// null, undefined처럼 falsy가 아닌 진짜 의도적으로 빈 값이나 정의되지 않았을 때 default 가능
var foo = "" ?? "default val";
console.log(foo); // ''

var circle = {
  radius: 5,
  "get-Dia": function () {
    return 2 * this.radius;
  },
};

console.log(circle["get-Dia"]());
