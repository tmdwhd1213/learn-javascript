import lodash from "lodash";

// ES5
var x = 1,
  y = 2;
var obj = {
  x: x,
  y: y,
};
console.log(obj);

var str = "string";
// str[0] = "S"; // Uncaught TypeError TypeError: Cannot assign to read only property '0' of string 'string'
console.log(str);

const o = { x: { y: 1 } };

const c1 = o;
console.log(o === c1); // true

const c2 = { ...o };
console.log(o === c2); // false
console.log(o.x === c2.x); // true

// 깊은 복사
const { cloneDeep } = lodash;
const deepClone = cloneDeep(o);
console.log(o.x === deepClone.x); // false
