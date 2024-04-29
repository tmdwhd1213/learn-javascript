import normalize from "./address.js";

function getAddress(user) {
  return normalize(user.address);
}

export default getAddress;
