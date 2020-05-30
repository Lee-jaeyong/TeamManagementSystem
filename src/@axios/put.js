import axios from "axios";

export async function putFileUpload(URL, func, formData) {
  axios
    .put(URL, formData, {
      headers: {
        Authorization:
          localStorage.getItem("token_type") +
          " " +
          localStorage.getItem("access_token"),
      },
    })
    .then((res) => func(res.data));
}

export async function putContainsData(URL, func, error, data) {
  axios
    .put(URL, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          localStorage.getItem("token_type") +
          " " +
          localStorage.getItem("access_token"),
      },
    })
    .then((res) => func(res.data))
    .catch((res) => error(res));
}

export async function putNotContainsData(URL, func) {
  axios
    .put(
      URL,
      {},
      {
        headers: {
          Authorization:
            localStorage.getItem("token_type") +
            " " +
            localStorage.getItem("access_token"),
        },
      }
    )
    .then((res) => func(res.data))
    .catch((res) => alert(res));
}

/////////////////////////////////////////////////////////////////////////////////////

export async function putAccess(URL, data) {
  let res = await axios.put(URL, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        localStorage.getItem("token_type") +
        " " +
        localStorage.getItem("access_token"),
    },
  });
  return res.data;
}
