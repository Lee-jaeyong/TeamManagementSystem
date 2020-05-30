import { getAccess } from "@axios/get";

// readOne

export const getPlan = (data) => {};

// readList

export async function getPlanCount(data) {
  return getAccess(
    "http://localhost:8090/api/teamManage/plan/" + data + "/group-by-user"
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
