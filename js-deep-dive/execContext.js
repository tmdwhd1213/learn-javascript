// 실행 컨텍스트: 소스코드를 실행하는 데 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역.
// 식별자(변수, 함수, 클래스 등의 이름)를 등록하고 관리하는 스코프와 코드 실행 순서 관리를 구현한 내부 메커니즘으로
// 모든 코드는 실행 컨텍스트를 통해 실행되고 관리된다.
// 식별자와 스코프는 실행 컨텍스트의 렉시컬 환경으로 관리되고, 코드 실행 순서는 실행 컨텍스트 스택으로 관리한다.

// 실행 컨텍스트 스택
const x = 1;
function foo() {
  const y = 2;

  function bar() {
    const z = 3;
    console.log(x + y + z); // 6
  }
  bar();
}
foo();

// Nothing -> 전역 실행 컨텍스트 -> foo 함수 E.C -> bar 함수 E.C -> bar 함수 pop() -> foo 함수 pop() -> 전역 pop() -> Nothing

// 렉시컬 환경 -> 식별자와 식별자에 바인딩된 값, 그리고 상위 스코프에 대한 참조를 기록하는 자료구조.
// 스코프와 식별자를 관리
// Global Lexical Enviroment {x:1, foo()} ->(스코프 체인) -> foo Lexical Enviro {y: 2}

// 실행 컨텍스트에서 bar() 함수가 실행 종료되면 실행 컨텍스트에서 pop()되어 제거되지만,
// bar 함수 렉시컬 환경까지 즉시 소멸되는 것은 아님. 누군가에 의헤 참조되고 있다면 bar함수 렉시컬 환경은 소멸하지 않는다.
