// 객체에서 setInvalidMessage() 메서드가 호출될 때 함수에서 this 바인딩을 생성하면서 해당 함수가 담긴 객체도 문맥에 포함시키기 때문.
const validator = {
  message: "는 유효하지 않습니다.",
  setInvalidMessasge(field) {
    return `${field}${this.message}`;
    // this.message는 validator.message를 가리킴.
  },
};

console.log(validator.setInvalidMessasge("도시")); // 도시는 유효하지 않습니다.

// 객체에서 this를 다룰 땐 ㄱㅊ, but 객체에 담긴 함수를 다른 함수의 콜백 함수로 사용할 때 주의가 필요

const validator2 = {
  message: "는 유효하지 않습니다.",
  setInvalidMessasge(...fields) {
    return fields.map(function (field) {
      console.log(this); // global -> map()메서드의 문맥에서 호출했으므로 this 바인딩이 전역 객체
      return `${field}${this.message}`;
    });
  },
};

console.log(validator2.setInvalidMessasge(["도시", "대회"]));

// 화살표함수는 this 바인딩을 새로 만들지 않는다.
// map() 메서드를 써도 map의 상위인 전역 객체가 아니고 화살표함수를 쓴 상위 스코프를 가리킴.
const validator3 = {
  message: "는 유효하지 않습니다.",
  setInvalidMessasge(...fields) {
    return fields.map((field) => {
      console.log(this); // global -> map()메서드의 문맥에서 호출했으므로 this 바인딩이 전역 객체
      return `${field}${this.message}`;
    });
  },
};

console.log(validator3.setInvalidMessasge("도시", "대회"));

// 현재 객체에 대해 새로운 this 문맥 바인딩을 만들지 않아서 전역 객체에 바인딩된 것.
const validator4 = {
  message: "는 유효하지 x",
  setInvalidMessasge: (field) => `${field}${this.message}`,
};

console.log(validator4.setInvalidMessasge("도시")); // 도시undefined

// 정리: 화살표 함수는 이미 문맥이 있고 다른 함수 내부에서 이 함수를 사용하려고 할 때 유용함.
