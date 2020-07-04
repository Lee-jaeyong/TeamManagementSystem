import { getAccess } from "@axios/get";

export async function getUser() {
  const res = await getAccess("http://192.168.43.179:8090/api/users");
  return res.data;
}
