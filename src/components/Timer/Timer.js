import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";

export default function Timer() {
  const [timer, setTimer] = useState();
  useEffect(() => {
    setTimer(localStorage.getItem("expires_in"));
    let origin = localStorage.getItem("expires_in");
    setInterval(() => {
        let time = origin--;
        localStorage.setItem("expires_in",time);
        setTimer(time - 1);
    }, 1000);
  }, []);
  return (
    <TextField
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
      value={"자동 로그아웃 : " + timer + " 초 남음"}
      disabled
      size="small"
      style={{ marginRight: 20, marginTop: 5, width: 280 }}
      variant="outlined"
    />
  );
}
