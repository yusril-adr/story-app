import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

import LitWithoutShadowDom from './base/LitWithoutShadowDom';
import DateHelper from '../utils/DateHelper';

class StoryList extends LitWithoutShadowDom {
  static properties = {
    stories: { type: Array, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.stories = [];
  }

  render() {
    return html`
      <h2>${msg('People Stories')}</h2>
      <hr>

      <div class="row">
        ${this.stories.map(this._renderStoryItem)}
      </div>
    `;
  }

  _renderStoryItem(story) {
    return html`
      <div class="mb-3 col-md-6 col-lg-4">
        <div class="card">
          <img src="${story.photoUrl}" class="card-img-top" alt="${story.description}">
          <div class="card-body">
            <h5 class="card-title">${story.name}</h5>
            <p class="card-text">${story.description}</p>
          </div>
          <div class="card-footer">
            ${DateHelper.formatDate(story.createdAt)}
          </div> 
        </div>
      </div>
    `;
  }
}

customElements.define('story-list', StoryList);
