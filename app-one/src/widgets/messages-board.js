import {LitElement, html, css} from 'lit-element';
import {ChatService} from "../services/chat-service";
import {Mapper} from "../services/mapper";
import {UserMessage} from "./user-message";
import {UserService} from "../services/user-service";
import {ReplyMessage} from "./reply-message";
import {classMap} from 'lit-html/directives/class-map.js';
import {styleMap} from 'lit-html/directives/style-map.js';

export class MessagesBoard extends LitElement {

  constructor() {
    super();
    ChatService.getMessagesObservable().subscribe(message => {
      this.handleChatMessage(message);
    })

    this.chatMessages = [];
    this.myUser = UserService.getUser();
    this.myUserName = this.myUser.name;
  }

  static get properties() {
    return {
      replyMessage:{type:Object},
      chatMessages: {type: Array},
      myUser: {type: Object}
    };
  }

  static get styles() {
    return css`
      :host {
        overflow:auto;
        width:100%;
        background: #ecffbe;
        display: block;

      }

      #main{
        display:flex;
        flex-direction:column;
        height:100%;
        overflow:auto;4
      }
      .messages{
        overflow:auto;
        flex-direction: column;
        display: flex;
        flex-grow:1;
      }
       p{
        margin:0;
        color:black;
        font-size:20px;
      }

    `;
  }

  render() {

    return html`
     <div id="main">
     <div class="messages">
          ${this.chatMessages.map(
            (chatMessage, index) => {
              const continuing = index != 0 && this.chatMessages[index].user.name === this.chatMessages[index - 1].user.name
              return html`
                <user-message @reply-message="${() => this.setReplyMessage(chatMessage)}" .chatMessage="${chatMessage}" .continuing ="${continuing}"></user-message>
              `

            }
    )}
     </div>
       ${this.replyMessage ?
      html`
          <reply-message .message="${this.replyMessage.message}"></reply-message>
          ` : ``
    }
     </div>
    `;
  }

  setReplyMessage(message){
    ChatService.repliedMessage = this.replyMessage = message;
  }


  handleChatMessage(chatMessage) {
    ChatService.repliedMessage = this.replyMessage = null;
    let _chatMessage = Mapper.buildChatMessageModel(chatMessage);
    this.chatMessages.push(_chatMessage);
    this.performUpdate();
    setTimeout(()=>{
      let chatMessagesContainer = this.shadowRoot.querySelector('.messages');
      chatMessagesContainer.scrollTo({
        top: chatMessagesContainer.scrollHeight,
        left:0,
        behavior:'smooth'
      })
    })

  }
}

customElements.define('messages-board', MessagesBoard);
