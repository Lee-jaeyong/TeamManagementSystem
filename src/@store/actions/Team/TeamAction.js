export const READ_TEAM = "READ_TEAM";

export const readTeamHandle = (teamList) => {
  return {
    type: READ_TEAM,
    teamList:teamList
  };
};
