import axios from "axios";

export async function postNotContainsData(URL, func, error) {
  axios
    .post(
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
    .catch((res) => error(res));
}

export async function postFileUpload(URL, func, formData) {
  axios
    .post(URL, formData, {
      headers: {
        Authorization:
          localStorage.getItem("token_type") +
          " " +
          localStorage.getItem("access_token"),
      },
    })
    .then((res) => func(res.data));
}

export async function postContainsData(URL, func, error, data) {
  axios
    .post(URL, data, {
      headers: {
        Authorization:
          localStorage.getItem("token_type") +
          " " +
          localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
    })
    .then((res) => func(res.data))
    .catch((res) => {
      error(res);
    });
}

export async function awitPostContainsData(URL, data) {
  let res = await axios.post(URL, data, {
    headers: {
      Authorization:
        localStorage.getItem("token_type") +
        " " +
        localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
  });
  return res.data;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function postAccess(URL, data) {
  let res;
  if (data)
    res = await axios.post(URL, data, {
      headers: {
        Authorization:
          localStorage.getItem("token_type") +
          " " +
          localStorage.getItem("access_token"),
        "Content-Type": "application/json",
      },
    });
  else
    res = await axios.post(URL, {
      headers: {
        Authorization:
          localStorage.getItem("token_type") +
          " " +
          localStorage.getItem("access_token")
      },
    });
  return res.data;
}
