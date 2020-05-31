import { postAccess, postAccessFileUpload } from "@axios/post";
import { getAccess } from "@axios/get";
import * as axiosPut from "@axios/put";

// readOne
export async function getBoard(type, seq) {
  return getAccess(
    "http://localhost:8090/api/teamManage/" + type + "/" + seq
  ).then((res) => res);
}

// readList
export async function getBoardList(type, code, pageable) {
  return getAccess(
    "http://localhost:8090/api/teamManage/" +
      type +
      "/" +
      code +
      "/all?page=" +
      pageable["page"] +
      "&size=" +
      pageable["size"]
  ).then((res) => res);
}

// insert
export async function createBoard(type, code, data) {
  return postAccess(
    "http://localhost:8090/api/teamManage/" + type + "/" + code,
    data
  ).then((res) => res);
}

export async function insertFile(fileType, seq, type, formData) {
  return postAccessFileUpload(
    "http://localhost:8090/api/teamManage/" +
      type +
      "/" +
      seq +
      "/fileUpload/" +
      fileType,
    formData
  );
}

//update
