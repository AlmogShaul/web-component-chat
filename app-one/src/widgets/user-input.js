import { LitElement, html, css } from 'lit-element';
import {SendButton} from './send-button.js';
import {ChatService} from "../services/chat-service";

export class UserInput extends LitElement {
  static get properties() {
    return {
      userMessage: { type: String },
      page: { type: String },
    };
  }

constructor() {
  super();
  this.userMessage = 'hi';
  this.handleEnterAction();
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
        padding:0 5px;
      }
      .main .input-message{
        flex-grow:1;
        margin:0;
        color:black;
        font-size:20px;
        height:70%;
        border-radius:20px;
        margin-left:10px;
        padding-left:10px;
        border: 0px;
      }
      .main .input-message:focus{
      outline:0;
      }
      .main send-button{
        margin-left: 10px;
        width:auto;
        height:100%;
      }

      }
    `;
  }

  render() {
    return html`
     <div class="main">
       <input @input="${this.userInputChanged}" .value="${this.userMessage}" class="input-message">
       <send-button  @click=${this.handleSendMessageRequest}> ></send-button>
     </div>
    `;
  }

  userInputChanged(event){
    this.userMessage = event.target.value;
    ChatService.sendTypingMessage();
  }

  handleSendMessageRequest(){
    if(!this.userMessage) return;
    ChatService.sendMessage(this.userMessage);
    this.userMessage = '';
    this.focusUserInput();
  }

  handleEnterAction() {
    document.addEventListener('keypress',(event)=>{
      if(event.key  === 'Enter'){
        this.handleSendMessageRequest();
      }
    })
  }

  focusUserInput() {
    const userInput = this.shadowRoot.querySelector('.input-message');
    if(userInput){
      userInput.focus();
    }

  }
}
customElements.define('user-input', UserInput);
