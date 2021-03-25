function _getAccessToken() {
  return localStorage.getItem("auth_token");
}

function _setToken(token) {
  localStorage.setItem("auth_token", token);
}
function _clearToken() {
  localStorage.removeItem("auth_token");
}

const localStorageService = {
  setToken: _setToken,
  getAccessToken: _getAccessToken,
  clearToken: _clearToken,
};

export default localStorageService;
