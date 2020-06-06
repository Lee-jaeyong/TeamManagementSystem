import { getAccess } from "@axios/get";

export async function getUser() {
  const res = await getAccess("http://localhost:8090/api/users");
  return res.data;
}
