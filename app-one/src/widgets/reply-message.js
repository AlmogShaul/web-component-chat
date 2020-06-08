import { LitElement, html, css } from 'lit-element';
import {SendButton} from './send-button.js';
import {ChatService} from "../services/chat-service";

export class ReplyMessage extends LitElement {
  static get properties() {
    return {
      message: { type: String }
    };
  }
constructor() {
  super();

}
  static get styles() {
    return css`
      :host {

        width:100%;
        background: #a6d38a;
        margin: 0 auto;
         display: flex;
        align-items: center;
        justify-content:center;
      }
      .main{
        background: whitesmoke;
        margin:5px;

        width: 100%;
        padding: 10px;
      }
      p{
        margin:0;
        padding:0;
      }
      .reply-header{
        font-size:12px;
        margin:2px;
        color:green;

      }
    `;
  }

  render() {
    return html`
     <div class="main">
       <p class="reply-header">reply to:</p>
       <p>${this.message}</p>
     </div>
    `;
  }


}
customElements.define('reply-message', ReplyMessage);
