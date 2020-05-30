import { SHOW_MESSAGE } from "../actions/MessageAction";

const init_MessageState = {
  open: false,
  content: "",
  level: "",
};

const MessageReducer = (state = init_MessageState, action) => {
  switch (action.type) {
    case SHOW_MESSAGE:
      return Object.assign({}, state, {
        ...action["messageBox"],
      });
    default:
      return state;
  }
};

export default MessageReducer;
