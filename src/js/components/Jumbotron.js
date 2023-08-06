import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class Jumbotron extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="bg-body-tertiary">
        <div class="container mb-4 py-5 pb-lg-3 ">
          <div class="d-flex flex-column-reverse flex-lg-row justify-content-between align-items-center">
            <div class="d-flex flex-column justify-content-center align-items-center align-items-lg-start">
              <h1 class="display-5 fw-bold">Story App</h1>
              <p class="fs-4 mb-5">${msg('Share your story with everyone.')}</p>
              <a class="btn btn-primary btn-lg max-w-150px" href="/story/add.html">${msg('Start Now')}</a>
            </div>

            <lottie-player url="/home.lottie"></lottie-player>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('jumbo-tron', Jumbotron);
