import * as axiosPost from "@axios/post";
import * as axiosGet from "@axios/get";
import * as axiosPut from "@axios/put";

// readOne

export async function getTeam(data) {
  return axiosGet
    .getAccess("http://localhost:8090/api/teamManage/" + data)
    .then((res) => res);
}

// readList

export async function getTeamList() {
  return axiosGet
    .getAccess("http://localhost:8090/api/teamManage")
    .then((res) => res);
}

export async function getJoinTeamList(data) {
  return axiosGet
    .getAccess("http://localhost:8090/api/teamManage/" + data + "/signUpList")
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

// update
export async function updateTeam(data, updateData) {
  return axiosPut.putAccess(
    "http://localhost:8090/api/teamManage/" + data,
    updateData
  );
}

export async function successJoinTeam(data) {
  return axiosPut.putAccess(
    "http://localhost:8090/api/teamManage/" + data + "/joinTeam/success"
  );
}