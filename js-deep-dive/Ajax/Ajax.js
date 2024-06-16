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
xhr.open("GET", "http://localhost:3000/users?test=hi&foo=bar");

// HTTP 요청 헤더 설정
// 클라이언트 -> 서버로 전송할 데이터의 MIME 타입 지정: json
xhr.setRequestHeader("content-type", "application/json");

// cf. 클라이언트 -> 서버로 전송할 데이터: x-www-form-urlencoded
// 쿼리스트링의 형태로 전송 key=value&key2=value2
const xhr2 = new XMLHttpRequest();
xhr2.open("POST", "http://localhost:3000/users");
xhr2.setRequestHeader("content-type", "application/x-www-form-urlencoded");

const data = { title: "Javascript", autor: "Park", price: 5000 };

xhr2.send(
  Object.keys(data)
    .map((key) => `${key}=${data[key]}`)
    .join("&")
);

// HTTP 요청 전송
// 요청 몸체에 담아 전송할 데이터(페이로드)를 인수로 전달할 수 있다.
// 객체인 경우 반드시 JSON.stringify 메서드를 직렬화한 다음 전달함.
// 메서드가 GET인 경우 인수는 무시됨.
xhr.send(JSON.stringify(parsed));

// XMLHttpResquest.readyState 프로퍼티가 변경(이벤트 발생)될 때마다 onreadystatechange
// 이벤트 핸들러가 호출된다.
xhr.onreadystatechange = function (e) {
  // readyState는 XMLHttpRequest의 상태를 반환 : 4 => DONE)서버 응답 완료
  if (xhr.readyState !== XMLHttpRequest.DONE) return;

  if (xhr.status === 200) {
    console.log(xhr.responseText);
    // document.getElementById("content").textContent = xhr.responseText;
    showTours(xhr.responseText);
  } else {
    console.log(`[${shr.status}] : ${xhr.statusText}`);
  }
};

//서버에 원격 서버로부터 데이터를 수집하는 별도의 기능을 추가하는 것이다.
// CORS 우회 : 이를 프록시(Proxy)라 한다.

function showTours(parsed) {
  // console.log(parsed); // data: object
  const data = JSON.parse(parsed);
  console.log(data);

  // JSON -> HTML String
  let newContent = `<div id="tours>
    <h1>Guided Tours</h1>
    <ul>
  `;

  data.tours?.forEach((tour) => {
    newContent += `<li class="${tour.region} tour"
        <h2>${tour.location}</h2>
        <span class="details">${tour.details}</span>
        <button class="book">Book Now</button>
      </li>
    `;
  });

  newContent += `</ul></div>`;

  document.getElementById("content").innerHTML = newContent;
}

// REST API
const restXhr = new XMLHttpRequest();
restXhr.open("GET", "http://localhost:5000/todos/1");
restXhr.send();
// restXhr.open("POST", "http://localhost:5000/todos");
// restXhr.setRequestHeader("Content-Type", "application/json");
// restXhr.send(JSON.stringify({ id: 5, content: "React", completed: true }));

restXhr.onreadystatechange = function (e) {
  if (restXhr.readyState !== XMLHttpRequest.DONE) return;

  if (restXhr.status === 200) {
    console.log(restXhr.response);
  } else {
    console.log("Error!");
  }
};

// POST
/*
  $ curl -X POST http://localhost:5000/todos -H "Content-Type: application/json" -d '{"id": 4, "content": "Angular", "completed": true}'
{
  "id": 4,
  "content": "Angular",
  "completed": true
}
*/

function postHandler() {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/todos");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ id: 4, content: "js", completed: false }));

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 201) {
      // 201: created
      console.log(xhr.response);
    } else {
      console.log("error");
    }
  };
}

document.getElementById("dbPost").addEventListener("click", postHandler);

// DELETE
// $ curl -X DELETE http://localhost:5000/todos/4
function deleteHandler() {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `http://localhost:5000/todos/4`);
  xhr.send();

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      console.log(xhr.response);
    } else {
      console.log("Err!");
    }
  };
}

document.getElementById("dbDelete").addEventListener("click", deleteHandler);

// PATCH
// $ curl -X PATCH http://localhost:5000/todos/4 -H "Content-Type: application/json" -d '{"completed": true}'
function patchHandler() {
  const xhr = new XMLHttpRequest();
  xhr.open("PATCH", `http://localhost:5000/todos/4`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ completed: true }));

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {
      console.log(xhr.response);
    } else {
      console.log("Error!");
    }
  };
}
document.getElementById("dbPatch").addEventListener("click", patchHandler);

/*페이로드란?
  {
    "status":"OK",
    "data": {
        "message":"Hello, world!"
    }
}

이 JSON 데이터 중에 "Hello, world!"가 클라이언트가 관심을 가지는 페이로드다. 나머지 부분은 중요하지만 프로토콜 오버헤드다.
*/
