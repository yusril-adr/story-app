import { html, nothing } from 'lit';
import { msg, str, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class InputImageWithValidation extends LitWithoutShadowDom {
  static properties = {
    inputId: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    previewElem: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this.previewElem = null;
    this.validFeedbackMessage = '';
    this.invalidFeedbackMessage = '';
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('inputId')) {
      throw new Error(
        msg(str`Attribute "inputId" must be implemented on element ${this.localName}`),
      );
    }
  }

  render() {
    return html`
      <input
        type="file"
        class="form-control"
        id=${this.inputId || nothing}
        name=${this.inputId || nothing}
        accept="image/*"
        ?required=${this.required}
        @change=${this._updatePhotoPreview}
      />
      <div class="valid-feedback">${this.validFeedbackMessage}</div>
      <div class="invalid-feedback">${this.invalidFeedbackMessage}</div>
    `;
  }

  _updatePhotoPreview() {
    const imgInput = document.querySelector(`#${this.inputId}`);

    const photo = imgInput.files[0];
    if (!photo) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (this.previewElem) {
        const previewElem = document.querySelector(this.previewElem);
        previewElem.setAttribute('imageUrl', event.target.result);
      }
    };

    reader.readAsDataURL(photo);
  }
}

customElements.define('input-image-with-validation', InputImageWithValidation);
