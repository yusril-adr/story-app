import { html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import LitWithoutShadowDom from '../../../base/LitWithoutShadowDom';

class StoryAddFormGroup extends LitWithoutShadowDom {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="col-12">
        <label for="validationStories" class="form-label">${msg('Stories')}</label>
        <textarea-with-validation
          inputId="validationStories"
          rows="3"
          validFeedbackMessage="${msg('Your story looks pretty cool !')}"
          invalidFeedbackMessage="${msg('Please tell us about your story')}"
          placeholder="${msg('Tell me what your story...')}"
          previewElem="story-add-preview"
          required
          ></textarea-with-validation>
      </div>

      <div class="col-12">
        <label for="validationImage" class="form-label">${msg('Image')}</label>
        <input-image-with-validation
          inputId="validationImage"
          validFeedbackMessage="${msg('Your story image looks pretty cool !')}"
          invalidFeedbackMessage="${msg('Please share us image about your story')}"
          placeholder="${msg('Show us your story with image...')}"
          previewElem="story-add-preview"
          required
          ></input-image-with-validation>
      </div>

      <div class="col-12 text-center text-md-end">
        <button class="btn btn-primary px-3" type="submit">${msg('Share')}</button>
      </div>
    `;
  }
}

customElements.define('story-add-form-group', StoryAddFormGroup);
