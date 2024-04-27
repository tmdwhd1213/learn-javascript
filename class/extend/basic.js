// 초기 JS 클래스 상속 구현하는 것은 꽤나 복잡한 일이었음.
// 1. 객체의 속성을 순회 -> 개별 속성이 객체 프로토타입이 아닌 해당 객체에만 존재하는 속성인지 확인.
// -> 메서드를 추가하기 전에 부모로부터 새로운 객체에 프로토타입을 복사해야함.

// 클래스를 쓰면 상속이 간단해짐. extend 키워드만 쓰면 됨.
// package.json에 'type': 'module'하면 import, export 쓸 수 있음.
import Coupon from "../construtor/problem.js";

export class FlashCoupon extends Coupon {
  constructor(price, expiration) {
    // 부모의 생성자에 접근하려면 super()메서드를 호출해야함.
    // super()로 price는 부모 값 그대로 쓰고, expiration의 기본값을 변경할 것임.
    super(price);
    this.expiration = expiration || "2시간";
  }

  // Flash니까 깜짝 쿠폰이므로, 메세지를 다르게 설정할 필요가 있음.
  getExpirationMessage() {
    return `이 쿠폰은 깜짝 쿠폰이며 ${this.expiration} 후에 만료됩니다.`;
  }

  isRewardsEligible(user) {
    return super.isRewardsEligible(user) && this.price > 20;
  }

  getRewards(user) {
    const DISCOUNT_RATE = 0.2;
    if (this.isRewardsEligible(user)) {
      this.price = this.price - this.price * DISCOUNT_RATE;
      // return this.getPriceText();
    }
  }
}

const flash = new FlashCoupon(30);
console.log(flash.price);
console.log(flash.getPriceText());

const user = {
  active: true,
  rewardsEligible: true,
};
// console.log(flash.getRewards(user));
flash.getRewards(user);
console.log(flash.getPriceText());
// 메서드를 호출할 때 현재 클래스(FlashCoupon)를 확인.
// 만약 없다면 부모 클래스나 프로토타입을 확인 후 부모의 메서드로 대체.
console.log(flash.getExpirationMessage());
