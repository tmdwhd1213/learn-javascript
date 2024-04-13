const defaults = new Map()
  .set("color", "brown")
  .set("species", "a")
  .set("location", "seoul");
const filters = new Map().set("color", "black");

// 부수 효과를 신경쓰지 않는다면 has()메서드로 존재하는지 여부만 확인해서 조건 걸면 됨.
/*
function applyDefaults(map, defaults) {
  const copy = new Map([...map]);
  for (const [key, value] of defaults) {
    if (!copy.has(key)) {
      copy.set(key, value);
    }
  }
  return copy;
} 
*/
// 위의 함수는 단순히 데이터를 병합만을 위한 것이면 맞다.
// 이 상태로 객체를 조작하면 사용자에게 모든 정보가 노출됨. -> 이 문제를 피하기 위해 맵의 사본을 만들어야함.

// 여러 가지 키의 존재를 일일이 확인. 이 과정 생략하기.
// Map은 일반 객체와 마찬가지로 하나의 키만을 사용 할 수있다. -> 중복되면 마지막 값으로 오버라이딩
function applyDefaults(map, defaults) {
  return new Map([...defaults, ...map]);
}
