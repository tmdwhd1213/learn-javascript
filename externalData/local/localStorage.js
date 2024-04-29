// 사용자들은 매번 같은 데이터를 입력하는 것을 꺼려함.
// 최대한 간섭 없이 사용자 데이터를 유지할 수 있는 법 -> 로그인
// but 로그인이 필요한 페이지를 꺼려함.
// 브라우저에 사용자 데이터를 저장할 수 있음. -> localStorage (브라우저에 있는 작은 DB같은 존재 -> 브라우저의 JS에선 직접적으로 접근X)

// 관련 있는 반려동물만 보여주도록 하는 사이트가 있다.
// 래브라도레트리버를 좋아하는 사람이 작은 반려견에 관심을 갖지 않는 것처럼,
// 세션 간에 사용자가 검색한 것을 저장해두면 사용자에게 도움이 될 것이다.

// 견종을 저장하려면 localStorage 객체에 setItem() 메서드를 사용해서 값을 설정하면 됨.
// 첫번째 인수 key, 두번째 인수 value

function saveBreed(breed) {
  localStorage.setItem("breed", breed);
}

// 사용자가 페이지를 떠났다가 다시 방문할 때 데이터 가져오기.
function getSavedBreed() {
  return localStorage.getItem("breed");
}

// 추가했던 항목을 삭제
function removeBreed() {
  return localStorage.removeItem("breed");
}

// localStorage의 강점: 사용자에게 아무 부담없이 페이지를 떠났다가 다시 돌아오거나 새로고침해도 이전과 동일하게 애플리케이션을 설정 가능.

// 조건을 초기화할 때 localStorage에 견종 정보가 있을 경우 이를 추가할 수 있다.
function applyBreedPreference(filters) {
  const breed = getSavedBreed();
  if (breed) filters.set("breed", breed);
  return filters;
}

// 그룹으로 묶어서 저장하면 훨씬 좋다. 이미 구조화된 데이터이므로.
// 단점: 데이터가 반드시 문자열이여야함. 배열, 객체 못씀.
// but JSON.stringify()로 문자열로 바꾸고 불러올 때 JSON.parse()로 불러오면 됨.
function savePreferences(filters) {
  const filterString = JSON.stringify([...filters]);
  localStorage.setItem("preferences", filterString);
}

// 저장한 데이터를 다시 사용할 때는 데이터를 가져와 다시 맵으로 변환하면 됨.
function retrievePreferences() {
  const preferences = JSON.parse(localStorage.getItem("preferences"));
  return new Map(preferences);
}

// localStorage 비우기
function clearPreferences() {
  localStorage.clear();
}

// sessionStorage를 이용해서 데이터를 임시로 저장할 수 있다.
// 참고: https://mzl.la/2NH4Wsk

// 세션스토리지는 서버 측 렌더링과 클라이언트 측 기능이 혼합되어 있는 경우에 유용함.
// 페이지를 새로 고침하면 저장한 데이터가 유지
// 사용자가 떠났다가 다시 돌아오면 기본 상태로 보여줌. (저장된 것 초기화)
