// Ajax (Asynchronous Javascript and XML)
// Web API인 XMLHttpRequest 객체를 기반으로 동작함.
// HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공함.

// JSON(Javascript Obejct Notation)
// JSON.stringify: 클라이언트 -> 서버로 객체 전송할 때 사용. (객체 -> 문자열화)
const obj = {
  name: "Oh",
  age: 29,
  alive: true,
  hobby: ["crossfit", "study"],
};

// 객체를 JSON 포맷의 문자열로 변환
const json = JSON.stringify(obj);
console.log(typeof json, json);
// string {"name":"Oh","age":29,"alive":true,"hobby":["crossfit","study"]}

// replacer 함수. 값의 타입이 Number면 필터링됨.
function filter(key, value) {
  return typeof value === "number" ? undefined : value;
}

const strFilteredObject = JSON.stringify(obj, filter, 2);
console.log(typeof strFilteredObject, strFilteredObject);
/*
  string {
  "name": "Oh",
  "alive": true,
  "hobby": [
    "crossfit",
    "study"
  ]
}
*/

const todos = [
  { id: 1, content: "HTML", completed: false },
  { id: 2, content: "JS", completed: true },
  { id: 3, content: "css", completed: false },
];

// 배열을 직렬화
const json2 = JSON.stringify(todos, null, 2); // 이쁘게 변환
console.log(typeof json2, json2);
/*
string [
  {
    "id": 1,
    "content": "HTML",
    "completed": false
  },
  {
    "id": 2,
    "content": "JS",
    "completed": true
  },
  {
    "id": 3,
    "content": "css",
    "completed": false
  }
]
 */

// JSON.parse : 서버 -> 클라이언트 넘어온 데이터는 문자열이다. 이걸 다시 객체로 변환
const parsed = JSON.parse(json);
console.log(typeof parsed, parsed);
// object {name: 'Oh', age: 29, alive: true, hobby: Array(2)}

// XMLHttpRequest
// 브라우저는 주소창이나 HTML의 form태그, a태그를 통해 HTTP 요청 전송 기능을 기본 제공함.
// Javascript로 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용해야 함.
const xhr = new XMLHttpRequest();
// HTTP 요청 초기화
xhr.open("GET", "http://localhost:3000/users");

// HTTP 요청 헤더 설정
// 클라이언트 -> 서버로 전송할 데이터의 MIME 타입 지정: json
xhr.setRequestHeader("content-type", "application/json");

// HTTP 요청 전송
// 요청 몸체에 담아 전송할 데이터(페이로드)를 인수로 전달할 수 있다.
// 객체인 경우 반드시 JSON.stringify 메서드를 직렬화한 다음 전달함.
// 메서드가 GET인 경우 인수는 무시됨.
xhr.send(JSON.stringify(parsed));

console.log(xhr.readyState);
