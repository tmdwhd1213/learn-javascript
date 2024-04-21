// params 기본값
function convertWeight(weight, { ounces = 0, roundTo = 2 }) {
  // const oz = ounces / 16 || 0;
  const total = weight + ounces;
  const conversion = total / 2.2;
  return roundToDecimalPlace(conversion, roundTo);
}

function roundToDecimalPlace(conversion, round) {
  return conversion.toFixed(round);
}

console.log(convertWeight(6, { roundTo: 3 }));
