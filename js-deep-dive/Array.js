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
