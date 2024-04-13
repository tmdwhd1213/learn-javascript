function getIconPath(icon) {
  // Boolean이 아닌 falsy, truly 값이 반환된다.
  // ||는 둘 다 truly일 경우 앞 값을, &&는 뒷 값을.
  console.log("a" || "b"); // 'a'
  console.log("a" && "b"); // 'b'
  console.log(NaN || "b"); // 'b'
  console.log(NaN && "b"); // NaN
  console.log("a" || NaN); // 'a'
  console.log("a" && NaN); // NaN
  console.log("" || NaN); // NaN
  console.log("" && NaN); // ''

  const foo = null ?? "default string";
  console.log(foo);
  // Expected output: "default string"

  const baz = 0 ?? 42;
  console.log(baz);
  // Expected output: 0

  const e = undefined || 42;
  console.log(e); // 42

  const nu = null || 42;
  console.log(nu); // 42

  const Na = NaN ?? 42;
  console.log(Na); // NaN

  // &&는 앞이 truly면 뒤로 패스하고, 앞이 falsy면 앞값을 반환
  // ||는 앞이 truly면 앞값을 반환하고, 앞이 falsy면 뒷값을 반환

  const path = icon.path || "uploads/default.png";
  return `https://assets.foo.com/${path}`;
}

const icon = {
  path: `acme/bar.png`,
};
console.log(getIconPath(icon)); // https://assets.foo.com/acme/bar.png

const userConfig1 = {};
const userConfig = { images: ["asd.gif"] };
// const img = userConfig1.images[0] || "default.png"; // Uncaught TypeError TypeError: Cannot read properties of undefined (reading '0')

function getFirstImage(userConfig) {
  let img = "default.png";
  if (userConfig.images && userConfig.images.length) {
    // undefined 발생 if문 중첩.
    // if (userConfig.images.length) {
    img = userConfig.images[0];
    // }
  }
  return img;
}
// 삼항연산자와 단락 평가를 이용해 코드를 더 줄일 수 있다.
// 하지만 이렇게 하면 나중에 조건을 추가할 때 수정하기 어려워짐.
// 예를 들어 .gif확장자는 받지 않으려고 한다.
function getFirstImage2({ images }) {
  return images && images.length && !images[0].includes("gif")
    ? images[0]
    : "default.png";
}

console.log(getFirstImage(userConfig1)); // default.png
// 그러나, 배열에 항목이 없다면 문제가 발생.
console.log(getFirstImage(userConfig)); // undefined -> 이 문제를 해결하기 위해 함수에 조건문을 하나 더 중첩
console.log(getFirstImage2(userConfig));

// 대체로 3가지 이상의 조건이 들어가면 독립적인 함수를 만드는게 나음.
// 코드를 줄이는 것보단 가독성이 좋은 코드를 만들자. 1순위: 의사소통, 가독성
