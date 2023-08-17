import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class LoadingScreen extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="position-fixed z-3 top-0 bottom-0 start-0 end-0 d-flex flex-column justify-content-center align-items-center bg-dark bg-opacity-75">
        <lottie-player url="/loading.lottie"></lottie-player>
        
        <h1 class="mt-3 text-light">${msg('Loading ...')}</h1>
      </div>
    `;
  }
}

customElements.define('loading-screen', LoadingScreen);
