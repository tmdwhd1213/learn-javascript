function getIconPath(icon) {
  // Boolean이 아닌 falsy, truly 값이 반환된다.
  // ||는 둘 다 truly일 경우 앞 값을, &&는 뒷 값을.
  console.log("a" || "b"); // 'a'
  console.log("a" && "b"); // 'b'
  console.log(NaN || "b"); // 'b'
  console.log(NaN && "b"); // NaN
  console.log("a" || NaN); // 'a'
  console.log("a" && NaN); // NaN
  console.log("" || NaN); // NaN
  console.log("" && NaN); // ''
  // &&는 앞이 truly면 뒤로 패스하고, 앞이 falsy면 앞값을 반환
  // ||는 앞이 truly면 앞값을 반환하고, 앞이 falsy면 뒷값을 반환

  const path = icon.path || "uploads/default.png";
  return `https://assets.foo.com/${path}`;
}

const icon = {
  path: `acme/bar.png`,
};
console.log(getIconPath(icon)); // https://assets.foo.com/acme/bar.png
