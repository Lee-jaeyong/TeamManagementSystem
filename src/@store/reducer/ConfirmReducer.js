import { SHOW_CONFIRM } from "../actions/ConfirmAction";

const init = {
  open: false,
  title: "",
  content: "",
  yesClick: () => {},
};

export default function ConfirmReducer(state = init, {type,confirm}) {
  switch (type) {
    case SHOW_CONFIRM:
      return Object.assign({}, state, {
        ...confirm,
      });
    default:
      return state;
  }
}
