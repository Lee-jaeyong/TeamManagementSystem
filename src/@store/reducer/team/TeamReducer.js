import { READ_TEAM } from "../../actions/Team/TeamAction";

const init = {
  teamList: [],
};

const TeamReducer = (state = init, action) => {
  switch (action.type) {
    case READ_TEAM:
      return Object.assign({}, state, {
          teamList : action['teamList']
      });
    default:
      return state;
  }
};

export default TeamReducer;
