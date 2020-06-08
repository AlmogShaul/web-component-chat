import {LitElement, html, css} from 'lit-element';
import {ChatHeader} from "../widgets/chat-header";
import {MessagesBoard} from '../widgets/messages-board';
import {UserInput} from '../widgets/user-input';
import {ChatService} from "../services/chat-service";
import {UserService} from "../services/user-service";

export class ChatRoom extends LitElement {

  constructor() {
    super();
    this.typingUsers = {};
    this.handleChatMessages();
  }

  static get properties() {
    return {
      typingUsers: {type: Object}
    };
  }

  static get styles() {
    return css`
      :host {
        height:100%;
        display:flex;
        flex-direction:column;
        width:100%;
      }
      messages-board{
       flex-grow:1;
       }
    `;
  }

  clearUserTyping(userName){
    delete this.typingUsers[userName];
    this.performUpdate();
  }

  handleTypingMessage(userName) {
    if(UserService.getUser().name === userName) {
     return;
    }
    if (this.typingUsers[userName]) {
      clearTimeout(this.typingUsers[userName]);
    }

    this.typingUsers[userName] = setTimeout(() => {
      delete this.typingUsers[userName];
      this.performUpdate();
    }, 5000);

  this.performUpdate();
  }

  render() {
    return html`
        <chat-header .typingUsers="${Object.keys(this.typingUsers)}"></chat-header>
        <messages-board ></messages-board>
        <user-input></user-input>
    `;
  }

  messageSent(chatMessage){

  }

  handleChatMessages() {
    ChatService.getTypingObservable().subscribe(userName => {
      this.handleTypingMessage(userName);
    })
    ChatService.getMessagesObservable().subscribe(message => {
      this.clearUserTyping(message.user.name);
    })
  }
}


customElements.define('chat-room', ChatRoom);
