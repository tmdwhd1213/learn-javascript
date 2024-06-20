// 자바스크립트를 클라이언트 사이드, 즉 브라우저 환경에 국한하지 않고 범용적으로 사용하려는
// 움직임 생김 -> CommonJS, AMD(Asynchronous Module Definition)

// 자바스크립트 런타임 환경인 Node.js는 모듈 시스템의 사실상 표준인 CommonJS를 채택했다.
// 100% 동일하진 않지만, 독자적인 진화를 거쳐 ECMAScript 표준 사양은 아니지만
// 모듈 시스템을 지원한다. 따라서 Node.js환경에서는 파일별로 독립적인 파일 스코프를 갖는다.

// ES6 모듈(ESM)
// ES6스펙에서 클라이언트 사이드 js에서도 동작하는 모듈 기능을 추가했다.
// IE를 제외한 대부분의 브라우저에서 ES6모듈을 사용할 수 있다.
// ES6모듈(ESM)의 사용법은 간단하다. script 태그에 type='module' 어트리뷰트를 추가하면
// 로드된 js 파일은 모듈로서 동작한다.
// 일반적인 js 파일이 아닌 ESM임을 명확히 하기위해 .mjs 확장자명을 사용할 것을 권장한다.
// 기본적으로 strict mode가 적용됨.
// ESM은 독자적인 모듈 스코프를 갖는다. 일반적인 js파일은 script 태그로 분리해서 로드해도
// 독자적인 모듈 스코프를 갖지 않음.(전역변수, 함수선언을 공유함)

// 외부에 공개하여 다른 모듈들이 재사용할 수 있게 하려면 export 키워드를 사용한다.

// ESM의 경우 파일 확장자를 생략할 수 없다.
// index.mjs의 경우 애플리케이션의 진입점(entry point)이므로 반드시 script태그로 로드.
// but, lib.mjs의 경우 import 문에 의해 로드되는 의존성(dependency)다.
// 따라서 lib.mjs는 script 태그로 로드하지 않아도 됨. !!!
import test, { pi } from "./lib.mjs";
console.log(pi); // 3.141592...

// 선언문 앞에 매번 export 키워드를 붙이는 것이 번거롭다면 하나의 객체로 묶어서 export

// 모듈에서 하나의 값만 export한다면 default 키워드를 사용할 수 있다.
// default 키워드를 사용하는 경우 기본적으로 이름 없이 하나의 값을 export한다.
// default 키워드를 사용하는 경우 var, let, const 키워드는 사용할 수 없다.
console.log(test(3)); // default는 {}없이 임의의 이름으로 import
