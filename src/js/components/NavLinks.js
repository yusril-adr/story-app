import { html, nothing } from 'lit';
import { updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

import './NavLink';

class NavLinks extends LitWithoutShadowDom {
  static properties = {
    navs: { type: Array, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.navs = [];
  }

  render() {
    return html`
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        ${this.navs.map(this._renderNavLink)}
      </ul>
    `;
  }

  _renderNavLink(nav) {
    // return html`
    //   <nav-link
    //     name="${nav.name}"
    //     url="${nav.url}"
    //     ?active="${nav.active}"
    //     target="${nav.target || nothing}"
    //     rel="${nav.rel || nothing}"
    //   ></nav-link>
    // `;

    return html`
      <li class="nav-item">
        <a
          class="nav-link ${nav.active ? 'active' : ''}"
          href="${nav.url}"
          rel="${nav.rel || nothing}"
          target="${nav.target || nothing}"
        >
          ${nav.name}
        </a>
      </li>
    `;
  }
}

customElements.define('nav-links', NavLinks);
