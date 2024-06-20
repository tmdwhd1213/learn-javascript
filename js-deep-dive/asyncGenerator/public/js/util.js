export const request = {
  get(url, params) {
    if (params) url += "?" + new URLSearchParams(params).toString();
    return fetch(url);
  },

  post(url, payload) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },

  patch(url, payload) {
    return fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },

  delete(url) {
    return fetch(url, { method: "DELETE" });
  },
};
