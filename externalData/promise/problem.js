// 프라미스가 등장하기 전에 비동기 데이터는 콜백함수로 처리했었다.
// 대표적으로 setTimeout()
function getUserPreferences(cb) {
  return setTimeout(() => {
    cb({
      theme: "dusk",
    });
  }, 1000);
}

function log(value) {
  return console.log(value);
}

log("starting");

getUserPreferences((preferences) => {
  return log(preferences.theme.toUpperCase());
});

log("ending?");
// starting -> ending? -> DUSK

// 이렇게 비동기를 콜백으로 다루면 코랙 함수가 중첩되는 콜백 지옥에 빠질 수 있다.
function getMusic(theme, cb) {
  return setTimeout(() => {
    if (theme === "dusk") {
      return cb({
        album: "music for airports",
      });
    }
    return cb({
      album: "kind of blue",
    });
  }, 1000);
}

getUserPreferences((preferences) => {
  return getMusic(preferences.theme, (music) => {
    console.log(music.album);
  });
});
// music for airports

// 벌써 두개만 중첩되도 읽기 힘들어짐.
// 여기에 성공, 실패 여부의 분기점을 또 만들어서 콜백을 만들어야 함.
// 프라미스를 사용하면 보기 좋게 쌓을 수 있다.

// 성공케이스 (resolve)
function getUserPreferencesPromise() {
  const preferences = new Promise((resolve, reject) => {
    resolve({
      theme: "dusk",
    });
  });
  return preferences;
}

getUserPreferencesPromise().then((preferences) => {
  console.log(preferences.theme);
});
// dusk

// 실패 케이스 reject
function failUserPreferencesPromise() {
  const finder = new Promise((resolve, reject) => {
    reject({
      type: "접근 거부됨",
    });
  });
  return finder;
}

failUserPreferencesPromise()
  .then((preferences) => {
    // 이 부분 실행 ㄴ
    console.log(preferences.theme);
  })
  .catch((error) => {
    console.error(`실패: ${error.type}`);
  });
// 실패: 접근 거부됨.

function getMusicPromise(theme) {
  if (theme === "dusk") {
    return Promise.resolve({
      album: "music for airports",
    });
  }
  return Promise.resolve({
    album: "kind of blue",
  });
}

getUserPreferencesPromise()
  .then((preference) => {
    return getMusicPromise(preference.theme);
  })
  .then((music) => console.log(music.album));

function getArtist(album) {
  return Promise.resolve({
    artist: "Brian Eno",
  });
}

function failMusic(theme) {
  return Promise.reject({
    type: "네트워크 오류",
  });
}

getUserPreferencesPromise()
  .then((preference) => failMusic(preference.theme))
  .then((music) => getArtist(music.album))
  .catch((e) => {
    console.log(e);
  });
