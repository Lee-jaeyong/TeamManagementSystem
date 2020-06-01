import { getAccess } from "@axios/get";
import { postAccess } from "@axios/post";
import { deleteAccess } from "@axios/delete";
import { putAccess } from "@axios/put";

// readOne

export const getPlan = (seq) => {
  return getAccess("http://localhost:8090/api/teamManage/plan/" + seq).then(
    (res) => res
  );
};

// readList

export async function getPlanCount(data) {
  return getAccess(
    "http://localhost:8090/api/teamManage/plan/" + data + "/group-by-user"
  ).then((res) => res);
}

export async function getPlanListAll(data, pageable) {
  return getAccess(
    "http://localhost:8090/api/teamManage/plan/" +
      data +
      "/all?page=" +
      pageable["page"] +
      "&size=" +
      pageable["size"]
  ).then((res) => res);
}

export async function getPlanList(data, pageable) {
  return getAccess(
    "http://localhost:8090/api/teamManage/plan/" +
      data +
      "/search/all?page=" +
      pageable["page"] +
      "&size=" +
      pageable["size"] +
      "&date=" +
      pageable["date"]
  ).then((res) => res);
}

// insert
export async function insertPlan(code, data) {
  return postAccess(
    "http://localhost:8090/api/teamManage/plan/" + code,
    data
  ).then((res) => res);
}

export async function insertTodo(seq, todo) {
  return postAccess(
    "http://localhost:8090/api/teamManage/todoList/" + seq,
    todo
  ).then((res) => res);
}

// update
export async function updatePlan(seq, plan) {
  return putAccess("http://localhost:8090/api/teamManage/plan/" + seq, plan);
}

// delete

export async function deletePlan(seq) {
  return deleteAccess("http://localhost:8090/api/teamManage/plan/" + seq).then(
    (res) => res
  );
}

export async function deleteTodo(seq) {
  return deleteAccess(
    "http://localhost:8090/api/teamManage/todoList/" + seq
  ).then((res) => res);
}
