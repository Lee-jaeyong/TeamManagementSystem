import * as axiosPost from "@axios/post";
import * as axiosGet from "@axios/get";

// readOne

// readList

export async function getTeamList() {
  return axiosGet
    .getAccess("http://localhost:8090/api/teamManage")
    .then((res) => res);
}

// insert

export async function createTeam(data) {
  return axiosPost
    .postAccess("http://localhost:8090/api/teamManage", data)
    .then((res) => res);
}

export async function joinTeam(data) {
  return axiosPost
    .postAccess("http://localhost:8090/api/teamManage/" + data + "/joinTeam")
    .then((res) => res);
}
