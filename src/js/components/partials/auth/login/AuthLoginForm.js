import { html } from 'lit';
import { msg, updateWhenLocaleChanges, str } from '@lit/localize';
import LitWithoutShadowDom from '../../../base/LitWithoutShadowDom';

import config from '../../../../config/config';

class AuthLoginFormGroup extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="card min-w-md-350">
        <div class="card-body d-flex flex-column align-items-center p-3 p-md-4">
          <h1 class="mb-3">${msg('Login')}</h1>

          <input-floating-label-with-validation
            inputId="login-email"
            type="email"
            placeholder="Email"
            label="Email"
            validFeedbackMessage="${msg('Looking Good !')}"
            invalidFeedbackMessage="${msg('Your email is invalid.')}"
            required
          ></input-floating-label-with-validation>

          <input-floating-label-with-validation
            inputId="login-password"
            type="password"
            placeholder="Password"
            label="Password"
            validFeedbackMessage="${msg('Looking Good !')}"
            invalidFeedbackMessage="${msg(str`Password minimum length is ${config.PASSWORD_MIN_LENGTH}.`)}"
            minLength="8"
            required
          ></input-floating-label-with-validation>

          <button type="submit" class="btn btn-primary px-3">
            ${msg('Login')}
          </button>
        </div>
      </div>

      <div class="card min-w-md-350 mt-3">
        <div class="card-body d-flex justify-content-center">
          ${msg('Don\'t have account?')}
          <a href="/auth/register.html" class="d-block ms-2 font-weight-bold text-primary">${msg('Register')}</a>
        </div>
      </div>
    `;
  }
}

customElements.define('auth-login-form-group', AuthLoginFormGroup);
