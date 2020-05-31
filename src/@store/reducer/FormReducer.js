import { SHOW_FORM } from "../actions/FormAction";

const init = {
  open: false,
  title: "",
  content: "",
  yesClick: () => {},
};

export default function FormReducer(state = init, { type, form }) {
  switch (type) {
    case SHOW_FORM:
      return Object.assign({},state,{
          ...form
      });
    default:
      return state;
  }
}
