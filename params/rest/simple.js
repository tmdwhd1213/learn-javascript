// 사진에 태그를 입력할 수 있되, 태그의 길이가 일정 수준으로 제한해야 함.
function validateCharacterCount(max, items) {
  return items.every((item) => item.length < max);
}

console.log(validateCharacterCount(10, ["Bobbs", "Eagles"]));

// 위처럼하면 데이터 컬랙션(배열)을 강제해야한다는 단점이 있음.
// 예전 개발자들은 arguments를 이용하여 해결함.
function validateCharacterCount2(max, ...items) {
  return items.every((item) => item.length < max);
}

console.log(validateCharacterCount2(2, "asdasd"));

// rest는 매개변수가 뭔지 모를 때 쓰는 디버깅에 활용하는 매우 훌륭한 방법임.
const e = ["Spirited Away", "Princess Mononoke"].map((film, ...other) => {
  console.log(JSON.stringify(other));
  return film.toLowerCase();
});

console.log(e);

// 부수 효과 없애면서 쉽게 배열 분리하는 법.
const queue = ["stop", "collabo", "listen"];
const [first, ...remaining] = queue;
console.log(remaining); // ['collabo', 'listen']

// 주의! pop()메서드로는 못함.
// const [...begin, last] = queue; // rest 요소는 배열 구조 파괴 패턴의 마지막 요소여야 합니다.ts(2462)
