import {UserService} from "./user-service";

export const Mapper = {
  buildChatMessageModel: (chatMessage) => {
    return {
      user: chatMessage.user,
      message: chatMessage.message,
      timestamp: new Date(chatMessage.timestamp),
      repliedMessage:chatMessage.repliedMessage,
      botAnswer:chatMessage.botAnswer
    }
  },
  createChatMessageDTO: (message,repliedMessage) => {
    return {
      user: UserService.getUser(),
      message: message,
      timestamp: new Date(),
      repliedMessage:repliedMessage
    };
  }
}
