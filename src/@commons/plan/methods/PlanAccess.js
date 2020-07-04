import { getAccess, getAccessFileDownLoad } from "@axios/get";
import { postAccess, postAccessFileUpload } from "@axios/post";
import { deleteAccess } from "@axios/delete";
import { putAccess } from "@axios/put";

// readOne

export const getPlan = (seq) => {
  return getAccess("http://192.168.43.179:8090/api/teamManage/plan/" + seq).then(
    (res) => res
  );
};

// readList

export async function getPlanProgress(data) {
  return getAccess(
    "http://192.168.43.179:8090/api/teamManage/plan/" + data + "/progress-all"
  ).then((res) => res);
}

export async function getPlanCount(data) {
  return getAccess(
    "http://192.168.43.179:8090/api/teamManage/plan/" + data + "/group-by-user"
  ).then((res) => res);
}

export async function getPlanListMy(data, pageable) {
  return getAccess(
    "http://192.168.43.179:8090/api/teamManage/plan/" +
      data +
      "/all/my?page=" +
      pageable["page"] +
      "&size=" +
      pageable["size"] +
      "&title=" +
      pageable["tag"] +
      "&todo=" +
      pageable["title"] +
      "&start=" +
      pageable["start"] +
      "&end=" +
      pageable["end"]
  ).then((res) => res);
}

export async function getPlanListAll(data, pageable) {
  return getAccess(
    "http://192.168.43.179:8090/api/teamManage/plan/" +
      data +
      "/all?page=" +
      pageable["page"] +
      "&size=" +
      pageable["size"]
  ).then((res) => res);
}

export async function getPlanList(data, pageable) {
  return getAccess(
    "http://192.168.43.179:8090/api/teamManage/plan/" +
      data +
      "/search/all?page=" +
      pageable["page"] +
      "&size=" +
      pageable["size"] +
      "&date=" +
      pageable["date"]
  ).then((res) => res);
}

export async function getExcelData(code, file) {
  return postAccessFileUpload(
    "http://192.168.43.179:8090/api/teamManage/plan/" + code + "/excel-data",
    file
  );
}

// insert
export async function insertPlan(code, data) {
  return postAccess(
    "http://192.168.43.179:8090/api/teamManage/plan/" + code,
    data
  ).then((res) => res);
}

export async function excelUpload(code, file) {
  return postAccessFileUpload(
    "http://192.168.43.179:8090/api/teamManage/plan/" + code + "/excel-upload",
    file
  );
}

export async function excelFormDown() {
  return getAccessFileDownLoad(
    "http://192.168.43.179:8090/api/teamManage/plan/excel-form",
    "엑셀 양식.xlsx"
  );
}

export async function insertTodo(seq, todo) {
  return postAccess(
    "http://192.168.43.179:8090/api/teamManage/todoList/" + seq,
    todo
  ).then((res) => res);
}

// update
export async function updatePlan(seq, plan) {
  return putAccess("http://192.168.43.179:8090/api/teamManage/plan/" + seq, plan);
}

export async function updateTodoIng(seq, type) {
  return putAccess(
    "http://192.168.43.179:8090/api/teamManage/todoList/" + seq + "/" + type
  );
}

export async function updateTodoTitle(seq, data) {
  return putAccess(
    "http://192.168.43.179:8090/api/teamManage/todoList/" + seq,
    data
  );
}

// delete

export async function deletePlan(seq) {
  return deleteAccess("http://192.168.43.179:8090/api/teamManage/plan/" + seq).then(
    (res) => res
  );
}

export async function deleteTodo(seq) {
  return deleteAccess(
    "http://192.168.43.179:8090/api/teamManage/todoList/" + seq
  ).then((res) => res);
}
