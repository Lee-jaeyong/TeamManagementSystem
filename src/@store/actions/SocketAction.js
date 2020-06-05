export const SEND_MESSAGE = "SEND_MESSAGE";
export const INIT_CHAT_ROOM = "INIT_CHAT_ROOM";

export const sendMessage = (socket) => {
  return { type: SEND_MESSAGE, socket: socket };
};

export const initChatRoom = (chatRoom) => {
  return { type: INIT_CHAT_ROOM, chatRoom: chatRoom };
};
