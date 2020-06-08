import { LitElement, html, css } from 'lit-element';

export class SendButton extends LitElement {
  static get styles() {
    return css`
      :host {
        height:100%;
        width:auto;
        display:flex;
        align-items:center;
      }
      svg{
        fill:darkgrey;
      }
      svg:hover{
        fill:black;
      }
      .btn-wrapper{
        height:100%
        width:100%;
      }
    `;
  }



  render() {
    return html`
              <div  class="btn-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 12l-20 12 5-12-5-12z"/></svg>
              </div>
    `;
  }
}
customElements.define('send-button', SendButton);
