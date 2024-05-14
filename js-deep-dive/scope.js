function add(x, y) {
  console.log(x, y); // 2 5
  return x + y;
}

add(2, 5);
console.log(add(2, 5)); // 7

// console.log(x, y); // Uncaught ReferenceError ReferenceError: x is not defined

var var1 = 1; // 코드 가장 바깥 영역

if (true) {
  var var2 = 2; // 코드 블록 내에서 선언한 변수
  if (true) {
    var var3 = 3; // 중첩된 코드 블록 내에서 선언한 변수
  }
}

function foo() {
  var var4 = 4; // 함수 내에서 선언한 변수

  function bar() {
    var var5 = 5; // 증첩된 함수 내에서 선언한 변수
  }
}

console.log(var1); // 1
console.log(var2); // 2
console.log(var3); // 3
// console.log(var4); // ReferenceError: var4 is not defined.
// console.log(var5); // Uncaught ReferenceError ReferenceError: var5 is not defined

// 모든 식별자는(변수이름, 함수이름, 클래스이름 등) 자신이 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위가 결정됨.
// 이를 스코프라고 함.

var x = "global";

function baz() {
  var x = "local";
  console.log(x);
}

baz(); // local

console.log(x); // global

// 코드가 어디서 실행되며 주변에 어떤 코드가 있는지 -> 렉시컬 환경(정적 환경)
// 코드의 문맥(context)은 렉시컬 환경으로 이뤄진다.
// 이를 구현한 것이 실행 컨텍스트이며, 모든 코드는 실행 컨텍스트에서 평가되고 실행된다.

// 식별자는 어떤 값을 구별할 수 있어야 하므로 유일해야함. 따라서 식별자인 변수 이름은 중복될 수 없다.
// 즉 하나의 값은 유일한 식별자에 연결되어야 함.(name binding)

// 컴퓨터로 예를 들면, 파일명은 유일해야함. (식별자)
// 같은 이름을 써야만할 때, 우리는 디렉터리(함수)로 구분할 수 있음.

var x = "global x";
var y = "global y";

function outer() {
  var z = "outers local z";

  console.log(x); // global x
  console.log(y); // global y
  console.log(z); // outer's local z

  function inner() {
    var x = `inner's local x`;

    console.log(x); // inner's local x
    console.log(y); // global y
    console.log(z); // outer's local z
  }

  inner();
}

outer();

console.log(x); // global x
// console.log(z); // ReferenceError z is not defined

// 스코프 체인을 통해, 변수를 참조하는 코드의 스코프에서 상위 스코프로 방향으로 이동하며 선언된 변수를 검색한다.

// 스코프 체인에 의한 함수 검색
function foa() {
  console.log("global function foa");
}

function baa() {
  // 중첩함수
  function foa() {
    console.log("local function foa");
  }
  foa(); // local function foa
}

baa();

// 스코프란 함수도 똑같이 스코프가 작동하므로 변수만이 아닌, 식별자를 검색하는 규칙이라고 생각하면 됨.

// 지역(local)은 함수 몸체 내부를 말하고 지역은 지역 스코프를 만든다.
// 이는 코드블록이 아닌 함수에 의해서만 지역 스코프가 생성된다는 것임.
// 대부분의 프로그래밍 언어에서는 블록 레벨 스코프로 지역 스코프가 만들어짐. if, while, try/catch 등
// JS의 var 키워드는 함수레벨 스코프만을 지역으로 삼음.

// JS -> 랙시컬 스코프 : 함수를 어디서 정의했는지 -> par를 밖에서 정의함.(전역 스코프에서)
var x = 1;

function poo() {
  var x = 10;
  par();
}
function par() {
  console.log(x);
}

poo(); // 10; x -> 1
par(); // 1;
