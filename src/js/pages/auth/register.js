import { APIError, ServerError } from '../../errors';
import Auth from '../../services/api/dicoding-story-api/Auth';
import {
  validateEmail,
} from '../../utils/utils';
import Loading from '../../utils/Loading';
import { getLocale } from '../../utils/localization';
import Modal from '../../utils/Modal';

const Register = {
  formElemId: 'register-form',
  nameElemId: 'register-display-name',
  emailElemId: 'register-email',
  passwordElemId: 'register-password',

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

        await Auth.register(formData);

        Loading.hide();

        return this._showSuccessModal();
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
    const name = event.target[this.nameElemId].value;
    const email = event.target[this.emailElemId].value;
    const password = event.target[this.passwordElemId].value;

    return { name, email, password };
  },

  _validateFormData({ name, email, password }) {
    let valid = true;

    if (name.trim() === '') {
      valid = false;
    }

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

  _showSuccessModal() {
    const currLocale = getLocale();

    const modalMassages = {
      title: {
        en: 'Yeayy',
        id: 'Yeayy',
        es: 'Yeayy',
      },
      body: {
        en: 'Success creating new account',
        id: 'Sukses membuat akun baru.',
        es: 'Éxito al crear una nueva cuenta',
      },
    };

    Modal.show(
      modalMassages.title[currLocale],
      modalMassages.body[currLocale],
    );
  },
};

export default Register;
