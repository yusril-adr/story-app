import { html } from 'lit';
import * as bootstrap from 'bootstrap';
import LitWithoutShadowDom from './base/LitWithoutShadowDom';

class ModalAlert extends LitWithoutShadowDom {
  static properties = {
    title: { type: String, reflect: true },
    body: { type: String, reflect: true },
    active: { type: Boolean, reflect: true },
  };

  constructor() {
    super();

    this.title = '';
    this.body = '';
  }

  render() {
    return html`
      <div class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${this.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>${this.body}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  show() {
    const modalElem = this.querySelector('.modal');
    const modal = new bootstrap.Modal(modalElem);
    modal.show();
  }
}

customElements.define('modal-alert', ModalAlert);
