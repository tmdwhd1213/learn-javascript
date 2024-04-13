// 데이터 변경이 잦은 KEY-VALUE 컬렉션은 맵 객체 이용!
// MDN MAP 컬렉션이 일반 객체보다 나은 상황 정리 https://mzl.la/2PSofld

// dogs의 데이터 컬렉션은 배열.
const dogs = [
  {
    name: "max",
    size: "small",
    species: "a",
    color: "black",
  },
  {
    name: "dony",
    size: "big",
    species: "b",
    color: "black",
  },
  {
    name: "shod",
    size: "mid",
    species: "c",
    color: "brown",
  },
];

// 필터링 조건 목록을 담은 키(색상), 값(검정색)을 가진 컬렉션. Map 이전에 일반 객체로 해보자.
let filters = {};

function addFilters(filters, key, value) {
  filters[key] = value;
}

function deleteFilters(filters, key) {
  delete filters[key];
}

function clearFilters(filters) {
  filters = {};
  return filters;
}

// 키-값 설정, 삭제, 클리어를 구현하기 위해 3가지 페러다임을 사용함. delete 키워드, 빈 객체 리터럴 (new Object())

// Map의 장점 : 예측 가능한 이름의 메서드, 이터러블 내장, 인터페이스 명확, Key탐색: 시간복잡도 O(logN) -> 일반 객체: O(N)
let filtersMap = new Map();
// 데이터 추가 .set() 메서드
filtersMap.set("species", "d");
console.log(filtersMap.get("species"));

// 메서드 체이닝으로 여러가지 추가하기.
filtersMap.set("color", "yellow").set("size", "x-large").set("name", "foo");
console.log(filtersMap);

// 처음 선언할 때 배열을 통해 설정하기.
let filtersMap2 = new Map([
  ["name", "bee"],
  ["size", "x-small"],
  ["color", "white"],
]);
console.log(filtersMap2);

// 삭제 : delete() 메서드
filtersMap.delete("color");
console.log(filtersMap.get("color")); // undefined

// Map: 메서드를 이용한 페러다임만 사용. 추가, 삭제, 클리어.
const petFilters = new Map();
const addFilt = (filters, key, value) => filters.set(key, value);
const deleteFilt = (filters, key) => filters.delete(key);
const clearFilt = (filters) => filters.clear(); // 새로운 인스턴스를 생성할 필요가 없다.

// 일반 객체 Key는 Symbol, String만 쓸 수 있다.
const errors = {
  200: "OK",
  404: "Not found",
  203: "redirect",
};

console.log(Object.keys(errors)); // string[] -> Number형을 넣어도 String형으로 형변환.
// 키로 값을 접근할 때 string이 아니면 .으로 접근할 수 없다. errors.100(x), 꼼수로 배열 표기법으로 errors["100"] 접근 가능.
dogs.forEach((dog) => {
  console.log(getAppliedFilters(dog));
});

function getAppliedFilters(filters) {
  // 객체는 순서를 보장하지 않음. -> 객체는 정렬할 수 없다! 중요
  const keys = Object.keys(filters);
  // keys() 메서드로 배열로 변환 후 이걸 sort메서드로 sorting 해야함.
  keys.sort();
  const applied = [];
  for (const key of keys) {
    applied.push(`${key}: ${filters[key]}`);
  }
  return `선택한 조건은 ${applied.join(", ")}입니다.`;
}

// Map은 위와 같은 문제가 없다.
let errorsMap = new Map([
  [200, "ok"],
  [404, "Not found"],
  [203, "redirect"],
]);
console.log(errorsMap.get(200)); // ok
console.log(errorsMap.keys()); // MapIterator { 200, 404, 203 } -> 순회 가능

function checkFilters(filters) {
  for (const entry of filters) {
    console.log(entry);
  }
}

// Map도 일반 객체처럼 sort메서드가 없다.
// 펼침 연산자로 배열에 담고 sorting해야함.
function getAppliedFiltersMap(filters) {
  // const sortedFilter = [...filters].sort(); // [[200,"ok"],[203,"redirect"],[404,"Not found"]]
  // log(sortedFilter);
  const applied = [...filters]
    .sort((a, b) => (a[0] > b[0] ? 1 : -1))
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
  return `선택한 조건은 ${applied}입니다.`;
}
console.log(getAppliedFiltersMap(errorsMap));

checkFilters(errorsMap); // 배열로 변환: [200, 'ok'], [404, 'Not found]...

console.log(errorsMap.entries()); // MapIterator {200 => ok, 404 => Not found, 203 => redirect}

function log(val) {
  console.log(JSON.stringify(val));
}
