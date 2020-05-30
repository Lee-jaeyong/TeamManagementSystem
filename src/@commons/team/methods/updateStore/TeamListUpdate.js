export const updateTeamList = (originData, value) => {
  let updateData = [];
  originData.map((team) => {
    team["code"] === value["code"]
      ? updateData.push(value)
      : updateData.push(team);
  });
  return updateData;
};

export const deleteJoinTeamData = (originData,data) => {
  return originData.filter(value=>value['seq'] != data['seq']);
}

