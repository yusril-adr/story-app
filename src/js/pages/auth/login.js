import { APIError, ServerError } from '../../errors';
import Auth from '../../services/api/dicoding-story-api/Auth';
import Token from '../../services/localStorage/Token';
import User from '../../services/localStorage/User';
import {
  validateEmail,
} from '../../utils/utils';
import Loading from '../../utils/Loading';
import Modal from '../../utils/Modal';

const Login = {
  formElemId: 'login-form',
  nameElemId: 'login-display-name',
  emailElemId: 'login-email',
  passwordElemId: 'login-password',

  async init() {
    await this._initialListener();
  },

  async _initialListener() {
    const formElem = document.querySelector(`form#${this.formElemId}`);

    formElem.addEventListener('submit', async (event) => {
      event.stopPropagation();
      event.preventDefault();

      formElem.classList.add('was-validated');

      try {
        const formData = this._getFormData(event);

        if (!this._validateFormData(formData)) {
          return;
        }

        Loading.show();

        const response = await Auth.login(formData);

        Loading.hide();

        const { token, ...user } = response.loginResult;
        Token.saveToken(token);
        User.saveUser(user);
        window.location.href = '/';
      } catch (error) {
        Loading.hide();

        if (error instanceof APIError) {
          return Modal.show(
            'API Error',
            error.message,
          );
        }

        if (error instanceof ServerError) {
          return Modal.show(
            'Server Error',
            'Internal Server Error',
          );
        }

        // eslint-disable-next-line no-console
        console.log(error);
        return Modal.show(
          'Unkown Error',
          'Unknown Error',
        );
      }
    });
  },

  _getFormData(event) {
    const email = event.target[this.emailElemId].value;
    const password = event.target[this.passwordElemId].value;

    return { email, password };
  },

  _validateFormData({ email, password }) {
    let valid = true;

    if (email.trim() === '' || !validateEmail(email)) {
      valid = false;
    }

    if (password.trim() === '' || password.length < 8) {
      valid = false;
      this._showErrorPasswordValidation();
    } else {
      this._showSuccessPasswordValidation();
    }

    return valid;
  },

  _showErrorPasswordValidation() {
    const passwordElems = document.querySelectorAll('input-floating-label-with-validation[type="password"]');
    passwordElems.forEach((elem) => {
      elem.removeAttribute('isValid');
      elem.setAttribute('isInValid', '');
    });
  },

  _showSuccessPasswordValidation() {
    const passwordElems = document.querySelectorAll('input-floating-label-with-validation[type="password"]');
    passwordElems.forEach((elem) => {
      elem.removeAttribute('isInValid');
      elem.setAttribute('isValid', '');
    });
  },
};

export default Login;
