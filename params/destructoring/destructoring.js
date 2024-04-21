const landscape = {
  title: "Landscape",
  photographer: "Nathan",
  equipment: "Canon",
  format: "digital",
  src: "/landscape-nm.jpg",
  location: [32.7122222, -103.1405556],
};

// problems -> 원본 객체를 복사해서 원하는 부분만 짤라서 쓰고 싶다.
function displayPhoto(photo) {
  const title = photo.title;
  const photographer = photo.photographer || "Anonymous";
  const location = photo.location;
  const url = photo.src;
  const copy = { ...photo };

  delete copy.title;
  delete copy.photographer;
  delete copy.location;
  delete copy.src;

  const additional = Object.keys(copy).map((key) => `${key}: ${copy[key]}`);

  return `
    <img alt="${title} 사진 ${photographer} 촬영" src="${url}" />
    <div>${title}</div>
  `;
}

function destructorDisplayPhoto({
  title,
  photographer = "Anonymous",
  location: [latitude, longitude], // 배열 해체 할당은 순서대로 할당해야함.
  src: url,
  ...additional
}) {
  console.log(url);
  console.log(latitude); // 32.712222

  //console.log(src)  // src is not defined.

  return `
  <img alt="${title} 사진 ${photographer} 촬영" src="${url}" />
  <div>${title}</div>
`;
}

console.log(destructorDisplayPhoto(landscape));
