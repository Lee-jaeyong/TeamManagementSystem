import React from "react";
import Grid from "@material-ui/core/Grid";

import MyPageProject from "./Component/MyPageProject.js";

import Profile from "./Component/Profile.js";

export default function MyPage(props) {
  return (
    <Grid container style={{ padding: 20 }} spacing={5}>
      <Grid item md={4} sm={4} xs={12}>
        {/* 프롭스 만들기 */}
        <Profile />
      </Grid>
      <Grid item md={8} sm={8} xs={12}>
        <Grid container>
          <Grid item md={12}>
            <MyPageProject />
          </Grid>
          <Grid item md={12}>
            <MyPageProject />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
