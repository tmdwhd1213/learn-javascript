// 마이크로 태스크 큐
setTimeout(() => console.log(1), 0);
Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));

// 프로미스 후속 처리 메서드도 비동기로 동작하므로 1 -> 2 -> 3 순으로 출력될 것 같지만
// 2 -> 3 -> 1의 순으로 출력된다.

// 그 이유는 프로미스의 후속 처리 메서드의 콜백 함수는 태스크 큐가 아닌
// 마이크로태스크 큐에 저장되기 때문이다.

// 마이크로태스크 큐는 태스크 큐와 별개의 큐다.
// 마이크로태스크 큐에는 프로미스의 후속 처리 메서드의 콜백 함수가 일시 저장된다.
// 그 외의 비동기 함수의 콜백 함수, 이벤트 핸들러는 태스크 큐에 일시 저장된다.

// 마이크로태스크 큐는 태스크 큐보다 우선순위가 높다.
// 이벤트 루프는 콜 스택이 비어있으면 먼저 마이크로태스크 큐를 뒤져보고
// 마이크로태스크 큐도 비면 그제서야 태스크 큐를 뒤져 대기하고 있는 함수를 가져와 실행함.

// fetch -> IE 제외하고 모든 브라우저에서 작동 가능 == XMLHttpRequest();
// XMLHtpRequest 객체보다 사용법이 간단하고 프로미스를 지원하기 때문에
// 비동기처리를 위한 콜백 패턴의 단점에서 자유롭다.
// fetch 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환한다.

// fetch(url [, options])
const URL = "https://jsonplaceholder.typicode.com";
fetch(`${URL}/todos/1`)
  .then((response) => response.json())
  .then(console.log); // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
// Response {type: 'cors', url: 'https://jsonplaceholder.typicode.com/todos/1', redirected: false, status: 200, ok: true, …}

// 개인적으로 궁금한 것 blob(binary large object)
// 프록시 서버를 통해 CORS 문제를 해결 (cors-anywhere은 무료로 사용할 수 있는 프록시 서비스)
// const proxyUrl = "https://cors-anywhere.herokuapp.com/";
// 서버에서 프록시를 이용해 주소를 우회하여 cors 해결
const imgUrl = `http://localhost:5001/proxy/i/9UEGU8qmh4vx2VeadkbhN0AyybcM65lk_CfLrpFwwPguNlOuhbHg_lkztSD2gJgoxl0QU4vJUw1dv243OigVeg.webp`;
// fetch를 사용한 이미지 요청
fetch(imgUrl)
  .then((response) => response.blob())
  .then((blob) => {
    // Blob 객체를 URL로 변환
    const imageObjectUrl = window.URL.createObjectURL(blob);

    // <img> 요소를 만들어서 페이지에 추가
    const img = document.createElement("img");
    img.src = imageObjectUrl;
    document.getElementById("root").appendChild(img);
  })
  .catch(console.error);

const request = {
  get(url, params) {
    if (params) url += "?" + new URLSearchParams(params).toString();
    return fetch(url);
  },

  post(url, payload) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },

  patch(url, payload) {
    return fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },

  delete(url) {
    return fetch(url, { method: "DELETE" });
  },
};

// db로 직접 연결하면 별로 -> 서버 통해서 디비로 연결하자
const dbURL = `http://localhost:5000`;

// GET 요청
request
  .get(`/todos`, { id: 1 })
  .then((response) => response.json())
  .then((todos) => console.log(todos))
  .catch(console.error);

// POST 요청
request
  .post(`/todos`, {
    id: 7,
    content: "Vue.js",
    completed: false,
  })
  .then((response) => response.json())
  .then((todos) => console.log(todos))
  .catch(console.error);

// PATCH 요청
request
  .patch("/todos/7", {
    completed: true,
  })
  .then((response) => response.json())
  .then((todos) => console.log(todos))
  .catch(console.error);

// DELETE 요청
request
  .delete("/todos/3")
  .then((response) => response.json())
  .then((result) => console.log(result))
  .catch(console.error);
