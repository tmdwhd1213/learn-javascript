// 정규 표현식 : 일정한 패턴을 가진 문자열의 집합을 표현하기 위해 사용하는 형식 언어
// ex 사용자로부터 입력받은 폰번호
const tel = "010-0000-113이";

// 정규표현식 리터럴로 휴대폰 전화번호 패턴을 정의
let regExp = /^\d{3}-\d{4}-\d{4}$/;

console.log(regExp.test(tel)); // false

let target = "Is this all there is?";
// 패턴: is
// 플래그: i => ignore case => 대소문자를 구별하지 않고 검색한다.
regExp = new RegExp(/is/i);

// RegExp.prototype.test -> 매칭 결과를 불리언 값으로 반환함.
console.log(regExp.test(target)); // true

// String.prototype.match -> 매칭결과를 배열로 반환함.
// 플래그: g => global => 모든 매칭되는 것들을 검색
regExp = new RegExp(/is/g);
console.log(target.match(regExp)); // ['is', 'is']

// 플래그: m => multi line => 문자열의 행이 바뀌어도 패턴 검색을 계속함.

// 두개 이상의 플래그를 동시에 설정할 수도 있다.
console.log(target.match(/is/gi)); // ['Is', 'is', 'is']

// 패턴 -> 임의의 문자열 검색
// . <- 공백문자 포함. 예를 들어 /.../ 이러면 3자리 문자열과 매치한다.
regExp = /.../g;
console.log(target.match(regExp)); // ['Is ', 'thi', 's a', 'll ', 'the', 're ', 'is?']

// 반복 검색: A{1,3} -> A가 최소 1회, 최대 3회 반복되는 문자열을 검색한다. A{1, 3} 이렇게 공백을 두면 정상적으로 작동X 주의!
target = "A AA B Ba BA BB AAA AAAA";
regExp = /A{1,3}/g;
console.log(target.match(regExp));

// 최소 반복 A{1,} === A+
regExp = /A{1,}/g;
console.log(target.match(regExp));
regExp = /A+/g;
console.log(target.match(regExp));

// ? <- 앞선 패턴이 최대 0번 이상 반복 u? === u{0,1}
target = "color colour";
regExp = /colou?r/g;
console.log(target.match(regExp)); // ['color', 'colour']

// OR 검색 /c|o/
regExp = /c+|o+/g;
console.log(target.match(regExp)); // ['c', 'o', 'o', 'c', 'o', 'o']

regExp = /[co]+/g;
console.log(target.match(regExp)); // ['co', 'o', 'co', 'o']

// 범위 지정: /[A-Za-z]/g -> 알파벳 대소문자 구분하지 않고
regExp = /[A-Za-z]+/g;
target = "AA Bb Aa BB 12";
console.log(target.match(regExp)); // ['AA', 'Bb', 'Aa', 'BB']

// /[^]/ 대문자 안의 ^는 NOT의 의미
// /^[]/ -> 문자열이 이것으로 시작했는지 의미
target = "https://naver.com";
// https로 시작하는지 검사함.
regExp = /^https/;
console.log(regExp.test(target)); // true
// /$/은 문자열의 이것으로 끝이 났는지
regExp = /com$/;
console.log(regExp.test(target)); // true

// https:// 또는 http://로 시작하는지 검사
regExp = /https?:\/\//;
console.log(regExp.test(target)); // true

// 하나 이상의 공백으로 시작하는 검사: /\s/
target = ` HI!`;
regExp = /^[\s]+/;
console.log(regExp.test(target)); // true

// 아이디(대소문자 or 숫자로 시작하고 끝나며 4~10자리인지 검사)
const id = "asd123q";
regExp = /^[A-Za-z0-9]{4,10}$/;
console.log(regExp.test(id));

const str = "Hello world";
// $& -> 검색된 문자열
console.log(str.replace("world", "<strong>$&</strong>")); // Hello <strong>world</strong>

// 카멜 케이스를 스네이크 케이스로 변환하는 함수
function camelToSnake(camelCase) {
  return camelCase.replace(/.[A-Z]/g, (match) => {
    console.log(match);
    return match[0] + "_" + match[1].toLowerCase();
  });
}
const camelCase = "helloWorld";
console.log(camelToSnake(camelCase)); // hello_world

// 스네이크 케이스를 카멜 케이스로 변환
function snakeToCamel(snakeCase) {
  return snakeCase.replace(/_[a-z]/g, (match) => {
    console.log(match);
    return match[1].toUpperCase();
  });
}
const snakeCase = "hello_world";
console.log(snakeToCamel(snakeCase)); // helloWorld
