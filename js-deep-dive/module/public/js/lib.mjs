const pi = Math.PI;

function sqaure(x) {
  return x ** x;
}

class Person {
  constructor(name) {
    this.name = name;
  }
}

// 변수, 함수, 클래스를 하나의 객체로 구성하여 공개
export { pi, sqaure, Person };

export default (x) => x ** x;
