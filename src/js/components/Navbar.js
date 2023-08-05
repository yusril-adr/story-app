import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import './NavLinks';

import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class NavBar extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.navs = [
      {
        name: msg('Home'),
        url: '/',
      },
      {
        name: msg('Add Story'),
        url: '/story/add.html',
      },
      {
        name: msg('About Developer'),
        url: 'https://yusril-adr.github.io',
        rel: 'noreferrer',
        target: '_blank',
      },
    ].map(this._checkActiveNav);
  }

  _checkActiveNav(nav) {
    const currentUrl = window.location.pathname;
    const active = currentUrl === nav.url;

    return {
      ...nav,
      active,
    };
  }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div class="container">
          <a class="navbar-brand" href="/">Story App</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="bi bi-list"></span>
          </button>
          <nav-links
            navs=${JSON.stringify(this.navs)}
            class="collapse navbar-collapse"
            id="navbarSupportedContent"
          ></nav-links>
        </div>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
