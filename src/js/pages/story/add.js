import { getLocale } from '../../utils/localization';

const Index = {
  async init() {
    await this._initForm();
  },

  async _initForm() {
    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      event.target.classList.add('was-validated');

      if (this._validationFormData(event.target)) {
        this._showSuccessModal();
      }
    });
  },

  _validationFormData(formData) {
    let valid = true;
    if (
      formData.validationStories.value.trim() === ''
      || formData.validationImage.files.length === 0
    ) {
      valid = false;
    }

    return valid;
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
        en: 'Success Sharing your new Story',
        id: 'Sukses membagikan kisah barumu',
        es: 'Éxito al compartir su nueva historia',
      },
    };

    const modalElem = document.querySelector('modal-alert');
    modalElem.setAttribute('title', modalMassages.title[currLocale]);
    modalElem.setAttribute('body', modalMassages.body[currLocale]);
    modalElem.show();
  },
};

export default Index;
