import * as utils from "../single/util.js";

export function greet(name) {
  return `Hello, ${utils.capitalize(name)}!`;
}

console.log(greet("ashley"));
