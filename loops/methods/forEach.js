// 모든 항목에 동일한 동작을 수행함.
// 필요에 맞는 크기와 형태를 갖춘 배열을 얻고, 해당 데이터로 무언가를 해야 할 때
// forEach는 아무 것도 반환하지 않음. return void;
// forEach가 가치있는 이유 -> 다른 메서드처럼 단순화하기 때문이 아닌, 예측 가능하고 다른 배열 메서드와 함께 연결할 수 있기 때문.
// 부수효과가 일어나서 주의해야함. (부수효과가 나쁜 것은 아님)
// forEach를 쓰는 가장 좋은 경우는 함수의 유효 범위를 벗어나는 작업이 필요한 경우. 즉, 반드시 부수 효과가 필요한 경우
const sailors = [
  { name: "yi hong", active: true, email: "yh@gmail.com" },
  { name: "andy", active: true, email: "andy@naver.com" },
  { name: "darcy", active: true, email: "" },
  { name: "jessi", active: false, email: "jessi123@daum.net" },
  { name: "alex", active: false, email: "alex1313@gmail.com" },
];

sailors.forEach(sendEmail);
function sendEmail(sailor) {
  // console.log(`${member.name}님에게 이메일을 보냈습니다.`);
  console.log(`${sailor}로 전송되었습니다.`);
}

// 이처럼 원본 배열를 조작하진 않지만 부수 효과가 필요한 경우.
// const로 표현해도 반환값이 undefined고 예측 불가능하니까 무언가 확신이 없을 경우 불안정함이 있을 수 있다.
// 그럼에도 forEach를 쓰는 이유는 체이닝 과정에서 다른 배열 메서드와 결합할 수 있기 때문이다.
// 매번 변수에 배열 메서드의 결괏값을 저장할 필요없이 동일한 배열에서 여러 작업을 처리할 수 있다.

// 활동하는 회원만 추려내기.
const active = sailors.filter((sailor) => sailor.active);

// 이메일주소 정규화하기 -> 이메일이 있다면 그걸로 쓰고 없으면 이름@기본값으로.
const emails = active.map(
  (member) => member.email || `${member.name}@sailing.org`
);

console.log(emails);

emails.forEach(sendEmail);

// 위의 모든 과정을 체이닝을 이용하여 한번에 해결할 수 있음.
console.log("----------------------------------------------");
sailors
  .filter((sailor) => sailor.active)
  .map((sailor) => sailor.email || `${sailor.name}@sailing.org`)
  .forEach(sendEmail);

// 이런 체이닝의
// 장점: 각 배열 메서드가 고유의 작업을 수행하기 때문에 가독성이 좋다는 것이고,
// 단점: 새로운 메서드를 호출할 때마다 반환된 배열 전체를 다시 반복한다는 점. -> for문을 사용하면 name, active, email에 각 한 번씩 총 세 번이면 끝나는데,
// 체이닝은 모든 작업을 수행하기 때문에 총 7번 반복함. (원본 배열에 filter() 적용할 때 3번, map()에 2번, forEach()를 호출할 때 2번.)
