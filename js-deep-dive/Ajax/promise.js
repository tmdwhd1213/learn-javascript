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

const get = (url, successCallback, failureCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버의 응답을 반환함. (get함수 자체의 반환문이 아님.) 따라서 undefined 반환
      // return JSON.parse(xhr.response);
      successCallback(JSON.parse(xhr.response));
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

const response = get("https://jsonplaceholder.typicode.com/posts/1");
console.log(response); // undefined

get("https://jsonplaceholder.typicode.com/posts/1", (user) =>
  console.log(user)
);

// 비동기 처리의 콜백 헬 예제
const URL = `https://jsonplaceholder.typicode.com`;

// id가 1인 post의 userId를 취득
get(`${URL}/posts/1`, ({ userId }) => {
  console.log(userId); // 1
  // post의 userId를 사용하여 user 정보 취득
  get(`${URL}/users/${userId}`, (userInfo) => {
    console.log(userInfo);
  });
});

// 비동기 처리를 위한 콜백 패턴의 가장 큰 문제점은 에러 처리를 못한다는 것.
try {
  setTimeout(() => {
    throw new Error("Error!");
  }, 1000);
} catch (e) {
  // 에러를 캐치하지 못함
  console.error("캐치한 에러", e);
}

// 이러한 문제를 해결하기 위해 Promise가 ES6에 도입되었다. (ECMAScript 스펙)

// 프로미스 생성 (resolve, reject)
const promise = new Promise((resolve, reject) => {
  // Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행함.
  if (1 == true /* 비동기 처리 성공 */) {
    resolve("result");
  } else {
    /* 비동기 처리 실패 */
    reject("failure");
  }
});

// GET 요청을 위한 비동기 함수
const promiseGet = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        // 성공적으로 응답받으면 resolve
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });
};

// promiseGet함수는 프로미스를 반환한다.
promiseGet(`${URL}/posts/1`);

// 프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체다.

// Promise.prototype.then 메서드
// 콜백함수를 인수로 전달되는데, 이 콜백함수의 인수는 resolve와 reject라는
// 두 함수를 인수로 받는다.
const prom = new Promise((resolve, reject) => {
  resolve("fulfilled");
  reject(new Error("rejected"));
})
  .then(
    (v) => console.log(v),
    (e) => console.error(e)
  )
  // Promise.prototype.catch() -> rejected일 때만
  .catch((e) => console.log(e))
  // 무조건 한번 호출. 프로미스 상태와 상관없이 공통적으로 수행해야 할 처리 내용이 있을 때
  // 유용하다.
  .finally(() => console.log("finally"));
console.log(prom);

// then, catch, finally 메서드는 항상 프로미스를 반환한다.

// 프로미스로 구현한 비동기 함수 get을 이용해 후속 처리를 구현해보자.
const promiseGet2 = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error(xhr.status));
      }
    };
  });
};

promiseGet2(`${URL}/posts/1`)
  .then((res) => console.log(res))
  .catch((err) => console.error(err))
  .finally(() => console.log("Bye!"));

// 프로미스의 에러처리
const wrongUrl = "https://jsonplaceholder.typicode.com/XXX/1";

// 부적절한 URL이 지정되어 에러가 발생
promiseGet2(wrongUrl)
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); // Error: 404

promiseGet2(`${URL}/posts/1`)
  .then(({ userId }) => promiseGet2(`${URL}/users/${userId}`))
  .then((userInfo) => console.log(userInfo))
  .catch((err) => console.error(err));

// 프로미스도 콜백 패턴을 사용한다. 이는 가독성이 좋지 않으므로
// ES8에 도입된 async/await를 통해 해결할 수 있다.
(async () => {
  const { userId } = await promiseGet(`${URL}/posts/1`);
  const userInfo = await promiseGet(`${URL}/users/${userId}`);
  console.log(userInfo);
})();

// 프로미스의 정적 메서드
// 1. Promise.resolve / Promise.reject
// 이미 존재하는 값을 포장(래핑)하여 프로미스를 생성하기 위해 사용함.
const resolvedPromise = Promise.resolve([1, 2, 3, 4]);
console.log(resolvedPromise); // Promise {<fulfilled> Array(3)}
resolvedPromise.then(console.log); // (4) [1, 2, 3, 4]

// 위의 예제는 아래와 같다.
const resolvedPromise2 = new Promise((resolve) => resolve([1, 2, 3, 4]));
resolvedPromise2.then(console.log); // (4) [1, 2, 3, 4]

// reject는 resolve와 동일

// Promise.all() -> 여러 개의 비동기 처리를 모두 병렬처리할 때 사용.
const requestData1 = () =>
  new Promise((resolve) => setTimeout(() => resolve(1), 3000));
const requestData2 = () =>
  new Promise((resolve) => setTimeout(() => resolve(2), 2000));
const requestData3 = () =>
  new Promise((resolve) => setTimeout(() => resolve(3), 1000));

// 세 개의 비동기 처리를 순차적으로 처리
let res = [];
let res2 = [];
requestData1()
  .then((data) => {
    res.push(data);
    return requestData2();
  })
  .then((data) => {
    res.push(data);
    return requestData3();
  })
  .then((data) => {
    res.push(data);
    console.log(res); // 약 6초 걸림 3, 2, 1 초 합쳐서
  })
  .catch(console.error);

// 아래의 예제는 직렬이 아닌 병렬로 개별적으로 수행된다. (약 3초)
Promise.all([requestData1(), requestData2(), requestData3()])
  .then((data) => {
    res2 = data;
    console.log(res2); // 약 3초
  })
  .catch(console.error);

// 모든 프로미스가 fulfilled 상태가 되면 resolve된 처리 결과를 모두 배열에 저장해
// 새로운 프로미스를 반환한다.
// 이때 첫 번째 프로미스가 제일 늦게 fulfilled가 되어도 차례대로 배열에 저장해
// 처리 순서가 보장된 배열을 resolve하는 새로운 프로미스를 반환한다.

// Promise.all 메서드는 배열의 프로미스가 하나라도 rejected가 되면 나머지 프로미스가
// fulfilled 상태가 되는 것을 기다리지 않고 그 즉시 종료한다.
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
  new Promise(
    (resolve, reject) => setTimeout(() => reject(new Error("Error 2")), 2000) // Error: Error 2
  ),
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
])
  .then(console.log)
  .catch(console.error);

// Promise.all 메서드는 인수로 전달받은 이터러블의 요소가 프로미스가 아닌 경우
// 그 요소를 Promise.resolve()를 통해 프로미스로 래핑한다.

Promise.all([
  1, // -> Promise.resolve(1)
  2, // -> Promise.resolve(2)
  3, // -> Promise.resolve(3)
])
  .then(console.log)
  .catch(console.error);

// 깃허브 아이디로 깃허브 사용자 이름을 취득하는 3개의 비동기 처리를 모두 병렬로 처리하는 예
const githubIds = ["jeresig", "ahejlsberg", "ungmo2"];

Promise.all(
  githubIds.map((id) => promiseGet2(`https://api.github.com/users/${id}`))
)
  .then((users) => users.map((user) => user.name))
  .then(console.log)
  .catch(console.error);

// Promise.race() 가장 먼저 fullfiled되는 프로미스를 resolve하는 새로운 프로미스를 반환
Promise.race([requestData1(), requestData2(), requestData3()])
  .then(console.log)
  .catch(console.error); // 3

// 하나라도 reject 상태가 되면 Promise.all과 마찬가지로 에러를 reject하는 프로미스 반환
Promise.race([
  requestData1(),
  new Promise((_, reject) => reject(new Error("레이스 에러!")), 2000),
  requestData3(),
])
  .then(console.log)
  .catch(console.error); // Error: 레이스 에러!

// Promise.allSettled() ES11(ECMAScript2020)에 도입.
// fulfilled든 rejected 상태든 처리 결과를 배열로 반환함.
Promise.allSettled([
  requestData1(),
  new Promise((_, reject) => reject(new Error("레이스 에러!")), 2000),
  requestData3(),
])
  .then(console.log)
  .catch(console.error);
/*
[  
  {status: 'fulfilled', value: 1},
  {status: 'rejected', reason: Error: 레이스 에러! at http://127.0.0.1:5500/js-deep-dive/Ajax/promise.js:261:37 at new Promise …},
  {status: 'fulfilled', value: 3}
]
*/
