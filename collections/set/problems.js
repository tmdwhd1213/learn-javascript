const dogs = [
  {
    name: "a",
    color: "black",
    size: "mid",
  },
  {
    name: "b",
    color: "black",
    size: "large",
  },
  {
    name: "c",
    color: "white",
    size: "small",
  },
];

// 배열 메서드로 필터링
function getColors(dogs) {
  return dogs.map((dog) => dog.color);
}
console.log(getColors(dogs)); // ['black', 'black', 'white']

// 중복 제거
function getUniqueColor(attributes) {
  const unique = [];
  for (const attribute of attributes) {
    if (!unique.includes(attribute)) {
      unique.push(attribute);
    }
  }
  return unique;
}
const colors = getColors(dogs);
console.log(getUniqueColor(colors)); // ['black', 'white']

// Set 이용하기
const uniqueColors = new Set(colors);
console.log(uniqueColors); // Set {size: 2, black, white }

// 우리가 원하는건 Set이 아닌 Unique한 배열.
const getUniqueColorsWithSet = (attributes) => [...new Set(attributes)];
console.log(getUniqueColorsWithSet(colors));

// 위와 같은 함수를 짜면 배열을 다 돌고 그 뒤에 고유값만 추출함. -> 비효율적임.
// 아래와 같이 돌면서 추가하는 로직을 한번에 짤 수 있음.
function getUniqueColorWithSet2(dogs) {
  const unique = new Set();
  for (const dog of dogs) {
    unique.add(dog.color);
  }
  return [...unique];
}

console.log(getUniqueColorWithSet2(dogs));

const getUniqueColorsWithReduce = [
  ...dogs.reduce((colors, { color }) => colors.add(color), new Set()),
];
console.log(getUniqueColorsWithReduce);

console.log(!undefined);
