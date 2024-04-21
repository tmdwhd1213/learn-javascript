// 자바스크립트는 64비트(부호(sign), 지수(exponent), 가수(fraction) ) 배정밀도(double-precision) 부동소수점. -> 십진수의 소수인 0.1과 0.2는 2진수로 정확히 표현하기 힘듦. 따라서 근사값이 나오게됨.
// IEEE 754 표준에 따라 배정밀도 방식으로 처리됨.

const prices = ["1.0", "negotiable", "2.15"];
const formattedPrices = [];
for (let i = 0; i < prices.length; i++) {
  const price = parseFloat(prices[i]);
  if (price) formattedPrices.push(price);
}
console.log(formattedPrices);

console.log(parseFloat(0.1 + 0.2));

const team = [
  {
    name: "mel",
    position: "ux designer",
  },
  {
    name: "katie",
    position: "strategist",
  },
  {
    name: "madhavi",
    position: "developer",
  },
  {
    name: "justin",
    position: "manager",
  },
  {
    name: "chris",
    position: "developer",
  },
];

// map() -> 형태를 바꿀 수 있지만, 길이 유지.

// filter() -> 길이를 바꿀 수 있지만, 형태는 바꿀 수 없음.

// sort() -> 순서만 바꿈. a와 b 비교해서 a-b 오름차순, b-a 내림차순
console.log(
  [0, 3, 2, 6, 4, 1].sort((a, b) => {
    // return -1이면 reverse()
    // return -1;
    // return 1; // 그대로
    // return 0; // 그대로
    return a - b;
  })
);

// find() -> 배열을 반환X, 한 개의 데이터가 반환되고 형태는 바뀌지 않음. -> 팀의 관리자를 찾아라. 결과: {name: 'justin', position: 'manager'}
console.log(team.find(({ position }) => position === "manager"));

// forEach() -> 형태를 이용하지만, 아무것도 반환하지 않음. -> 모든 팀원에게 상여를 지급. -> Mel이 상여를 받았!, Katie가 상여를 받았!...
team.forEach(({ name }) => console.log(`${name}가 상여를 받았습니다.`));

// reduce() -> 길이와 형태를 바꾸는 것을 비롯해 무엇이든 처리할 수 있음. -> 개발자와 비개발자인 모든 팀원을 수를 계산하라. -> {developers: 2, non-developers: 3}
console.log(
  team.reduce(
    (prev, { position }) => {
      position === "developer"
        ? prev["developers"]++
        : prev["non-developers"]++;

      return prev;
    },
    { developers: 0, "non-developers": 0 }
  )
);
