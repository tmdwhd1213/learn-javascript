// class의 constructor와 상당히 유사하다.
// ES6 이전의 생성자 함수 사용법.
function Coupon(price, expiration) {
  this.price = price;
  this.expiration = expiration || "2주";
}

const coupon = new Coupon(5, "2개월");

console.log(coupon.price); // 5

// class와 다른 점. 메서드가 없다.
// 메서드를 추가할 때 prototype을 사용함.
// prototype은 생성자 함수의 기반이 되는 객체. -> 모든 객체 인스턴스는 프로토타입에서 속성을 가져옴.
// 새로운 인스턴스도 프로토타입에 있는 메서드를 사용할 수 있음.

Coupon.prototype.getExpirationMessage = function () {
  return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
};

console.log(coupon.getExpirationMessage()); // 이 쿠폰은 2개월 후에 만료됩니다.

// class를 써도 생성자 함수를 써서 prototype을 쓰는 것과 동일하다.
// 단지 겉으로만 다르게 보일 뿐 내부적으로는 동일하다.

// 두 가지 방식이 동일하므로 프로토타입을 이용한 레거시코드에 새로운 코드를 추가할 때 클래스를 사용할 수 있다.

class FlashCoupon extends Coupon {
  constructor(price, expiration) {
    super(price);
    this.expiration = expiration || "2시간";
  }

  getExpirationMessage() {
    return `이 쿠폰은 깜짝 쿠폰이며, ${this.expiration} 후에 만료됩니다.`;
  }
}

const flash = new FlashCoupon(30);
console.log(flash.getExpirationMessage());
