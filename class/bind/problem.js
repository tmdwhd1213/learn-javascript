class Validator {
  constructor() {
    this.message = "가 유효하지 않습니다.";
  }
  setInvalidMessage(field) {
    return `${field}${this.message}`;
  }
  setInvalidMessages(...fields) {
    return fields.map((field) => this.setInvalidMessage(field));
  }
}

const validator = new Validator();
console.log(validator.setInvalidMessages("도시"));

// 명시적 this 바인드
// 함수가 this를 사용할 때마다 우리가 연결한 객체로 연결될 것이다.
// 문맥이 런타임에 JS 엔진에 의해 설정되지 않도록 우리가 직접 문맥을 선언하기 때문이다.
function sayMessage() {
  return this.message;
}
const alert2 = {
  message: "위험해!",
};

const sayAlert = sayMessage.bind(alert2);
console.log(sayAlert());

class ValidatorWithBind {
  constructor() {
    this.message = "가 유효하지 않습니다.";
    this.setInvalidMessage = this.setInvalidMessage.bind(this);
  }
  setInvalidMessage(field) {
    return `${field}${this.message}`;
  }
  setInvalidMessages(...fields) {
    return fields.map(this.setInvalidMessage);
  }
}
const validatorWithBind = new ValidatorWithBind();
console.log(validatorWithBind.setInvalidMessages("도시"));

// ES2021 이후
// 생성자(constructor)없이 속성을 만들 수 있다.
class ValidatorES2021 {
  message = "가 유효하지 않습니다.";
  setMessage = (field) => `${field}${this.message}`;
  setInvalidMessages(...fields) {
    return fields.map(this.setMessage);
  }
}

const validatorES2021 = new ValidatorES2021();
console.log(validatorES2021.setInvalidMessages("바보"));

// 문맥 문제는 디테일에 너무 매달리지 않는 것이 좋다.
// this를 다루다가 예상치 못한 동작이나 오류에 직면하면 명시적으로 문맥을 연결할 수 있다는 점을 명심하자.
// 문제가 생기기 전에 걱정 ㄴㄴ
// 문맥 연결은 비용이 클 수 있으므로 특정한 문제를 풀어야 하는 경우에만 사용
