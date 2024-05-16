// var 키워드는 중복 선언 가능. (함수 레벨 스코프)
var x = 1;
if (true) {
  // 블록 레벨은 무시함. (전역으로 인정)
  var x = 10;
}
console.log(x); // 10 -> if문 블록에서 x를 10으로 바꿨으니까.

// let, const 키워드로 선언한 변수는 블록 레벨 스코프.
// 중복 선언 금지 (has already been declared.)

let foo = 1; // 전역 변수
{
  let foo = 2; // 지역 변수
  let bar = 3; // 지역 변수
}
console.log(foo); // 1

// let 키워드는 var와 다르게 선언 전에 console로 접근하면 ReferenceError: Cannot access 'fo' before initialization 에러를 낸다.
/*
  선언 단계
  일시적 사각지대(TDZ) Temporal Dead Zone 
  초기화 단계 (fo === undefined)
  할당 단계 (fo === 1)
 */
// console.log(fo); // ReferenceError: Cannot access 'fo' before initialization
let fo;
console.log(fo); // undefined(초기화 단계)
fo = 1;
console.log(fo);

// 위처럼 변수 호이스팅이 발생하지 않는 것처럼 동작하지만,
// 그러면 has been declared가 아닌 is not defined로 동작해야함.
// 따라서 호이스팅은 되고 있는거임. 다만 일시적 사각지대가 생겨서 ReferError가 나는 것일 뿐.

// let 키워드로 선언한 전역 변수는 window(전역 객체)의 프로퍼티가 아니다.
// 즉 window.foo와 같이 접근할 수 없다.
// let 전역 변수는 보이지 않는 개념적인 블록 내에 존재하게 된다.

// const 키워드
// let과 다른점
// 1. let은 선언단계와 할당단계를 나눌 수 있지만, const는 동시에 해야됨.
// const qe; // Missing initializer in const declaration

// 2. 재할당 금지 -> Assignment to constant variable.

// 상수. 변수에 원시값을 할당한 경우 변수 값을 변경할 수 없다. 재할당 없이 변경 불가.
// 적절한 네이밍을 통해 고정된 값 (ex. 세율)을 상수로 설정하면 유지보수와 가독성 측면에서 대폭 좋아짐.
const TAX_RATE = 0.1;
// 세전
let preTaxPrice = 100;
// 세후
let afterTaxPrice = preTaxPrice + preTaxPrice * TAX_RATE;
console.log(afterTaxPrice); // 110

// const 키워드로 객체 -> 객체는 재할당 없이 값을 변경 가능함

// 총 정리
// ES6+ 스펙에선 var 키워드 사용 금지
// const 우선으로 사용. 재할당이 필요한 경우 let으로 바꿔서 사용
// 객체는 의외로 재할당하는 경우가 드묾, 단 react, angular 등을 사용하면 할 수도 있음.
