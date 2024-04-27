const building = {
  hours: "8am - 8pm",
  address: "Jayhawk Blvd",
};

const manager = {
  name: "Augusto",
  phone: "555-555-5555",
};

const program = {
  name: "Presenting Research",
  room: "415",
  hours: "3-6",
};

const exhibit = {
  name: "Emerging Scholarship",
  contact: "Dyan",
};

function mergeProgramInformation(building, manager) {
  const { hours, address } = building;
  const { name, phone } = manager;
  const defaults = {
    hours,
    address,
    contact: name,
    phone,
  };

  return (program) => {
    return { ...defaults, ...program };
  };
}

// 고차함수로 나누는 이유: 반복되는 것을 단일책임 함수로 만들기 위해
// 결국 함수는 한가지 일만 하는 것이 이상적이며 테스트하기도 쉽고 가독성도 좋음.
console.log(mergeProgramInformation(building, manager)(program));

const birds = ["meadowlark", "robin", "roadrunner"];

// 두 개의 배열을 쌍으로 결합하는 것을 zip함수라고 부른다.
const zip =
  (...left) =>
  (...right) => {
    return left.map((item, i) => [item, right[i]]);
  };

console.log(JSON.stringify(zip("kansas", "wisconsin", "new mexico")(...birds)));

// 위의 merge함수를 일부 정보를 담고 있는 사전 제작 함수를 변수에 담아 생성.
const setStrongHallProgram = mergeProgramInformation(building, manager);
const programInfo = setStrongHallProgram(program);
const exhibitInfo = setStrongHallProgram(exhibit);
console.log(programInfo);
console.log(exhibitInfo);

// currying
const setStrongHallCurrying = (program) => {
  const defaults = {
    hours: "8am - 8pm",
    address: "Jayhawk Blvd",
    name: "Augusto",
    phone: "555-555-5555",
  };
  return { ...defaults, ...program };
};

// 고차 함수를 이용하면 매개변수를 별도로 분리할 수 있다.
// 분리하기 전에 함수에 필요한 인수의 수를 줄일 수 있도록 인수를 분리하는 것이 제일 중요하다.
// 커링 => 한 번에 인수를 하나만 받는 함수 (하나의 인수만 전달하는 메서드를 다룰 때 유용하다.)

const dogs = [
  {
    name: "max",
    weight: 10,
    speices: "boston",
    location: "wisconsin",
    color: "black",
  },
  {
    name: "dony",
    weight: 90,
    speices: "levrado",
    location: "cansas",
    color: "black",
  },
  {
    name: "shadow",
    weight: 40,
    speices: "levrado",
    location: "wisconsin",
    color: "brown",
  },
];

// 1. filter가 정확히 일치하는 ===을 사용할 때만 작동함.
// 무게가 20보다 작은 강아지만 구해보도록 하자.
function getDogNames(dogs, filter) {
  const [key, value] = filter;
  return dogs.filter((dog) => dog[key] === value).map((dog) => dog.name);
}

console.log(getDogNames(dogs, ["color", "black"]));

// 1. 해결
// 하지만 이 함수도 20을 하드코딩하고 있다.
function getDogNames2(dogs, filterFunc) {
  return dogs.filter(filterFunc).map((dog) => dog.name);
}

console.log(getDogNames2(dogs, (dog) => dog.weight < 20));

// 하드코딩 해결
const weightCheck = (weight) => (dog) => dog.weight < weight;

console.log(getDogNames2(dogs, weightCheck(50))); //['max', 'shadow']

// 커링을 이용해서 필드도 바꿔보자.
const identity = (field) => (value) => (dog) => dog[field] === value;
const colorCheck = identity("color");
const stateCheck = identity("location");

console.log(getDogNames2(dogs, colorCheck("brown"))); //['shadow']
console.log(getDogNames2(dogs, stateCheck("cansas"))); //['dony']

function allFilter(dogs, ...checks) {
  return dogs
    .filter((dog) => checks.every((check) => check(dog)))
    .map((dog) => dog["name"]);
}

console.log(allFilter(dogs, colorCheck("black"), stateCheck("cansas"))); // ['dony']

function anyFilters(dogs, ...checks) {
  return dogs
    .filter((dog) => checks.some((check) => check(dog)))
    .map((dog) => dog["name"]);
}

console.log(anyFilters(dogs, weightCheck(20), colorCheck("brown"))); // ['max', 'shadow']
