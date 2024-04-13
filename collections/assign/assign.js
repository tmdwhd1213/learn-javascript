function log(value) {
  console.log(JSON.stringify(value));
}

const defaultEmployee = {
  name: {
    first: "",
    last: "",
  },
  years: 0,
};

// const employee = Object.assign({}, defaultEmployee);
// ES6 스펙에서 Object.assign() 메서드로 중첩된 객체를 해결하는 법
const employee2 = Object.assign({}, defaultEmployee, {
  name: Object.assign({}, defaultEmployee.name),
});
// Obejct.assign()메서드 첫 번째 인자에 빈 객체를 넣는 이유 -> 이 빈 객체에 두번째 부터 전달한 값이 전달됨. (빈 객체에 채워지는 느낌. 얕은 복사)
employee2.name.first = "OH";

const employee = {
  ...defaultEmployee,
  name: { ...defaultEmployee.name, first: "John" },
};

// employee.name.first = "John";
log(employee2);
log(defaultEmployee);
log(employee);

// lodash라이브러리 -> clonedeep() 메서드 활용
