// 응답 코드가 200~299인 경우 true로 설정되는 ok라는 필드가 있다.
// 익스플로러는 지원을 안해서 직접 200 ~ 299사이의 값인지 확인해야함.
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((data) => {
    if (!data.ok) throw Error(data.status);
    return data.json();
  })
  .then((post) => console.log(post.title))
  .catch((e) => console.log(e));
// GET 요청

// POST 요청 -> body도 보내야함.
// 두번째 인수로 설정 조건을 담은 객체를 전달
// JSON 데이터로 보내기 때문에 헤더의 Content-Type을 application/json으로 설정해야 함.

const update = {
  title: "Clarence White Techniques",
  body: "Amazing",
  userId: 1,
};

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(update),
};

fetch("https://jsonplaceholder.typicode.com/posts", options)
  .then((data) => {
    if (!data.ok) throw Error(data.status);
    return data.json();
  })
  .then((update) => console.log(update))
  .catch((e) => console.log(e));

// JSON 데이터가 가장 흔하지만, FormData같은 다른 방식도 있다.
// Mode, Cache 등을 설정할 수도 있다.
// 더 자세한 정보는 https://mzl.la/2rlwZGu

// fetch()작업을 한 곳에 모아두는 것도 좋은 방법 -> 수정, 테스트하기 쉬워짐.
// services 디텍터리를 생성해서 fetch()함수를 모아놓고 다른 함수에서 사용하는 방법을 살펴보아라.
