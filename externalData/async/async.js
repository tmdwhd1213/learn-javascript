import { getArtist, getMusicPromise as getMusic } from "../promise/problem.js";
// async/await 가 promise를 완벽하게 대체하는 것은 아님.

// getUserPreferences().then((preferences) => {
//   console.log(preferences.theme);
// });

// 위의 코드를 async로 대체해보자.
// async 키워드 -> promise를 반환하는 함수임을 알림.
async function getTheme() {
  const { theme } = await getUserPreferences();
  return theme;
}

function getUserPreferences() {
  const preference = new Promise((resolve, reject) => {
    resolve({
      theme: "dusk",
    });
  });
  return preference;
}

getTheme().then((theme) => console.log(theme));

// async가 빛날 때는 여러 개의 Promise를 다룰 때이다.
// async/await를 이용하면 개별 Promise에서 반환된 값을 변수에 먼저 할당하고 다음에 이어질 함수로 전달할 수 있다.
async function getArtistByPreference() {
  const { theme } = await getUserPreferences();
  const { album } = await getMusic(theme);
  const { artist } = await getArtist(album);
  return artist;
}

// 오류 처리는 비동기 호출을 감싼 함수의 밖으로 옮겨야 함. -> getArtistByPreference()를 실행할 때 catch() 메서드로
getArtistByPreference()
  .then((artist) => console.log(artist))
  .catch((e) => console.error(e));
