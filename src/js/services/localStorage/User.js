import { encode, decode } from 'js-base64';
import CONFIG from '../../config/config';

const User = {
  getUser() {
    const result = localStorage.getItem(CONFIG.USER_KEY);
    if (!result) return result;

    return JSON.parse(decode(result));
  },
  saveUser(user) {
    localStorage.setItem(CONFIG.USER_KEY, encode(JSON.stringify(user)));
  },
  removeUser() {
    localStorage.removeItem(CONFIG.USER_KEY);
  },
};

export default User;
