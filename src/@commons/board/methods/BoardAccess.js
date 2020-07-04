import { postAccess, postAccessFileUpload } from "@axios/post";
import { getAccess, getAccessFileDownLoad } from "@axios/get";
import { deleteAccess } from "@axios/delete";
import { putAccess } from "@axios/put";

// readOne
export async function getBoard(type, seq) {
  return getAccess(
    "http://192.168.43.179:8090/api/teamManage/" + type + "/" + seq
  ).then((res) => res);
}

export function fileDownLoad(type, seq, fileName) {
  return getAccessFileDownLoad(
    "http://192.168.43.179:8090/api/teamManage/" +
      type +
      "/" +
      seq +
      "/downloadFile/" +
      fileName,
    fileName
  );
}

export function fileAllDownload(type, seq, fileName) {
  return getAccessFileDownLoad(
    "http://192.168.43.179:8090/api/teamManage/" +
      type +
      "/" +
      seq +
      "/downloadFile/all",
    fileName
  );
}

// readList
export async function getBoardList(type, code, pageable) {
  return getAccess(
    "http://192.168.43.179:8090/api/teamManage/" +
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
    "http://192.168.43.179:8090/api/teamManage/" + type + "/" + code,
    data
  ).then((res) => res);
}

export async function insertFile(fileType, seq, type, formData) {
  return postAccessFileUpload(
    "http://192.168.43.179:8090/api/teamManage/" +
      type +
      "/" +
      seq +
      "/fileUpload/" +
      fileType,
    formData
  );
}

//update
export async function updateBoard(type, seq, data) {
  return putAccess(
    "http://192.168.43.179:8090/api/teamManage/" + type + "/" + seq,
    data
  );
}

//delete
export async function deleteBoard(type, seq) {
  return deleteAccess(
    "http://192.168.43.179:8090/api/teamManage/" + type + "/" + seq
  );
}

export async function deleteFile(type, seq, fileName) {
  return postAccessFileUpload(
    "http://192.168.43.179:8090/api/teamManage/" +
      type +
      "/" +
      seq +
      "/fileUpload/" +
      fileName +
      "/delete"
  );
}
