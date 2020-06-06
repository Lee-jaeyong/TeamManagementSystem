import {
  READ_TEAM_LIST,
  READ_TEAM,
  READ_MY_SIGNUP_LIST,
  READ_FINISHED_TEAM_LIST,
  UPDATE_TEAM,
  INSERT_TEAM,
  UPDATE_JOIN_TEAM,
} from "../../actions/Team/TeamAction";

const init = {
  teamList: [],
  team: {},
  joinTeam: [],
  finishedTeamList: [],
  mySignup: [],
};

function parseDate(day) {
  let date = new Date(day);
  return (
    date.getFullYear() +
    "-" +
    plusZeroDate(date.getMonth() + 1) +
    "-" +
    plusZeroDate(date.getDate())
  );
}

function plusZeroDate(day) {
  return day < 10 ? "0" + day : day;
}

const TeamReducer = (state = init, action) => {
  switch (action.type) {
    case READ_TEAM_LIST:
      return Object.assign({}, state, {
        teamList: action["teamList"],
      });
    case READ_TEAM:
      return Object.assign({}, state, {
        team: action["team"],
      });
    case READ_MY_SIGNUP_LIST:
      return Object.assign({}, state, {
        mySignUp: action["mySignUp"],
      });
    case READ_FINISHED_TEAM_LIST:
      return Object.assign({},state, {
        finishedTeamList: action["finishedTeamList"], //res["content"]
      });
    case INSERT_TEAM:
      return Object.assign({}, state, {
        teamList: state["teamList"].concat(action["team"]),
      });
    case UPDATE_TEAM:
      return Object.assign({}, state, {
        team: {
          ...state["team"]["data"],
          description: action["team"]["description"],
          name: action["team"]["name"],
          startDate: parseDate(action["team"]["startDate"]),
          endDate: parseDate(action["team"]["endDate"]),
        },
      });
    case UPDATE_JOIN_TEAM:
      return Object.assign({}, state, {
        joinTeam: action["joinTeam"],
      });
    default:
      return state;
  }
};

export default TeamReducer;
