import axios from "axios";

const accessToken = (res, user) => {
  localStorage.setItem("access_token", res["access_token"]);
  localStorage.setItem("token_type", res["token_type"]);
  localStorage.setItem("expires_in", res["expires_in"]);
  localStorage.setItem("refresh_token", res["refresh_token"]);
  localStorage.setItem("ID", user["id"]);
};

export async function getAccessToken(user, callBack, error) {
  axios.defaults.headers.common["Authorization"] = "Basic S01hcHA6cGFzcw==";
  axios
    .post(
      "http://192.168.43.179:8090/oauth/token?grant_type=password&username=" +
        user.id +
        "&password=" +
        user.pass +
        "",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((res) => {
      accessToken(res["data"], user);
      callBack(res["data"], callBack);
      setTimeout(() => {
        alert('로그인 기한이 만료되었습니다. 로그인 화면으로 돌아갑니다.');
        localStorage.setItem("access_token", "");
        localStorage.setItem("token_type", "");
        localStorage.setItem("expires_in", "");
        localStorage.setItem("refresh_token", "");
        localStorage.setItem("ID", "");
        window.location.href="http://192.168.43.179:3000/login";
      }, res["data"]["expires_in"] * 1000);
    })
    .catch((res) => {
      error();
    });
}

export async function revokeToken() {
  axios.get("http://192.168.43.179:8090/api/users/oauth/revoke-token", {
    headers: {
      Authorization: localStorage.getItem("access_token"),
    },
  });
}
