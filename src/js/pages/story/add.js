import { APIError, ServerError } from '../../errors';

import Modal from '../../utils/Modal';
import Loading from '../../utils/Loading';
import { getLocale } from '../../utils/localization';

import Story from '../../services/api/dicoding-story-api/Story';

const Index = {
  descriptionElemId: 'validationStories',
  imageElemId: 'validationImage',

  async init() {
    await this._initForm();
  },

  async _initForm() {
    document.querySelector('form').addEventListener('submit', async (event) => {
      event.preventDefault();
      event.target.classList.add('was-validated');

      try {
        const formData = this._getFormData(event);
        if (!this._validationFormData(formData)) {
          return;
        }

        Loading.show();

        await Story.createStory(formData);

        Loading.hide();
        this._showSuccessModal();
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
    const descriptionElem = event.target[this.descriptionElemId];
    const imageElem = event.target[this.imageElemId];

    return {
      description: descriptionElem.value,
      photo: imageElem.files[0],
    };
  },

  _validationFormData(formData) {
    let valid = true;
    if (
      formData.description.trim() === ''
      || !formData.photo
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

    Modal.show(
      modalMassages.title[currLocale],
      modalMassages.body[currLocale],
    );
  },
};

export default Index;
