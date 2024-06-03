// Set의 특징
// 중복값 X, Element 순서에 의미 X, 인덱스로 Element 접근 X

// Set 객체는 Set 생성자 함수로 생성한다.
var set = new Set();
console.log(set); // Set(0) {size: 0}

// Set 생성자 함수는 이터러블을 인수로 전달받아 Set객체를 생성한다.
var set = new Set([1, 2, 2, 3]);
console.log(set); // Set(3) {size: 3, 1,2,3}
set = new Set("hello");
console.log(set); // Set(4) {size:4, h, e, l, o}

// 배열의 중복 요소 제거
var uniq = (array = []) => array.filter((v, i, self) => self.indexOf(v) === i);
console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [2,1,3,4]

// Set을 이용한 중복 요소 제거
var uniq2 = (array = []) => [...new Set(array)];
console.log(uniq2([2, 1, 2, 3, 4, 3, 4])); //

var { size } = new Set([1, 2, 3, 3]); // Set.prototype.size로 요소 개수를 확인
console.log(size); // 3
// size 프로퍼티는 setter가 없고 getter만 있는 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Set.prototype, "size"));
// {get: ƒ, set: undefined, enumerable: false, configurable: true}

var set = new Set();
set.add(1);
console.log(set); // {size:1, 1}
// Set.prototype.add()는 새로운 Set 객체를 반환함. 따라서 메서드 체이닝 가능
set.add(2).add(3);
console.log(set); // {size:3, 1,2,3} (중복된 요소를 추가하면 무시됨)

// set 객체는 NaN은 같은 것으로 보고 중복으로 저장이 안된다.
// 객체와 배열과 마찬가지로 모든 값을 요소로 저장할 수 있다.
var set = new Set();
set
  .add(1)
  .add("a")
  .add(true)
  .add(undefined)
  .add(null)
  .add({})
  .add([])
  .add(() => {})
  .add(Symbol())
  .add(NaN);
console.log(set);
/*
Set {size: 10, 1, "a", true, undefined, null, Object, Array(0), () => {}, Symbol(), NaN }
*/

// 존재 확인 Set.prototype.has()
console.log(set.has(undefined)); // true

// 요소 삭제 Set.prototype.delete()
set.delete(1);
console.log(set); // {size: 9, a, true, ...}
// 없는 요소를 삭제하면 무시됨.
set.delete(1);
console.log(set); // {size: 9, a, true, ...}

// Set.prototype.delete()는 성공 여부를 나타내는 불리언 타입을 반환함. 따라서 메서드 체이닝 X
console.log(set.delete(1)); // false
// set.delete(1).delete(1);  // TypeError: set.delete(...).delete is not a function

// 일괄 삭제(초기화): Set.prototype.clear() -> 언제나 undefined를 반환
console.log(set.clear()); // undefined
console.log(set); // {size: 0}

// 요소 순회 Set.prototype.forEach((v1, v2, self)) -> Array의 forEach와 인터페이스를 동일하게 하기 위해 v2를 넣었지만
// v1 === v2이다. Set에는 인덱스가 따로없어(순서가 의미가 없기때문) 이렇게 만들었다.
var set = new Set([1, 2, 3]);
set.forEach((v1, v2, self) => console.log(v1, v2, self));
/*
1 1 Set(3) {size: 3, 1, 2, 3}
2 2 Set(3) {size: 3, 1, 2, 3}
3 3 Set(3) {size: 3, 1, 2, 3}
*/

// 집합 연산
// 1. 교집합 A n B는 집합 A와 B의 공통 요소
Set.prototype.intersection = function (set) {
  const result = new Set();

  for (const value of set) {
    if (this.has(value)) result.add(value);
  }

  return result;
};

Set.prototype.intersection1 = function (set) {
  return new Set([...this].filter((v) => set.has(v)));
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.intersection(setB)); // {size:2, 2, 4}
console.log(setB.intersection(setB)); // {size:2, 2, 4}
console.log(setA.intersection1(setB)); // {size:2, 2, 4}
console.log(setB.intersection1(setB)); //{size:2, 2, 4}

// 2. 합집합: A U B,  A와 B의 중복없는 모든 요소
Set.prototype.union = function (set) {
  const result = new Set(this);

  for (const value of set) {
    result.add(value);
  }
  return result;
};
console.log(setA.union(setB)); // {size: 4, 1,2,3,4}

Set.prototype.union1 = function (set) {
  return new Set([...this, ...set]);
};
console.log(setA.union1(setB)); // {size:4, 1,2,3,4}

// 차집합: A-B, 집합 A에는 존재하지만 집합 B에 존재하지 않는 요소로 구성 (예상: {size:2, 1, 3})
Set.prototype.difference = function (set) {
  const result = new Set(this);
  for (const value of set) {
    if (result.has(value)) result.delete(value);
  }

  return result;
};

Set.prototype.differ = function (set) {
  return new Set([...this].filter((v) => !set.has(v)));
};

console.log(setA.difference(setB)); // {size:2, 1, 3}
console.log(setA.differ(setB)); // {size:2, 1, 3}

Set.prototype.superSet = function (set) {
  for (const value of set) {
    if (!this.has(value)) return false;
  }
  return true;
};

Set.prototype.superSet1 = function (set) {
  return [...set].every((v) => this.has(v));
};

console.log(setA.superSet1(setB)); // true
console.log(setB.superSet1(setA)); // false

// Map 키와 값의 쌍으로 이루어진 컬렉션. 객체와 유사하다.
// 키로 사용가능한 값: 객체를 포함한 모든 값.
// 이터러블: O
// 요소 개수 확인 map.size
// 중복 X

var map1 = new Map([
  ["key1", "value1"],
  ["key2", "value2"],
  ["key1", "value3"],
]);
// 중복된 키는 Map 객체에 저장되지 않는다.
console.log(map1); // Map(2) {size: 2, key1 => value3, key2 => value2}

// Set과 마찬가지로 Map.prototype.size는 Setter가 없고 getter만 있는 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Map.prototype, "size"));
// {get: ƒ, set: undefined, enumerable: false, configurable: true}

// 요소 추가 Map.prototype.set()
map1.set("key1", "업데이트");
console.log(map1); // Map(2) {size: 2, key1 => 업데이트, key2 => value2}

// Map의 키로 NaN === NaN이고, +0 === -0 이다. 따라서 중복을 허용하지 않는다. (값은 최신 값으로 업데이트)
var map = new Map();
map.set(NaN, "v1").set(NaN, "v2");
console.log(map); // {size:1, NaN => v2}
map.set(+0, "v1").set(-0, "v2");
console.log(map); // {size:2, NaN => v2, 0 => v2}

// 객체는 문자열 OR 심벌 값만 키로 사용할 수 있다.
// 하지만 Map 객체는 키 타입에 제한이 없다. (두드러지는 차이점)
var obj = { name: "Lee" };
map.set(obj, "developer");
console.log(map); // Map(3) {size: 3, NaN => v2, 0 => v2, {name: 'Lee'} => developer}

// 요소 취득: Map.prototype.get() -> 있으면 키와 매핑된 값을 반환하고, 없으면 undefined 반환
console.log(map.get(obj)); // developer
console.log(map.get("즐")); // undefined

// 요소 존재 여부 확인 Map.prototype.has() -> 불리언 타입 반환
console.log(map.has(obj)); // true
console.log(map.has("즐")); // false

// 요소 삭제: Map.prototype.delete() -> 성공 여부를 나타내는 불리언 타입 반환 -> 메서드 체이닝 X
console.log(map.delete(0)); // true
console.log(map.delete("즐")); // false -> 없으니까

// 요소 일괄삭제 : Map.prototype.clear() -> 언제나 undefined 반환
console.log(map1.clear()); // undefined
console.log(map1); // Map(0) {size:0}

// 요소 순회: Map.prototype.forEach((value, key, self) => {});
map.forEach((val, key, self) => console.log(val, key, self));
// v2 NaN Map(2) {size: 2, NaN => v2, {name: 'Lee'} => developer}
// developer {name: 'Lee'} Map(2) {size: 2, NaN => v2, {name: 'Lee'} => developer}

// Map 객체는 이터러블이다.
console.log(Symbol.iterator in map); // true

// 배열 디스트럭처링 할당
var [a, b] = map;
console.log(a, b); // [NaN, 'v2'] (2) [{…}, 'developer']

// Map 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드를 제공함.
// Map.prototype.keys, values, entries

for (const [key, value] of map) {
  console.log(`key: ${key}`);
  console.log(`value: ${value}`);
}

for (const entries of map.entries()) {
  console.log(entries); // [NaN, 'v2']
}

// Map과 Set은 순서가 중요치 않지만, 이터러블 특성 상 순서대로 되게 유지한다.
