// 함수를 호출하면 함수 코드가 평가되어 함수 실행 컨텍스트가 생성됨.
// 이때 생성된 함수 실행 컨텍스트는 실행 컨텍스트 스택(콜스택)에 푸시되고
// 함수 코드가 실행됨.
// 함수 코드의 실행이 종료하면 함수 실행 컨텍스트는 콜스택에서 팝되어 제거됨.

// [] -> [전역 실행컨택스트] -> [전역 실행, foo함수 실행] -> [전역 실행]
// -> [전역 실행, bar함수 실행] -> [전역 실행] -> []
// const foo = () => {};
// const bar = () => {};
// foo();
// bar();

// JS 엔진은 단 하나의 실행 컨텍스트 스택(콜스택)을 갖는다.
// 콜스택의 최상위 요소인 "실행 중인 실행 컨텍스트"를 제외한 모든 실행 컨텍스트들은
// 모두 실행 대기 중인 태스크(task)들이다.
// 대기 중인 태스크들은 현재 실행 중인 실행 컨텍스트가 팝되어 콜스택에서 제거되면 실행됨.

// 이처럼 JS 엔진은 한 번에 하나의 태스크만 실행할 수 있는 싱글 스레드로 동작함.
// 싱글 스레드 방식은 처리에 시간이 걸리는 태스크를 실행하면 블로킹(작업 중단)이 발생함.

// setTimeout 함수와 유사하게 일정 시간이 경과한 이후에 콜백 함수를 호출하는 sleep함수를 구현
function sleep(func, delay) {
  // Date.now()는 현재 시간을 ms로 반환함.
  const delayUntil = Date.now() + delay;

  while (Date.now() < delayUntil) {
    // delay가 경과한 이후에 콜백 함수를 호출한다.
    func();
  }
}

function foo() {
  console.log("foo");
}

function bar() {
  console.log("bar");
}

// sleep 함수는 3초 이상 실행됨.
// sleep(foo, 3 * 1000); // 1.8만번의 foo 호출 후 bar 호출

// bar 함수는 sleep 함수의 실행이 종료된 이후에나 호출되므로 3초 이상 블로킹됨.
// bar();

// 타이머 함수인 setTimeout으로 ㄱㄱ
setTimeout(foo, 3 * 1000);
bar(); // bar -> 3초 후 -> foo (한번)

// 이 처럼 현재 실행 중인 태스크가 종료되지 않은 상태여도 다음 태스크를 실행하는 방식을
// 비동기 처리라고 함.

// 동기 처리: 순서가 보장됨, 블로킹 문제
// 비동기 처리: 블로킹 해결, 순서가 보장되지 않음.

// 이벤트 루프와 태스크 큐
// 브라우저가 동작하는 것을 살펴보면 태스크가 동시에 처리되는 것처럼 보임.(JS엔진은 싱글 스레드인데)
// HTML 요소가 애니메이션 효과를 통해 움직이면서 이벤트를 처리하기도 하고
// HTTP 요청을 통해 서버로부터 데이터를 가지고 오면서 렌더링하기도 함.
// 이처럼 JS의 동시성을 지원하는 것이 바로 이벤트 루프이다.

// 이벤트루프는 브라우저에 내장되어 있는 기능 중 하나다.

// 구글의 V8 자바스크립트 엔진은 크게 2개의 영역으로 나눌 수 있다.
// 콜 스택(실행 컨텍스트 스택) -> 패스
// 힙: 객체가 저장되는 메모리 공간. -> 객체는 원시값과 달리 크기가 유동적임.
// 메모리 공간 크기를 런타임에 결정(동적 할당)해야 함.
// 따라서 객체가 저장되는 공간인 힙은 구조화되어 있지 않다는 특징이 있음.

// 콜 스택과 힙으로 구성된 JS 엔진은 단순히 태스크가 요청되면 콜 스택을 통해
// 요청된 작업을 순차적으로 실행할 뿐임.
// 비동기 처리에서 소스코드의 평가와 실행을 제외한 모든 처리는 JS 엔진을 구동하는
// 환경인 브라우저 또는 Node.js가 담당한다.

// 예를 들어, 비동기 방식으로 동작하는 setTimeout의 콜백 함수의 평가와 실행은 JS 엔진이,
// 호출 스케줄링을 위한 타이머 설정과 콜백 함수의 등록은 브라우저 or Node.js가 담당함.

// 태스크 큐: setTimeout이나 setInterval같은 비동기 함수의 콜백 함수 or
// 이벤트 핸들러가 일시적으로 보관되는 영역이다.
// 별도로 프로미스의 후속 처리 메서드의 콜백 함수가 일시적으로 보관되는
// 마이크로태스크 큐도 존재한다.

// 이벤트 루프:
// 콜 스택에 현재 실행 중인 실행 컨텍스트가 있는지,
// 태스크 큐에 대기 중인 함수(콜백 함수, 이벤트 핸들러 등)가 있는지 반복적으로 확인함.
// 만약 콜스택이 비어있고 태스크 큐에 대기 중인 함수가 있다면
// 이벤트 루프는 순차적(FIFO)으로 태스크 큐에 대기 중인 함수를 콜 스택으로 이동시킨다.
// 이때 콜 스택으로 이동한 함수는 실행된다.
// 즉, 태스크 큐에 일시 보관된 함수들은 비동기 처리 방식으로 동작한다.

function faz() {
  console.log("비동기 4ms");
}
function baz() {
  const a = [];
  for (let i = 0; i < 300; i++) {
    for (let j = 0; j < 300; j++) {
      i + j;
    }
  }
  console.log("동기");
}
setTimeout(faz, 0); // 4ms
baz();
// 자바스크립트 모델 상 비동기 함수가 동기함수보다 먼저 실행되는 것은 불가능함.
// 고민해결
// 1만번을 호출하던 100만번을 호출하던 일단 비동기함수는
// 전역 코드 및 명시적으로 호출된 함수가 모두 종료하면 비로소 콜 스택에 푸시되어 실행함.
// for (let i = 0; i < 1000; i++) {
//   baz();
// }

// 자바스크립트 싱글스레드, 브라우저 멀티스레드 방식으로 돌아감.
