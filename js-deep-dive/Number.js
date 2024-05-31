// 부동소수점을 표현하기 위해 가장 널리 쓰이는 표준인 IEEE 754는 2진법으로 변환했을 때
// 무한소수가 되어 미세한 오차가 발생할 수 밖에 없는 구조적 한계가 있다.
console.log(0.1 + 0.2); // 예측 0.3, 실제: 0.300000000000...4
console.log(0.1 + 0.2 === 0.3); // 예측 true, 실제: false
// Number.EPSILON은 1과 1보다 큰 수 중 가장 작은 수와의 차이와 같다. -> 1.000000...xx - 1 === Number.EPSILON
function isEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}
console.log(isEqual(0.1 + 0.2, 0.3)); // true

// Number.isFinite(타입 변환 X) -> window.isFinite(암묵적 타입 변환)랑 다름
console.log(Number.isFinite(null)); // false
console.log(isFinite(null)); // true -> null이 0으로 암묵적 타입 변환됨.

// Number.isNaN(타입 변환 x) -> window.isNaN(암묵적 타입 변환)이랑 다름
console.log(Number.isNaN(undefined)); // false -> undefined는 NaN 그 자체는 아니다.
console.log(isNaN(undefined)); // true -> undefined가 NaN으로 암묵적 타입 변환이 거쳐짐.

// 확실히하고 싶다면 전역객체 빌트인 메서드보단 Number메서드를 사용하자

// Date
const today = new Date();
console.log(today);
console.log(today.getMonth() + 1); // 5 -> 0~11까지 표현하므로 +1해줘야함.

// Date.prototype.getDay() -> 요일 0(일요일) ~ 6(토요일)

// Date.prototype.toLocaleString()
console.log(today.toLocaleDateString()); // 2024. 5. 31.
console.log(today.toLocaleString()); // 2024. 5. 31. 오후 2:58:29
console.log(today.toLocaleString("ko-KR")); // 2024. 5. 31. 오후 2:59:08
console.log(today.toLocaleString("ja-JP")); // 2024/5/31 14:59:43

(function printNow() {
  const today = new Date();

  const dayNames = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const day = dayNames[today.getDay()];
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  const ampm = hour >= 12 ? "PM" : "AM";

  // 12시간제로 변경
  hour %= 12;
  hour = hour || 12; // hour가 0이면 12로 할당

  // 1의 자리 수인 분,초를 2자리로 변경
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;

  const now = `${year}년 ${month}월 ${date}일 ${day} ${hour}:${minute}:${second} ${ampm}`;

  console.log(now);

  setTimeout(printNow, 1000);
})();
