import * as axiosPost from "@axios/post";
import * as axiosGet from "@axios/get";
import * as axiosPut from "@axios/put";
import * as axiosPatch from '@axios/patch';

// readOne

export async function getTeam(data) {
  return axiosGet
    .getAccess("http://192.168.43.179:8090/api/teamManage/" + data)
    .then((res) => res);
}

// readList

export async function getMySignUpList(){
  return axiosGet
  .getAccess("http://192.168.43.179:8090/api/teamManage/signUpList")
  .then((res) => res);
}

export async function getTeamList() {
  return axiosGet
    .getAccess("http://192.168.43.179:8090/api/teamManage")
    .then((res) => res);
}

export async function getFinishedTeamList(){
  return axiosGet
    .getAccess("http://192.168.43.179:8090/api/teamManage?flag=finished")
    .then((res) => res);
}

export async function getJoinTeamList(data) {
  return axiosGet
    .getAccess("http://192.168.43.179:8090/api/teamManage/" + data + "/signUpList")
    .then((res) => res);
}

// insert

export async function createTeam(data) {
  return axiosPost
    .postAccess("http://192.168.43.179:8090/api/teamManage", data)
    .then((res) => res);
}

export async function joinTeam(data) {
  return axiosPost
    .postAccess("http://192.168.43.179:8090/api/teamManage/" + data + "/joinTeam")
    .then((res) => res);
}

// update
export async function updateTeam(data, updateData) {
  return axiosPut.putAccess(
    "http://192.168.43.179:8090/api/teamManage/" + data,
    updateData
  );
}

export async function successJoinTeam(data) {
  return axiosPut.putAccess(
    "http://192.168.43.179:8090/api/teamManage/" + data + "/joinTeam/success"
  );
}

export async function faildJoinTeam(seq, reson) {
  return axiosPut.putAccess(
    "http://192.168.43.179:8090/api/teamManage/" + seq + "/joinTeam/faild?reson=" + reson
  );
}

export async function finishTeam(code){
  return axiosPatch.patchAccess(
    "http://192.168.43.179:8090/api/teamManage/finish/" + code
  );
}

export async function unFinishTeam(code){
  return axiosPatch.patchAccess(
    "http://192.168.43.179:8090/api/teamManage/unfinish/" + code
  );
}