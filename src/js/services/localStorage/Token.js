import CONFIG from '../../config/config';

const Token = {
  getToken() {
    return localStorage.getItem(CONFIG.USER_TOKEN_KEY);
  },
  saveToken(token) {
    localStorage.setItem(CONFIG.USER_TOKEN_KEY, token);
  },
  removeToken() {
    localStorage.removeItem(CONFIG.USER_TOKEN_KEY);
  },
};

export default Token;
