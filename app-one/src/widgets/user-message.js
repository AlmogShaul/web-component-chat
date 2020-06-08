import { LitElement, html, css } from 'lit-element';
import {SendButton} from './send-button.js';
import {ChatService} from "../services/chat-service";
import {UserService} from "../services/user-service";
import {classMap} from 'lit-html/directives/class-map.js';
import {styleMap} from 'lit-html/directives/style-map.js';

export class UserMessage extends LitElement {
  static get properties() {
    return {
      chatMessage: { type: Object },
      continuing: { type: Boolean }
    };
  }
constructor() {
  super();
  this.myUser = UserService.getUser();
  this.myUserName = this.myUser.name;
}
  static get styles() {
    return css`

      :host {
        width:100%;
        background: #ecffbe;
        display: flex;
        flex-direction: column;
      }

      p{
        margin:0;
        color:black;
        font-size:20px;
      }

      .message{
          font-size:18px
       }

       .user{
       font-size:12px;
       }

      .message-box{
          display: flex;
          flex-direction: column;
          opacity:0;
          animation: fade 1s ease forwards 1;
          position: relative;
          color:black;
           background: white;
          border-radius: 3px;
          filter: drop-shadow(0 1px 2px rgba(36, 91, 140, 0.3));
          line-height: 150%;
          margin:5px 10px;
          max-width:60%;
          padding: 5px 10px;
          min-width:100px;
      }

      .my-message {
          align-self: flex-start;
      }

      .others-message.with-arrow:before{
          content: '';
          position: absolute;
          left: initial;
          right: 0;
          top: 0;
          width: 0;
          height: 0;
          transform: translateX(10px);
          border-left: 17px solid white;
          border-bottom: 17px solid transparent;
       }

      .my-message.with-arrow:before{
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          transform: translateX(-10px);
          width: 0;
          height: 0;
          border-bottom: 17px solid transparent;
          border-right: 17px solid white;
      }
      .others-message{
          align-self: flex-end;
          direction: rtl;
      }

      .timestamp{
        color:gray;
        font-size: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }
      .options-btn{
        display:none;
        opacity:0.2;
      }
      .message-box:hover .options-btn{

        display: flex;
        width: 100%;
        justify-content: flex-end;
        height:20px;
      }

      .options-btn:hover{
        width:auto;
        height:100%;
        opacity:1 !important;
      }
      .options-btn img{
        width:auto;
        height:100%;
      }
      .innerMessageReply{
         padding: 0 10px;
         border-left: 2px solid red;
        font-size:10px;
      }
      .bot-answer{
         padding: 0 10px;
         height:20px;
         display:flex;
      }
      .bot-answer span{
          font-size: 12px;
          color: blue;
          margin:0px 10px;
      }
      .bot-answer img{
         width:auto;
         height:100%;
      }

        @-webkit-keyframes fade {
          from {opacity: 0;}
          to {opacity: 1;}
      }

      @keyframes fade {
          from {opacity: 0;}
          to {opacity: 1;}
      }
    `;
  }

  render() {
    const myMessage = this.chatMessage.user.name === this.myUserName;
    const messageClasses = {'with-arrow': !this.continuing, 'my-message': myMessage, 'others-message': !myMessage};
    const userHeaderStyles = {'font-size': '12px', color: this.getColorByUser(this.chatMessage.user.name)};


    return html`
                      <div class="message-box  ${classMap(messageClasses)}" >
                           ${this.chatMessage.botAnswer
                             ? html`
                                  <div class="bot-answer">
                                      <img src="../../assets/bot.png"></img>
                                      <span>"didn't we answer that already!?"</span>
                                  </div>
                              ` : html``}
                          <div class="options-btn" @click=${() => this.setReplyMessage(this.chatMessage)}>
                              <img src="../../assets/reply.png"></img>
                          </div>

                          <p class="innerMessageReply">${this.chatMessage.repliedMessage?.message}</p>
                          ${!myMessage
                          ? html`
                          <p style=${styleMap(userHeaderStyles)} >${this.chatMessage.user.name}</p>
                          ` : ``}
                          <p class="message">${this.chatMessage.message}</p>
                          <p class="timestamp"><span>${this.shortTimePipe(this.chatMessage.timestamp)}</span></p>

                      </div>
                    `;
  }


  shortTimePipe(timestamp){
    return timestamp.getHours() + ':' + timestamp.getMinutes();
  }

  getColorByUser(userName){
    return UserService.getUserColor(userName);
  }

  setReplyMessage(message){
    this.dispatchEvent(new CustomEvent("reply-message", {detail:message}));
  }

}
customElements.define('user-message', UserMessage);
