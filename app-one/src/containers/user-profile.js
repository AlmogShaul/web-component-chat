import {LitElement, html, css} from 'lit-element';
import {AvatarList} from '../widgets/avatar-list';
import {UserService} from "../services/user-service";

export class UserProfile extends LitElement {

  static get properties() {
    return {
      showErrorMessage :{type : Boolean},
      userName: {type: String},
      selectedAvatar: {type: Object}
    };
  }

  constructor() {
    super();
    this.handleEnterAction();
  }

  static get styles() {
    return css`
      :host {
        height:100%;
        display:flex;
        align-items:center;
        flex-direction:column;
        width:100%;
        background: var(--user-profile-main-color);
      }
      avatar-list{
        width:40%;
        height:200px;

      }
      h1{
      color:var(--user-profile-text-color);
      }
    .name-input{
      margin-top:10px;
      background:transparent;
      border:0px;
      border-bottom:1px solid gray;
      color:var (--user-profile-text-color);
      font-size:20px;
      height:30px;
      width:200px;
    }
    .name-input:focus{
      outline:0;
    }

    .go-btn{
        margin-top: 50px;
        height: 100px;
        border-radius: 50%;
        width: 100px;
        background: #f87d7d;
        color: white;
        border: 0px;
        font-size: 30px;
    }

    .go-btn:hover{
        background: #f81e5d;
        cursor:pointer;
        transform: scale(1.1, 1.1);
        transition: transform 0.15s ease-in;
    }

    .go-btn:focus{
     outline:0;
    }

    .err-msg{
      color:red;
      font-size:12px;
    }

    .chosen-avatar{
      animation: fade 1s ease forwards 1;
    }


    `;
  }

  render() {
    return html`
       <h1>Choose your avatar</h1>

      ${this.selectedAvatar
      ? html`
         <img src=${this.selectedAvatar.src}>
         `
      : html`
        <avatar-list @user-selected=${this.userSelected}></avatar-list>
         `}

       <input @input="${this.userNameInputChanged}"  placeholder="Insert user name" class="name-input">
       <button class="go-btn" @click=${this.saveChangesAndStartChat} >Start</button>

      ${this.showErrorMessage
      ? html`
      <p class="err-msg"> Please choose your Avatar and insert a user name </p>
      `:html``
      }
    ` ;
  }

  saveChangesAndStartChat() {
    if(!this.userName || !this.selectedAvatar){
      this.showErrorMessage = true;
    }else{
      this.showErrorMessage = false;
      let user ={avatar:this.selectedAvatar,name:this.userName};
      UserService.setUser(user);
      this.dispatchEvent(new CustomEvent("user-created", {detail:user}));
    }

  }

  userNameInputChanged(event) {
    this.userName = event.target.value;
  }

  userSelected(event) {
    this.selectedAvatar = event.detail;
    this.performUpdate();
  }

  handleEnterAction() {
    document.addEventListener('keypress',(event)=>{
      if(event.key  === 'Enter'){
        this.saveChangesAndStartChat();
      }
    })
  }

}


customElements.define('user-profile', UserProfile);
