// npm scripts의 build는 src/js 폴더(타깃 폴더)에 있는 모든 js 파일들을
// 트랜스파일링한 후, 그 결과물을 dist/js 폴더에 저장한다.
// 사용한 옵션 (-w, -d)는 다음과 같다.

// -w: 타겟 폴더에 있는 모든 js파일들의 변경을 감지하여 자동으로 트랜스파일링한다(--watch)
// -d: 트랜스파일링된 결과물이 저장될 폴더를 지정한다.폴더가 없으면 자동 생성(--out-dir)

import "@babel/polyfill";
import { pi, power, Foo } from "./lib";

console.log(pi);
console.log(power(pi, pi));

const f = new Foo();
console.log(f.foo());
console.log(f.bar());

// 브라우저는 CommonJS 방식의 require 함수를 지원하지 않으므로 에러가 발생.
// 루트 디텍토리에 index.html를 추가하여 src='dist/js/main.js'를 해보자
// ReferenceError: exports is not defined
// ReferenceError: require is not defined

// Webpack을 통해 이러한 문제를 해결해보자!!
// Webpack은 의존 관계에 있는 JS, CSS, 이미지 등의 리소스들을 하나의 파일로 번들링하는
// 모듈 번들러이다.
// Webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요없다.
// 여러개의 JS파일을 하나로 번들링하므로 HTML파일에서 script 태그로 여러개의
// JS 파일을 로드해야 하는 번거로움도 사라진다.
// npm install --save-dev webpack webpack-cli

// babel-loader 설치
// Webpack이 모듈을 번들링할 때 Babel을 사용하여 ES6+/ES.Next 사양의 소스코드를
// ES5 사양의 소스코드로 트랜스파일링하도록 babel-loader를 설치함.
// npm install --save-dev babel-loader
// package.json의 scripts를 변경하여 Babel대신 webpack을 사용하도록
//  "build2": "webpack -w"으로 설정하자.

// webpack.config.js는 Webpack이 실행될 때 참조하는 설정 파일이다.
// npm run build2를 하고 index.html을 수정하자.
// bundle.js로

// babel-polyfill 설치
// Babel을 이용해도 브라우저가 지원하지 않는 코드가 남아있을 수 있다.
// 예를 들어 ES6에서 추가된 Promise, Object.assign, Arary.from 등은
// ES5 스팩으로 트랜스파일링해도 대체할 기능이 없기에 트랜스파일링 안됨!!

// 트랜스파일링 안되는지 직접 확인
// polyfill이 필요한 코드
console.log(
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 100);
  })
);

// polyfill이 필요한 코드
console.log(Object.assign({}, { x: 1 }, { y: 2 }));

// polyfill이 필요한 코드
console.log(Array.from([1, 2, 3], (v) => v + v));

// polyfill은 개발 환경뿐만 아니라 실제 운영 환경에서도 사용해야함.
// 따라서 개발용 의존성(devDependencies)로 설치하는 --save-dev 옵션 ㄴㄴ
// ES6의 import를 사용하는 경우 진입점의 선두에 먼저 폴리필을 로드하도록 함.

// Webpack을 사용하는 경우 위 방법 대신 webpack.config.js 파일의 entry 배열에 폴리필 추가
