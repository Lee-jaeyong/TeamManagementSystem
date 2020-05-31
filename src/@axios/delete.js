import axios from "axios";

export async function deleteNotContainsData(URL, func) {
  axios
    .delete(URL, {
      headers: {
        Authorization:
          localStorage.getItem("token_type") +
          " " +
          localStorage.getItem("access_token"),
      },
    })
    .then((res) => func(res.data));
}

////////////////////////////////////////////////////////////////////////////////////////////

export async function deleteAccess(URL) {
  let res = axios.delete(URL, {
    headers: {
      Authorization:
        localStorage.getItem("token_type") +
        " " +
        localStorage.getItem("access_token"),
    },
  });
  return res.data;
}
