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
