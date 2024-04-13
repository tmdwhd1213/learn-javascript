let title = "";
let permissions;

// 블록 레벨 스코프인 const, let를 써서 블록 안에서 변수 선언하면 유효범위 밖에서 접근이 불가하다. 따라서 밖에서 지정하고 안에서 조작하던 해야함.
if (title === "과장") {
  permissions = ["근로시간", "수당"];
} else {
  permissions = ["근로시간"];
}

console.log(permissions);

// 삼항연산자를 쓰면 const로 바로 값을 할당할 수 있어서 예측 가능한 코드가 됨.
// 다만, 여러 개의 조건을 연달아 쓰는 경우는 삼항연산자를 피하자. (가독성이 많이 떨어짐.)
title = "과장";
const permissionsTernary =
  title === "과장" || title === "부장"
    ? title === "과장"
      ? ["근로시간", "초과근무승인", "수당"]
      : ["근로시간", "초과근무승인"]
    : ["근로시간"];
console.log(permissionsTernary);

// 이 경우 if문을 써야하는데, 밖에서 if문을 쓰기 보단, 독립적인 함수를 만들어서 안에서 if문을 넣는 것이 좋다.
function getTimePermissions({ title }) {
  if (title === "과장") return ["근로시간", "초과근무승인", "수당"];
  else if (title === "부장") return ["근로시간", "초과근무승인"];
  return ["근로시간"];
}
// 이렇게 하면 const 키워드로 이 친구는 값이 변하지 않구나라는 예측 가능한 코드가 됨.
const permissions2 = getTimePermissions({ title: "사원" });
console.log(permissions2); // ['근로시간']

// 이런식으로 추상화 없이 한 가지 작업만을 목적으로 하는 짧은 함수를 만드는 것은 바람직하다.
