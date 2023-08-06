import { html, nothing } from 'lit';
import { msg, str, updateWhenLocaleChanges } from '@lit/localize';

import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavLink extends LitWithoutShadowDom {
  static properties = {
    name: { type: String, reflect: true },
    url: { type: String, reflect: true },
    rel: { type: String, reflect: true },
    target: { type: String, reflect: true },
    active: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this.active = false;
    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('name')) {
      throw new Error(msg(str`Attribute "name" must be implemented on element: ${this.localName}`));
    }

    if (!this.hasAttribute('url')) {
      throw new Error(msg(str`Attribute "url" must be implemented on element: ${this.localName}`));
    }
  }

  render() {
    return html`
      <li class="nav-item">
        <a
          class="nav-link ${this.active ? 'active' : ''}"
          href="${this.url}"
          ${this.rel ? `rel="${this.rel}"` : nothing}
          ${this.target ? `target="${this.target}"` : nothing}
        >
          ${this.name}
        </a>
      </li>
    `;
  }
}

customElements.define('nav-link', NavLink);
