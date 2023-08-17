import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import LitWithoutShadowDom from './base/LitWithoutShadowDom';

import User from '../services/localStorage/User';
import Token from '../services/localStorage/Token';

class NavBar extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    const user = User.getUser();
    if (!user) {
      return html`
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div class="container">
            <a class="navbar-brand" href="/">Story App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="bi bi-list"></span>
            </button>
            <div
              class="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a
                    class="nav-link ${this._checkActiveNav('/auth/login.html') ? 'active' : ''}"
                    href="/auth/login.html"
                  >
                    ${msg('Login')}
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link ${this._checkActiveNav('/auth/register.html') ? 'active' : ''}"
                    href="/auth/register.html"
                  >
                    ${msg('Register')}
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="https://yusril-adr.github.io"
                    rel="noreferrer"
                    target="_blank"
                  >
                    ${msg('About Developer')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      `;
    }

    return html`
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div class="container">
            <a class="navbar-brand" href="/">Story App</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="bi bi-list"></span>
            </button>
            <div
              class="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a
                    class="nav-link ${this._checkActiveNav('/') ? 'active' : ''}"
                    href="/"
                  >
                    ${msg('Home')}
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link ${this._checkActiveNav('/story/add.html') ? 'active' : ''}"
                    href="/story/add.html"
                  >
                    ${msg('Add Story')}
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="https://yusril-adr.github.io"
                    rel="noreferrer"
                    target="_blank"
                  >
                    ${msg('About Developer')}
                  </a>
                </li>
              </ul>

              <button class="btn btn-outline-light" type="button" @click=${this._logout}>
                <span class="bi bi-box-arrow-left"></span>
                ${msg('Log out')}
              </button>
            </div>
          </div>
        </nav>
      `;
  }

  _checkActiveNav(url) {
    const currentUrl = window.location.pathname;
    const active = currentUrl === url;

    return active;
  }

  _logout() {
    User.removeUser();
    Token.removeToken();

    window.location.href = '/auth/login.html';
  }
}

customElements.define('nav-bar', NavBar);
