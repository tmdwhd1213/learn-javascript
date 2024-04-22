const name = {
  first: "Lemmy",
  last: "kilmister",
};

function getName({ first, last }) {
  return `${first} ${last}`;
}

console.log(getName(name));

// 화살표 함수로 return문 괄호, 함수 선언, 중괄호 등 불필요한 정보를 제거하자.
const getNameArrow = ({ first, last }) => `${first} ${last}`;

const comic = {
  first: "Peter",
  last: "Bagge",
  city: "Seattle",
  state: "Washington",
};

console.log(getNameArrow(comic)); // Peter Bagge

// 화살표함수에서 return문을 안 쓰고 객체를 반환하려면 소괄호로 감싸야한다.
// 소괄호를 사용하는 경우 여러줄에 걸쳐서 쓸 수 있다.
const getFullNameAndLocation = ({ first, last, city, state }) => ({
  fullName: `${first} ${last}`,
  location: `${city} ${state}`,
});

console.log(getFullNameAndLocation(comic)); // {fullName: 'Peter Bagge', location: 'Seattle Washington'}

// 화살표함수는 다른 함수를 반환하는 고차함수를 만드는 데 유용하다.
const discouter = (discout) => {
  return (price) => {
    return price * (1 - discout);
  };
};

const tenPercentOff = discouter(0.1);
console.log(tenPercentOff(100)); // 90

// 위의 함수를 단축시킬 수 있음.
const discounter = (discount) => (price) => price * (1 - discount);
const tenPercentOff2 = discounter(0.1);
console.log(tenPercentOff2(200)); // 180
