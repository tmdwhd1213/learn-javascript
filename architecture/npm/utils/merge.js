// lodash는 npm i --save lodash
import lodash from "lodash";

export function mapToObject(map) {
  return lodash.fromPairs([...map]);
}

export function objectToMap(object) {
  const pairs = lodash.toPairs(object);
  return new Map(pairs);
}

const foo = new Map([
  ["name", "bee"],
  ["size", "x-small"],
  ["color", "white"],
]);

console.log(mapToObject(foo));
console.log(objectToMap(mapToObject(foo)));

// prettier는 실환경 코드에서는 테스트 실행기가 필요하지 않다. -> --save-dev
// prettier의 문서를 보면 prettier --tab-width=2 --write ./code/*.js 명령을 실행해 코드를 변환할 수 있다.
// but 지역 모듈로만 설치하면 터미널에서 바로 명령을 실행할 수 없다.
// npm i -g prettier로 전역 모듈로 설치하면 되지만 다른 개발자에게 알려야 한다.
