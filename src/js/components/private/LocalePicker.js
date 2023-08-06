import { LitElement, html, css } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { allLocales } from '../../../generated/locale-codes';
import { getLocale, localeNames, setLocaleFromUrl } from '../../utils/localization';

class LocalePicker extends LitElement {
  static styles = css`
    * {
      font-family: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --bs-font-monospace: SFMono-Regular, Menlo';
      font-size: 143;
      font-weight: 400;
      line-height: 1.5;
    }

    :host {
      display: flex;
      align-items: center;
    }

    select {
      margin-left: 1rem;
      display: block;
      width: auto;
      padding: 0.375rem 2.25rem 0.375rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      appearance: none;
      background-repeat: no-repeat;
      background-position: right 0.75rem center;
      background-size: 16px 12px;
      border: 1px solid #dee2e6;
      border-radius: 0.375rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
  `;

  static properties = {
    elemId: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.elemId = '';
  }

  render() {
    return html`
      <label for="change-language">${msg('Language :')}</label>
      <select class="form-select w-auto ms-3" id="${this.elemId}" @change=${this._localeChanged}>
        ${allLocales.map((locale) => html`
            <option value=${locale} ?selected=${locale === getLocale()}>
              ${localeNames[locale]}
            </option>
          `)}
      </select>
    `;
  }

  _localeChanged(event) {
    const newLocale = event.target.value;

    if (newLocale !== getLocale()) {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLocale);

      window.history.pushState(null, '', url.toString());
      setLocaleFromUrl();
    }
  }
}

customElements.define('locale-picker', LocalePicker);
