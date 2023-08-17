import { html, nothing } from 'lit';
import { msg, str, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class TextareaWithValidation extends LitWithoutShadowDom {
  static properties = {
    value: { type: String, reflect: true },
    rows: { type: Number, reflect: true },
    inputId: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },

    previewElem: { type: String, reflect: true },

    required: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this.previewElem = null;
    this.rows = 3;
    this.required = false;
    this.placeholder = msg('Some text');

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
      <textarea
        id="${this.inputId || nothing}"
        name="${this.inputId || nothing}"
        class="form-control"
        rows="${this.rows || nothing}"
        value="${this.value || nothing}"
        placeholder="${this.placeholder}"
        ?required="${this.required}"
        @input=${this._onInput}
      ></textarea>
 
      <div class="valid-feedback">${this.validFeedbackMessage || nothing}</div>
      <div class="invalid-feedback">${this.invalidFeedbackMessage || nothing}</div>
    `;
  }

  _onInput(event) {
    this.value = event.target.value;
    if (this.previewElem) {
      const previewElem = document.querySelector(this.previewElem);
      previewElem.setAttribute('description', this.value);
    }
  }
}

customElements.define('textarea-with-validation', TextareaWithValidation);
