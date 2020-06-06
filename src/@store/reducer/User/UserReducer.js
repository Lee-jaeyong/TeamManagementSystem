import { READ_USER } from "../../actions/User/UserAction";

const init = {
  user: {},
};

const UserReducer = (state = init, action) => {
  switch (action.type) {
    case READ_USER:
      return Object.assign({}, state, {
        user: action["user"],
      });
    default:
      return state;
  }
};

export default UserReducer;