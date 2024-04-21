// 데이터가 변동이 많으면 (추가, 삭제) Map 사용
const firms = new Map()
  .set(10, "Ivie Group")
  .set(23, "Soundscaping Source")
  .set(31, "Big 6");

const entries = [...firms];
for (let i = 0; i < entries.length; i++) {
  const [id, name] = entries[i];
  if (!isAvaliable(id)) {
    return `${name}는 사용할 수 없습니다.`;
  }
}

function isAvaliable(id) {
  return true;
}

const firmsObj = {
  10: "Ivie Group",
  23: "Soundscaping Source",
  31: "Big 6",
};

// for of 문과 마찬가지로 무조건적으로 for in문을 사용하는 것은 좋지 않다.
for (const id in firmsObj) {
  if (!isAvaliable(parseInt(id, 10))) {
    return `${firmsObj[id]}는 사용할 수 없다.`;
  }
}

// 주의사항!!! 객체를 순회하면서 조작X!!!
// 반복중인 속성 이외에 다른 속성을 추가하거나 수정하는건 너무 위험함.
//
