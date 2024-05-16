function foo() {
  // 변수 x의 생명주기
  // 호출될 때 변수 x 생성 (변수 호이스팅)
  var x = "local"; // 변수 x에 값('local')할당
  console.log(x);
  return x;
  // 변수 x 소멸
}

foo();
// console.log(x); // referenceError: x is not defined.

// 함수 몸체 내부에서 선언된 지역 변수의 생명 주기는 함수의 생명 주기와 대부분 일치하지만,
// 지역 변수가 함수보다 오래 생존하는 경우도 있다.
// 변수의 생명주기는 메모리 공간이 확보(allocate)된 시점부터 메모리 공간이 해제(release)되어 가용 메모리 풀에 반환되는 시점까지다.
// 일반적으로 함수가 종료하면 함수가 생성한 스코프도 소멸한다.
// 하지만 누군가가 스코프를 참조하고 있다면 스코프는 해제되지 않고 생존하게 된다.

// 퀴즈
var x = "global";
function bar() {
  console.log(x);
  // bar 스코프에서 x를 지역변수로 선언하지 않으면 전역변수인 global이 출력되는데,
  // 변수 선언문과 함께 할당하면, 스코프 단위로 변수 호이스팅이 되어 x가 undefined로 초기화되어
  // 콘솔은 undefined를 출력한다!
  var x = "local";
}
bar();

// var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 된다. 따라서 전역 변수의 생명주기는 젼역 객체의 생명주기와 일치한다. (메모리 해제가 안 됨)

// 전역 변수의 문제점
// 암묵적 결합: 모든 코드가 전역 변수를 참조하고 변경할 수 있는 암묵적 결합을 허용하겠다는 것이다.
// 변수의 유효 범위가 클수록 코드의 가독성은 나빠지고 의도치 않게 상태가 변경될 수 있는 위험성도 높아짐.

// 긴 생명주기: 메모리 리소스를 오랜 기간 소비함, 전역변수의 상태를 변경할 수 있는 시간도 길고 기회도 많음

// 스코프 체인 상에서 종점에 존재: 전역변수를 검색할 때 가장 마지막에 검색한다 -> 검색 속도가 가장 느리다.

// 네임스페이스 오염: JS의 가장 큰 문제는 파일이 분리되어 있어도 하나의 전역 스코프를 공유한다는 것이다.

// 즉시실행함수
(function () {
  var foo = "즉시실행함수의 변수";
  console.log(foo);
})();

// 네임스페이스 객체 (비효율)
// 전역에 네임스페이스 역할을 담당할 객체를 생성하고 전역 변수처럼 사용하고 싶은 변수를 프로퍼티로 추가하는 법.
var MyApp = {}; // 전역 네임스페이스 객체
MyApp.name = "Lee";
console.log(MyApp.name);

// 네임스페이스 객체에 또 다른 네임스페이스 객체를 프로퍼티로 추가해서 계층적으로 구성할 수 있음.
MyApp.person = {
  name: "oh",
  address: "Seoul",
};
console.log(MyApp.person.address); // seoul

// 모듈패턴 -> 관련이 있는 함수와 변수를 모아 즉시 실행 함수로 감싸 하나의 모듈을 만든다. (클로저 기반으로 동작)
// 클래스를 모방한 패턴으로 전역 변수의 억제, 캡슐화까지 구현할 수 있다.

// 캡슐화는 객체의 상태를 나타내는 프로퍼티와 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말한다.

// 모듈패턴 예제
var Counter = (function () {
  // private 변수
  var num = 0;

  // 외부로 공개할 데이터나 메서드를 프로퍼티로 추가한 객체를 반환
  return {
    increase() {
      return ++num;
    },
    decrease() {
      return --num;
    },
    getNum() {
      return num;
    },
    initialize() {
      return (num = 0);
    },
  };
})();

// private 변수는 외부로 노출되지 않음.
console.log(Counter.getNum());
console.log(Counter.increase());
console.log(Counter.increase());
console.log(Counter.initialize());
console.log(Counter.getNum());

// ES6 모듈 (확장자는 .mjs)
// 모던 브라우저 IE 제외에서 script태그에서 어트리뷰트를 추가하면 됨.
// <script type="module" src="app.mjs"></script>
