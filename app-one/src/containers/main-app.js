import {LitElement, html, css} from 'lit-element';
import {ChatRoom} from "./chat-room";
import {UserProfile} from './user-profile';
import {UserService} from "../services/user-service";

export class MainApp extends LitElement {

  static get properties() {
    return {
      myUser: {type: Object}
    };
  }

  constructor() {
    super();
    this.myUser = UserService.getUser();
  }

  static get styles() {
    return css`
      :host {
        height:100%;
        display:flex;
        flex-direction:column;
        width:100%;

      }
      chat-room{
        position:absolute;
        animation: slide 0.5s ease forwards 1;
      }
       @-webkit-keyframes slide {
          from {left: -100%;}
          to {left: 0;}
      }

      @keyframes slide {
           from {left: -100%;}
          to {left: 0;}
      }

    `;
  }

  render() {
    return html`
      ${this.myUser
      ? html`
         <chat-room>
         `
      :  html`
         <user-profile @user-created=${this.myUserCreated}>
         `}
    `;
  }

  myUserCreated(event){
    this.myUser = event.detail;
  }
}


customElements.define('main-app', MainApp);
