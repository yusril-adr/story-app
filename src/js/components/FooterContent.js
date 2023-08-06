import { html } from 'lit';
import { msg, str, updateWhenLocaleChanges } from '@lit/localize';

import LitWithoutShadowDom from './base/LitWithoutShadowDom';

// import './private/LocalePicker';

class FooterContent extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="container d-flex justify-content-between align-items-center">
        <p class="m-0 p-0">${msg(str`© Yusril A. P. ${new Date().getFullYear()} All rights reserved.`)}</p>

        <div class="local-picker">
          <locale-picker elemId="change-language"></locale-picker>
        </div>
      </div>
    `;
  }
}

customElements.define('footer-content', FooterContent);
