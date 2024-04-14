const team = ["Michelle B", "Dave L", "Dave C", "Courtney B", "Davina M"];
const daves = [];
for (let i = 0; i < team.length; i++) {
  if (team[i].match(/Dav/)) {
    daves.push(team[i]);
  }
}

console.log(daves);

// filter 이용
const davesFilter = team.filter((member) => member.match(/Dav/));
console.log(davesFilter);

const scores = [30, 82, 70, 45];
function getNumberOfPassingScores(scores) {
  const passing = scores.filter((score) => score > 59); // [82, 70]
  return passing.length;
}

// 배열에서 반환해야하는 값이 하나인 경우 find() -> for문에서 break문을 사용하는 경우
// find()의 단점: 반환값을 확신할 수 없다는 것. 못 찾으면 undefined를 반환해버림.
const instructors = [
  {
    name: "jin",
    libraries: ["media edu"],
  },
  {
    name: "serra",
    libraries: ["memo", "info"],
  },
  {
    name: "aliat",
    libraries: ["center"],
  },
];

let memorialInstructor;
for (let i = 0; i < instructors.length; i++) {
  if (instructors[i].libraries.includes("memo")) {
    memorialInstructor = instructors[i];
    break;
  }
}
console.log(memorialInstructor);

const librarian = instructors.find(({ libraries }) =>
  libraries.includes("memo1")
) || {
  name: "default",
  libraries: [],
};
console.log(librarian);

// find() 메서드에는 또 다른 아쉬운 점이 있다. 하드코딩을 해야한다는점("memo").
// 배열 메서드의 콜백 함수는 인수가 하나뿐이라는 문제가 있다.
// 검사 대상인 항목 하나만 인수로 받을 수 있는데,조건에 일치하는지 확인할 변수가 필요해서 두 번째 인수를 추가해야 할 때 문제가 발생.

// 도서관의 다른 곳을 검사하려면 어떻게 해야할까?
const findByLibrary = (library) => (instructor) =>
  instructor.libraries.includes(library);
const test = ({ libraries }) => libraries.includes("media edu");
// const librarianCurrying = instructors.find(findByLibrary("media edu"));
const librarianCurrying = instructors.find(test);
console.log(librarianCurrying);

// 커링은 해당 함수를 호출하고 재사용할 때 진가를 발휘합니다.

// 커링 적용전 곱셈함수
const multiply_v1 = (a, b, c) => {
  return a * b * c;
};

// 커링 적용한 곱셈함수
const multiply_v2 = (a) => (b) => (c) => {
  return a * b * c;
};

const VAT = 1.05; // 5% VAT

// a -> 부과세, b -> 가격, c-> 갯수

const shirts_price = multiply_v1(VAT, 20000, 4);
const pants_price = multiply_v1(VAT, 15000, 4);

//커링의 장점: 인자를 분할해서 따로 관리할 수 있음.
const multiply_VAT = multiply_v2(VAT); // 부가세가 첫번째 인자로 전달된 함수를 multply_VAT 변수에 선언

const shirts_price_cur = multiply_VAT(20000)(4);
const pants_price_cur = multiply_VAT(15000)(2);

// React에서
// 인자가 없을경우
{
  /* <button onClick={handleClick}>전송</button> */
}

// 인자가 있을경우 (익명 함수로 전달)
{
  /* <button onClick={() => handleClick(value)}>전송</button> */
  const handleClick = (value) => () => {
    console.log(value);
  };
  // <button onClick={handleClick(value)}>전송</button>; // 이렇게 줄일 수 있음.
}
