import { LitElement, html, css } from 'lit-element';
import {UserService} from "../services/user-service";

export class ChatHeader extends LitElement {
  static get properties() {
    return {
      user: { type: Object },
      typingUsers : {type:Array}
    };
  }
constructor() {
  super();
  this.user = UserService.getUser();
}
  static get styles() {
    return css`
      :host {
        height: 50px;
        width:100%;
        background: #a6d38a;
        display: block;
        margin: 0 auto;
      }
      .main{
        display:flex;
        height:100%;
        align-items:center;
      }
      .main p{
        margin:0;
        color:white;
        font-size:20px;
        margin-left:10px;
      }
      .typing{
      margin-left:5px;
       flex-grow:1;
      }
      img{
      object-fit: scale-down;
       height: 90%;
      }
    `;
  }

  render() {
    return html`
     <div class="main">
       <p>Chat room</p>
       <span class="typing">
       ${this.typingUsers.length > 0?
       html`
         ${this.typingUsers.map((userName,index) => {
          return html`
                     <span>${userName} </span>
                     ${index !== this.typingUsers.length-1 ? html`,`:``}
                    `
        }
      )}
       <span> typing...</span>
         `
      :``}
       </span>
       <img src=${this.user.avatar.src}></img>
     </div>


    `;
  }
}
customElements.define('chat-header', ChatHeader);
