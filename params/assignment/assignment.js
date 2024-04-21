const landscape = {
  title: "Landscape",
  photographer: "Nathan",
  location: [32.7122222, -103.1405556],
};

const region = {
  city: "Hobbs",
  county: "Lea",
  state: {
    name: "New Mexico",
    abbreviation: "NM",
  },
};

function getCityAndState({ location }) {
  const { city, state } = determineCityAndState(location);
  return {
    city,
    state: state.abbreviation,
  };
}

function determineCityAndState(location) {
  const [longitude, latitude] = location;
  if (parseInt(longitude) === 32 && parseInt(latitude) === -103) {
    return region;
  }
  return {};
}

console.log(getCityAndState(landscape));

function setRegion({ location, ...detail }) {
  const { city, state } = determineCityAndState(location);
  return {
    city,
    state: state.abbreviation,
    ...detail,
  };
}

console.log(setRegion(landscape));
