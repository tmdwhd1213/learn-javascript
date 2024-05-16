// 생성자 함수
function Circle(radius) {
  this.radius = radius;

  // 메모리 낭비
  // this.getArea = function () {
  //   return Math.PI * this.radius ** 2;
  // };
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
// 공유해서 사용할 수 있도록 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * this.radius ** 2;
};

const cir1 = new Circle(1);
const cir2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// 이런 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 쓰는 것이 바람직하다.
console.log(cir1.getArea()); // 3.141592653589793
console.log(cir2.getArea()); // 12.56637...
// 이 위의 방식으로는 메모리 낭비

// 프로토타입을 통해 static 메서드를 구현 (상속)
console.log(cir1.getArea === cir2.getArea); // true -> 같은 것을 공유해 쓴다는 증거

const obj = {};
const parent = { x: 1 };

// getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
// obj.__proto__;
// setter 함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); // 1
