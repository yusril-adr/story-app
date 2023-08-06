import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class StoryAddTitle extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <h1 class="mb-3">${msg('Share New Story')}</h1>
    `;
  }
}

customElements.define('story-add-title', StoryAddTitle);
