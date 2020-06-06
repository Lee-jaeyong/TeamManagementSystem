export const READ_TEAM_LIST = "READ_TEAM_LIST";
export const READ_TEAM = "READ_TEAM";
export const READ_MY_SIGNUP_LIST = "READ_MY_SIGNUP_LIST";
export const READ_FINISHED_TEAM_LIST = "READ_FINISHED_TEAM_LIST";
export const UPDATE_TEAM = "UPDATE_TEAM";
export const INSERT_TEAM = "INSERT_TEAM";
/////////////////////////////////////////////////////

export const UPDATE_JOIN_TEAM = "UPDATE_JOIN_TEAM";

/////////////////////////////////////////////////////

export const readTeamListHandle = (teamList) => {
  return {
    type: READ_TEAM_LIST,
    teamList:teamList
  };
};

export const readTeamOneHandle = (team) => {
  return {
    type: READ_TEAM,
    team:team
  };
}

export const readMySignupList = (mySignUp) =>{
  return{
    type : READ_MY_SIGNUP_LIST,
    mySignUp : mySignUp
  }
}

export const readFinishedTeamList = (finishedTeamList) =>{
  return{
    type : READ_FINISHED_TEAM_LIST,
    finishedTeamList :finishedTeamList
  }
}

export const insertTeamHandle = (team) => {
  return {
    type : INSERT_TEAM,
    team : team
  }
}

export const updateTeamHandle = (team) => {
  return {
    type: UPDATE_TEAM,
    team:team
  };
}

export const updateJoinTeam = (joinTeam) => {
  return {
    type : UPDATE_JOIN_TEAM,
    joinTeam : joinTeam
  } 
}
