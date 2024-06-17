// 비동기 함수인 setTimeout 함수는 콜백 함수의 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당하지 못한다.
let g = 0;
setTimeout(() => {
  g = 100;
}, 0);
console.log(g); // 0

/*
  GET 요청을 전송하고 서버의 응답을 전달받는 get함수도 비동기 함수다.
  onload 이벤트 핸들러가 비동기로 동작하기 때문.
  get 하무
*/

const get = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버의 응답을 반환함.
      return JSON.parse(xhr.response);
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

const response = get("https://jsonplaceholder.typicode.com/posts/1");
console.log(response); // undefined
