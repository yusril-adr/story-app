import '@dotlottie/player-component';
import { LitElement, html, css } from 'lit';
import { msg, str, updateWhenLocaleChanges } from '@lit/localize';

class LottiePlayer extends LitElement {
  static styles = css`
    dotlottie-player {
      max-width: 480px;
    }  
  `;

  static properties = {
    url: { type: String, reflect: true },
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this._checkAvailabilityProperty();
  }

  _checkAvailabilityProperty() {
    if (!this.hasAttribute('url')) {
      throw new Error(msg(str`Attribut "url" must be implemented on element: ${this.localName}`));
    }
  }

  render() {
    return html`
      <dotlottie-player
        autoplay
        loop
        mode="normal"
        src="${this.url}"
      >
      </dotlottie-player>
    `;
  }
}

customElements.define('lottie-player', LottiePlayer);
