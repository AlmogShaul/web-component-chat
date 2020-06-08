import {Subject} from "rxjs";
import {Mapper} from "./mapper";
import {UserService} from "./user-service";
const messagesObservable = new Subject();
const typingObservable = new Subject();
 const socket = io('http://localhost:2000');

socket.on('chat message', function (msg) {
  messagesObservable.next(msg);
});
socket.on('typing', function (userName) {
  typingObservable.next(userName);
});

export const ChatService = {
  repliedMessage: null,
  sendTypingMessage: () => {
    socket.emit('typing', UserService.getUser().name);
  },
  sendMessage: function (message) {
    let chatMessage = Mapper.createChatMessageDTO(message,this.repliedMessage);
    socket.emit('chat message', chatMessage);
  },
  getMessagesObservable: () => {
    return messagesObservable;
  },
  getTypingObservable: () => {
    return typingObservable;
  }

}


