console.log(typeof null); // object

console.log(undefined ?? null);

var x;
console.log((x = 10)); // 10 할당문은 표현식인 문이다. -> 값으로 평가되기 때문

// 연쇄 할당문
var a, b, c;
a = b = c = 3; // 오른쪽에서 왼쪽으로 진행
// 1. c = 3;
// 2. b = c -> c는 3이므로 b = 3;
// 3. a = b -> b는 3이므로 a = 3;
console.log(a, b, c); // 3 3 3

console.log(-0 === +0); // true -> false여야 함.
// 이러한 것을 방지하기 위해 나온 Obejct.is() 메서드 ES6스펙
console.log(Object.is(-0, +0)); // 인수 2개 비교  // false
console.log(NaN === NaN); // NaN은 유일하게 자기 자신을 비교해도 false가 나오는 값임.
// 아래는 NaN을 비교하기 위해 쓰이는 메서드, 함수이다.
console.log(Object.is(NaN, NaN)); // true
console.log(isNaN(NaN)); // true

// 삼항 연산자와 if else문의 차이 -> if else는 표현식이 아닌 문임(값으로 평가될 수 없음).
// 삼항 연산자는 값으로 표현될 수 있는 표현식인 문
var res = 10;
console.log(res % 2 === 0 ? "짝수" : "홀수"); // 짝수

class Ad {}

const ad = new Ad();
console.log(ad instanceof Ad); // true
