import { html, nothing } from 'lit';
import { msg, str, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from '../base/LitWithoutShadowDom';

class InputFloatingLabelWithValidation extends LitWithoutShadowDom {
  static properties = {
    value: { type: String, reflect: true },
    inputId: { type: String, reflect: true },
    placeholder: { type: String, reflect: true },
    label: { type: String, reflect: true },
    type: { type: String, reflect: true },

    validFeedbackMessage: { type: String, reflect: true },
    invalidFeedbackMessage: { type: String, reflect: true },
    isValid: { type: Boolean, reflect: true },
    isInvalid: { type: Boolean, reflect: true },

    minLength: { type: Number, reflect: true },
    required: { type: Boolean, reflect: true },
    autocomplete: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.removeAttribute('class');
    this.classList.add('input-group', 'has-validation', 'mb-3');

    this.placeholder = msg('Some text');
    this.minLength = null;
    this.required = false;
    this.autocomplete = false;

    this.isValid = null;
    this.isInvalid = null;

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
    if (this.type !== 'password') {
      return html`
        <div class="form-floating">
          <input
            id="${this.inputId}"
            type="${this.type}"
            class="form-control" 
            name="${this.inputId}"
            placeholder="${this.placeholder}"
            minlength="${this.minLength || nothing}"
            autocomplete="${this.autocomplete ? 'on' : 'off'}"
            ?required="${this.required}"
          >
          <label for="${this.inputId}">${this.label || this.placeholder}</label>
          <div class="valid-feedback">${this.validFeedbackMessage || nothing}</div>
          <div class="invalid-feedback">${this.invalidFeedbackMessage || nothing}</div>
        </div>
      `;
    }

    return html`
      <div class="input-group has-validation">
        <div class="form-floating">
          <input
            id="${this.inputId}"
            type="${this.type}"
            class="form-control" 
            name="${this.inputId}"
            placeholder="${this.placeholder}"
            minlength="${this.minLength || nothing}"
            autocomplete="${this.autocomplete ? 'on' : 'off'}"
            ?required="${this.required}"
          >
          <label for="${this.inputId}">${this.label || this.placeholder}</label>
        </div>

        <button type="button" class="input-group-text" @click=${this._onButtonClick}><i class="bi bi-eye-fill"></i></button>

        <div class="valid-feedback ${this.isValid ? 'd-block' : ''}">${this.validFeedbackMessage || nothing}</div>
        <div class="invalid-feedback ${this.isInvalid ? 'd-block' : ''}">${this.invalidFeedbackMessage || nothing}</div>
      </div>
    `;
  }

  _onButtonClick() {
    const iconElem = this.querySelector('button.input-group-text i.bi');
    iconElem.classList.toggle('bi-eye-fill');
    iconElem.classList.toggle('bi-eye-slash-fill');

    const inputElem = this.querySelector(`#${this.inputId}`);
    if (iconElem.classList.contains('bi-eye-fill')) {
      inputElem.setAttribute('type', 'password');
    } else {
      inputElem.setAttribute('type', 'text');
    }
  }
}

customElements.define('input-floating-label-with-validation', InputFloatingLabelWithValidation);
