export const READ_TEAM_LIST = "READ_TEAM_LIST";
export const READ_TEAM = "READ_TEAM";
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
