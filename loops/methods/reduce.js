// reduce()의 기본 동작 관찰. -> saying 배열을 순회하면서 collectedValues에 쌓고, item을 추가하는 배열을 반환함.
const callback = function (collectedValues, item) {
  return [...collectedValues, item];
};

const saying = ["veni", "vedi", "veci"];
const initialValue = [];
const copy = saying.reduce(callback, initialValue);
console.log(copy);

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

// reduce()의 메서드는 맨 뒷 부분부터 봐야 앎. 어떤 데이터 타입이던 될 수 있어서.
// 아래의 경우에는 배열[]로 초기화하고 있다.
// 첫번째 파라미터는 캐리(carry)라고 불리는데 다른 개발자가 파악할 수 있는 네이밍을 하는 것이 좋음.
// 누적값을 반환하지 않으면 완전히 사라짐. -> return prev를 해주자.
const colors = dogs.reduce((colors, dog) => {
  // 중복 제거
  if (colors.includes(dog.color)) return colors;
  return [...colors, dog.color];
}, []);

console.log(colors);

const colorsMap = dogs.map((dog) => dog.color);
console.log(colorsMap);
const colorsReduce = dogs.reduce((colors, dog) => {
  return [...colors, dog.color];
}, []);
console.log(colorsReduce);

const filters = dogs.reduce(
  (filter, item) => {
    filter.breed.add(item.name);
    filter.color.add(item.color);
    filter.size.add(item.size);
    return filter;
  },
  {
    breed: new Set(),
    size: new Set(),
    color: new Set(),
  }
);

console.log(filters);

const developers = [
  {
    name: "Jeff",
    lang: "php",
  },
  {
    name: "Ashley",
    lang: "python",
  },
  {
    name: "Sara",
    lang: "python",
  },
  {
    name: "Joe",
    lang: "javascript",
  },
];

const aggregated = developers.reduce((specialities, developer) => {
  const count = specialities[developer.lang] || 0;
  return {
    ...specialities,
    [developer.lang]: count + 1,
  };
}, {});

console.log(aggregated);
