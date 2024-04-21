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
