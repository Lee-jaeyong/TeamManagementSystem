import {
  SEND_MESSAGE,
  INIT_CHAT_ROOM,
  INIT,
} from "@store/actions/SocketAction";

const init = {
  socket: {
    type: "",
    code: "",
    message: "",
  },
  chatRoom: [
    {
      code: "",
      message: [],
    },
  ],
};

function chat(origin, message) {
  let result = [];
  origin.map((chat) => {
    if (chat["code"] === message["code"]) {
      result.push({
        code: chat["code"],
        message: chat["message"].concat({
          user: message["user"],
          userImg: message["userImg"],
          message: message["message"],
        }),
      });
    } else {
      result.push(chat);
    }
  });
  return result;
}

export default function SocketReducer(
  state = init,
  { type, socket, chatRoom }
) {
  switch (type) {
    case SEND_MESSAGE:
      return Object.assign({}, state, {
        chatRoom: chat(state["chatRoom"], socket),
        socket: {
          type: socket["socket"] ? "" : "message",
          code: socket["socket"] ? "" : socket["code"],
          message: socket["socket"] ? "" : socket,
        },
      });
    case INIT_CHAT_ROOM:
      return Object.assign({}, state, {
        chatRoom: chatRoom,
      });
    case INIT:
      return Object.assign({}, state, {
        socket: {
          type: "",
          code: "",
          message: "",
        },
      });
    default:
      return state;
  }
}
