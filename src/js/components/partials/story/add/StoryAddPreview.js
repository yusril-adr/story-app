import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from '../../../base/LitWithoutShadowDom';
import DateHelper from '../../../../utils/DateHelper';
import User from '../../../../services/localStorage/User';

class StoryAddPreview extends LitWithoutShadowDom {
  static properties = {
    imageUrl: { type: String, reflect: true },
    username: { type: String, reflect: true },
    description: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this.imageUrl = 'https://source.unsplash.com/1200x700/?nature';
    this.username = User.getUser()?.name || 'Anonymous';
    this.description = '';
  }

  render() {
    return html`
      <h2 class="mb-3 mt-3 mt-lg-0 text-center">${msg('Preview')}</h2>

      <div class="card">
        <img src="${this.imageUrl}" class="card-img-top" alt="Preview">
        <div class="card-body">
          <h5 class="card-title">${this.username}</h5>
          <p class="card-text">${this.description}</p>
        </div>
        <div class="card-footer">
          ${DateHelper.formatDate(new Date())}
        </div> 
      </div>
    `;
  }
}

customElements.define('story-add-preview', StoryAddPreview);
