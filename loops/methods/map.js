const band = [
  { name: "corbett", instrument: "guitar" },
  { name: "evan", instrument: "guitar" },
  { name: "sean", instrument: "bass" },
  { name: "brett", instrument: "drums" },
];

// map()을 사용하기 전에 for문으로 작성해보자.
const instruments = [];
for (let i = 0; i < band.length; i++) {
  // 아래 두개를 묶어보자. 별도의 get함수를 만들어서
  // const instrument = band[i].instrument;
  // instruments.push(instrument);
  instruments.push(getInstrument(band[i]));
}
function getInstrument(member) {
  return member.instrument;
}
console.log(instruments);

const instrument = band.map(({ instrument }) => instrument);
console.log(instrument);
