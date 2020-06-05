import { SEND_MESSAGE, INIT_CHAT_ROOM } from "@store/actions/SocketAction";

const init = {
  socket: {
    type: "",
    code: "",
    message: "",
  },
  chatRoom: [
    {
      code: "C81E728D",
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
          type: "message",
          code: socket["code"],
          message: socket,
        },
      });
    case INIT_CHAT_ROOM:
      return Object.assign({}, state, {
        chatRoom: chatRoom,
      });
    default:
      return state;
  }
}
