const arr = [];
console.time("Array Performance");
for (let i = 0; i < 1000000; i++) {
  arr[i] = i;
}
console.timeEnd("Array Performance");

const obj = {};
console.time("Object Performance");
for (let i = 0; i < 1000000; i++) {
  obj[i] = i;
}
console.timeEnd("Object Performance");

// 약 2배 차이

const ar = Array.from({ length: 100 }).fill(1);
console.log(ar);

class Stack {
  #array; // private

  constructor(array = []) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${array} is not an array.`);
    }
    this.#array = array;
  }

  push(value) {
    return this.#array.push(value);
  }

  pop() {
    return this.#array.pop();
  }

  entries() {
    return [...this.#array];
  }
}

const stack = new Stack([1, 2]);
console.log(stack.entries()); // [1,2]

stack.push(3);
console.log(stack.entries()); // [1,2,3]

stack.pop();
console.log(stack.entries()); // [1,2]

const arra = [1, 2];
const newArra = [3, ...arra, 4];
console.log(newArra);

class Queue {
  #array; // private

  constructor(array = []) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${array} is not an array.`);
    }
    this.#array = array;
  }

  // 큐의 가장 마지막에 데이터를 밀어 넣는다.
  enqueue(value) {
    return this.#array.push(value);
  }

  //큐의 가장 처음 데이터를 꺼낸다.
  dequeue() {
    return this.#array.shift();
  }

  entries() {
    return [...this.#array];
  }
}

const queue = new Queue([1, 2]);
console.log(queue.entries()); // [1,2]

queue.enqueue(3);
console.log(queue.entries()); // [1,2,3]

queue.dequeue();
console.log(queue.entries()); // [2,3]

// sort 메서드
// 비교 함수의 반환값이 0보다 작으면 비교 함수의 첫 번째 인수를 우선하여 정렬, 0이면 정렬하지 않음 0보다 크면 두 번째 인수를 우선하여 정렬
const points = [40, 100, 5, 1, 2, 25, 10];
// 비교 함수의 반환값이 0보다 작으면 a를 우선하여 정렬

// 사용자 정의 비교 함수
const sortWithLogging = (arr) => {
  arr.sort((a, b) => {
    console.log(`Comparing ${a} and ${b}`);
    const result = a - b;
    console.log(`Result of comparison: ${result}`);
    return result;
    // 중간에서부터 찾네 a를 제외한 배열 중 b를 중간에 있는 값으로 설정, 그리고 a가 b보다 크면 오른쪽에 있는 친구랑 비교
    // 1. [40, 100]
    // 2. [40, 5, 100]
    // 3. [5, 40, 100]
    // 4. [5, 40, 100, 1] -> [5, 40, 1, 100] -> [5, 1, 40, 100] -> [1, 5, 40, 100]
    // 5. [1, 5, 40, 100, 2] -> [1, 5, 40, 2, 100] -> [1, 5, 2, 40, 100] -> [1, 2, 5, 40, 100] -> [1, 2, 5, 40 ,100]
    // 6. [1, 2, 5, 40, 100, 25] -> [1, 2, 5, 25, 40, 100]
  });
};

sortWithLogging(points);

console.log("Sorted array:", points);

// Array.prototype.reduce()
let values = [1, 2, 3, 4, 5, 6];
const average = values.reduce((acc, cur, idx, { length }) => {
  return idx === length - 1 ? (acc + cur) / length : acc + cur;
}, 0);

console.log(average);

// 요소의 중복횟수 구하기
const fruits = ["바나나", "사과", "오렌지", "오렌지", "사과"];
const count = fruits.reduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});

console.log(count);

// filter() 메서드 구현
values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];
const result = values.reduce((acc, cur, i, arr) => {
  if (!acc.includes(cur)) acc.push(cur);
  return acc;
}, []);
console.log(result);
const result2 = [...new Set(values)];
console.log(result2);

// reduce() 메서드 초기값의 중요성
const products = [
  { id: 1, price: 100 },
  { id: 2, price: 200 },
  { id: 3, price: 300 },
];
const priceSum = products.reduce((acc, cur) => acc + cur.price, 0);
console.log(priceSum); // 초기값 전달 안하고 acc.price+cur.price하면
// 1순환에서는 제대로 acc는 100 + 200 = 300이 되지만,
// 2순환에서 acc = 300이므로 acc.price는 undefined이다. 따라서 NaN을 리턴함.
// 따라서 원하는 형태의 값이 있다면 타입에 맞게 초기값을 설정해야함.
