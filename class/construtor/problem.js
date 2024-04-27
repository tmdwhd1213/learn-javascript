export default class Coupon {
  // 생성자 함수 선언 -> 여러 속성을 정의할 수 있음.
  // 생성자 메서드 생성. (construtor())
  // 생성자의 역할 중 하나는 this 문맥을 생성하는 것.
  constructor(price, expiration) {
    // price와 expiration은 속성
    this.price = price;
    this.expiration = expiration || "2주";
  }

  getPriceText() {
    return `$ ${this.price}`;
  }

  getExpirationMessage() {
    return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
  }

  // 유저가 자격이 있는지 && 최근 접속한 사용자인지
  isRewardsEligible(user) {
    return user.rewardsEligible && user.active;
  }

  getRewards(user) {
    const DISCOUNT_RATE = 0.1;
    if (this.isRewardsEligible(user)) {
      this.price = this.price - this.price * DISCOUNT_RATE;
    }
  }
}

// 새로운 인스턴스를 생성할 때 new 키워드
const coupon = new Coupon(5);

console.log(coupon.getPriceText()); // $5
console.log(coupon.getExpirationMessage()); // 이 쿠폰은 2주 후에 만료
