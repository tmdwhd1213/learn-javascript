// class Coupon {
//   constructor(price, expiration) {
//     this.price = price;
//     this.expiration = expiration || "2주";
//   }
//   getPriceText() {
//     return `$ ${this.price}`;
//   }
//   getExpirationMessage() {
//     return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
//   }
// }

// const coupon = new Coupon(5);
// coupon.price = "$10";
// console.log(coupon.getPriceText()); // '$ $10'

// 게터와 세터를 이용해서 로직을 추가하고 속성을 뒤로 숨기기.
// 함수를 속성처럼 보이게해서 복잡성을 숨기는 방법

export default class Coupon {
  constructor(price, expiration) {
    this._price = price;
    this.expiration = expiration || "2주";
  }
  // getter 만으로는 외부에서 값을 변경하는 것을 막을 수 없다.
  // setter 추가해야함.
  // setter는 인수를 하나만 받고 속성을 변경함. -> 인수를 전달할 때 소괄호()를 안 쓰고 = 을 이용해서 값을 할당하는 것처럼 함.
  // getter와 setter는 짝을 이루어야 함. (같은 이름을 써야 함.)
  // 클래스의 속성이 get set과 같은 이름이면 호출 스택이 무한히 쌓이게 됨. (X)
  // #이 나오기 이전에 _price와 같이 언더스코어가 변수명 앞에 있으면 건들지말라는 개발자의 규칙임.
  get priceText() {
    return `$${this._price}`;
  }
  get price() {
    return this._price;
  }
  set price(price) {
    const newPrice = price.toString().replace(/[^\d]/g, "");
    this._price = parseInt(newPrice, 10);
  }
  get expirationMessage() {
    return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
  }
}

const coupon = new Coupon(5);
coupon.price = `$10`;
// getter는 함수를 속성처럼 보이게하므로 함수 호출인 ()을 안 붙인다.
console.log(coupon.priceText); // '$10'

// getter와 setter는 디버깅하기 매우 어렵고 테스트하기도 어렵다.
// 주의해서 사용하고 충분한 테스트와 문서화를 통해 의도를 명확하게 전달해야함.
