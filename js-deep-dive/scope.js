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
