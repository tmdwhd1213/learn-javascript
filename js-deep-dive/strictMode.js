function foo() {
  var x = 10;
}
foo();

// console.log(x);

// Strict mode code may not include a with statement
// with ({ x: 1 }) {
//   console.log(x);
// }

// 래퍼 객체
const str = "hello";

console.log(str.length); // 5
console.log(str.toUpperCase()); // HELLO

// 점 표시(.)법으로 원시값을 마치 객체처럼 접근하면 JS 엔진이 일시적으로 원시값 관련된 객체로 변환(String, Number ...)을 하기 때문에
// 암묵적으로 생성된 객체로 프로퍼티에 접근하거나 메서드를 호출하고, 다시 원시값으로 되돌린다.
// 이러한 임시 객체를 래퍼 객체(wrapper object)라 한다.
// 원시값 string에 마침표 표기법으로 접근하면 그 순간 래퍼 객체인 String 생성자 함수의 인스턴스가 생성되고
// 문자열은 래퍼 객체의 [[StringData]] 내부 슬롯에 할당된다.

// 래퍼 객체의 처리가 종료되면 식별자가 원시값을 갖도록 되돌리고래퍼 객체는 가비지 컬렉션의 대상이 된다.
// str.name = "Lee"; // -> 여기서 생성한 래퍼객체는 아무도 참조하지 않으므로 가비지 컬렉션의 대상이 된다.
// console.log(str.name); //  TypeError: Cannot create property 'name' on string 'hello'

const num = 1.5;
console.log(num.toFixed()); // 2
// 다시 원시값으로 되돌림. (원시값은 바뀌지 않음. 그리고 const로 상수 키워드, 재할당 금지)
console.log(typeof num, num); //number 1.5

console.log(globalThis === this); // false
console.log(0xff);

const URI = `http://www.example.com?name=이웅모&job=programmer&teacher`;
const ENC = encodeURI(URI);
console.log(ENC); // http://www.example.com?name=%EC%9D%B4%EC%9B%85%EB%AA%A8&job=programmer&teacher

const DEC = decodeURI(ENC);
console.log(DEC); // http://www.example.com?name=이웅모&job=programmer&teacher
