import {LitElement, html, css} from 'lit-element';
import {Avatars} from "../data/avatars";
import "paper-carousel";

export class AvatarList extends LitElement {

  static get properties() {
    return {
      avatars: {type: Array},
      selectedAvatar: {type: Object}
    };
  }

  constructor(props) {
    super(props);
    this.avatars = this.buildAvatarList();
  }

  static get styles() {
    return css`
      :host {
        height:80%;
        display:block;
      }
      paper-carousel{
        height:100%;
      }
      img{
        object-fit:scale-down;
        height:80%;
      }
      img:hover{
        transform: scale(1.1, 1.1);
        transition: transform 0.15s ease-in;
      }
    `;
  }

  buildAvatarList() {
    return Avatars;
  }

  avatarSelected(avatar) {
    this.selectedAvatar = avatar;
    this.dispatchEvent(new CustomEvent("user-selected", {detail:avatar}));
  }

  render() {
    return html`
    <paper-carousel items="1" controls="true" dots="false" dotText="false">
         ${this.avatars.map(
             avatar => html`

                            <img @click=${() => this.avatarSelected(avatar)} class="paper-carousel-demo-indigo"  src=${avatar.src}>
          `
    )}
     </paper-carousel>
    `;
  }
}

customElements.define('avatar-list', AvatarList);
