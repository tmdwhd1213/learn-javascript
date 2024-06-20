"use strict";

var _lib = require("./lib");
// npm scripts의 build는 src/js 폴더(타깃 폴더)에 있는 모든 js 파일들을
// 트랜스파일링한 후, 그 결과물을 dist/js 폴더에 저장한다.
// 사용한 옵션 (-w, -d)는 다음과 같다.

// -w: 타겟 폴더에 있는 모든 js파일들의 변경을 감지하여 자동으로 트랜스파일링한다(--watch)
// -d: 트랜스파일링된 결과물이 저장될 폴더를 지정한다.폴더가 없으면 자동 생성(--out-dir)

console.log(_lib.pi);
console.log((0, _lib.power)(_lib.pi, _lib.pi));
var f = new _lib.Foo();
console.log(f.foo());
console.log(f.bar());