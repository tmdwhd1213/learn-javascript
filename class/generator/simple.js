// 제너레이터를 가장 좋게 사용하는 것: 객체를 이터러블로 변환시키는 것!!
// 다음 단계 전까지 기본적으로 일시 정지하는 중단점이 있는 함수
// 함수 몸체 안에서는 yield 키워드를 이용해 정보를 반환합니다.
// 함수를 실행할 때는 next() 메서드를 이용해서 함수가 내보낸 정보를 가져올 수 있다.
// next() -> value, done이 있는 객체를 반환
// yield로 선언한 항목이 value. done은 남은 항목이 없다는 것을 알려줌.

function* getCairo() {
  yield "궁전 샛길";
  yield "욕망의 궁전";
  yield "설탕 거리";
}
const trilogy = getCairo();
console.log(trilogy.next()); // {value: '궁전 샛길', done: false}
console.log(trilogy.next()); // {value: '욕망의 궁전', done: false}
console.log(trilogy.next()); // {value: '설탕 거리', done: false}
console.log(trilogy.next()); // {value: undefined, done: true}

// 정보가 매우 많고 일부만 접근해야 할 때 유용하다.

// 제너레이터는 함수를 이터러블로 바꿔준다.
const generatorArray = [...getCairo()];
console.log(generatorArray); // ['궁전 샛길', '욕망의 궁전', '설탕 거리']

const readingList = {
  visit: true,
  beach: false,
};

for (const book of getCairo()) {
  readingList[book] = false;
}

console.log(readingList); // {visit: true, beach: false, 궁전 샛길: false, 욕망의 궁전: false, 설탕 거리: false}

// 클래스에 제너레이터를 어떻게 쓰는가? -> 복잡한 데이터 구조를 다루는 클래스를 만들 때, 배열을 다루는 것처럼 데이터에 접근할 수 있게 설계 가능.
// 트리 구조는 검색하고 조회하는데 이점이 있지만, 정보를 평면화하기 어렵다.
// 이를 위해선 빈 배열을 생성하고 가족 구성원을 담아 반환하는 메서드를 만들어야 함.
export default class FamilyTree {
  constructor() {
    this.family = {
      name: "Doris",
      child: {
        name: "Martha",
        child: {
          name: "Dyan",
          child: {
            name: "Bea",
          },
        },
      },
    };
  }
  getMembers() {
    const family = [];
    let node = this.family;
    while (node) {
      family.push(node.name);
      node = node.child;
    }
    return family;
  }

  *[Symbol.iterator]() {
    let node = this.family;
    while (node) {
      yield node.name; // 이 값이 담김.
      node = node.child;
    }
  }
}

const family = new FamilyTree();
console.log(family.getMembers()); // ['Doris', 'Martha', 'Dyan', 'Bea']
console.log([...family]); // ['Doris', 'Martha', 'Dyan', 'Bea']

// 메서드를 제너레이터로 바꾸는 법 -> getMembers() 대신 *[Symbol.iterator]()
// *은 제너레이터를 생성한다는 것을 의미.
// Symbol.iterator는 클래스의 이터러블에 제너레이터를 연결.

// 제너레이터를 사용하면서 늘어나는 복잡도를 감수할 가치가 있을까? ->
// 다른 개발자들이 클래스의 세부 구현 내용을 알 필요가 없음.
// 그저 이터러블을 가진 클래스일 뿐.
