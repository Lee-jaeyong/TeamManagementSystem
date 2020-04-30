import React from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import MyPageProject from "./Component/MyPageProject.js";
import MyAllPlan from "./Component/MyAllPlan.js";

import Profile from "./Component/Profile.js";

const mockData = {
  name: "이재용",
  imgSrc: "/images/yunjiwon.png",
  userId: "jiwon1332",
  userEmail: "jiwon_3261@naver.com",
  ingProject_1: [
    {
      project: "C언어 프로젝트",
      userImgs: [
        "/images/yunjiwon.png",
        "/images/dlwodyd.png",
        "/images/sidebar-2.jpg",
        "/images/sidebar-2.jpg",
        "/images/sidebar-2.jpg",
        "/images/sidebar-2.jpg",
      ],
    },
    {
      project: "자바 프로젝트",
      userImgs: [
        "/images/sidebar-1.jpg",
        "/images/yunjiwon.png",
        "/images/sidebar-3.jpg",
      ],
    },
    {
      project: "3-1 튜터링",
      userImgs: [
        "/images/dlwodyd.png",
        "/images/yunjiwon.png",
        "/images/sidebar-5.jpg",
      ],
    },
  ],
  ingProject_2: [
    {
      project: "스프링 프레임워크",
      userImgs: [
        "/images/sidebar-2.jpg",
        "/images/dlwodyd.png",
        "/images/sidebar-3.jpg",
      ],
    },
    {
      project: "팀관리 시스템 프로젝트",
      userImgs: [
        "/images/yunjiwon.png",
        "/images/dlwodyd.png",
        "/images/sidebar-4.jpg",
      ],
    },
  ],
  endingProject_1: [
    {
      project: "비주얼 베이직 모임",
      userImgs: [
        "/images/dlwodyd.png",
        "/images/yunjiwon.png",
        "/images/sidebar-5.jpg",
      ],
    },
    {
      project: "도서관리 프로그램",
      userImgs: [
        "/images/sidebar-2.jpg",
        "/images/dlwodyd.png",
        "/images/sidebar-3.jpg",
      ],
    },
    {
      project: "체플 참석 모임",
      userImgs: [
        "/images/yunjiwon.png",
        "/images/dlwodyd.png",
        "/images/sidebar-2.jpg",
      ],
    },
  ],
  endingProject_2: null,
};

export default function MyPage(props) {
  return (
    <Grid container style={{ padding: 20 }} spacing={5}>
      <Hidden only={["lg", "md", "xl", "sm"]}>
        <Grid item md={4} sm={4} xs={12}>
          <Profile
            history={props["history"]}
            userName={mockData.name}
            userId={mockData.userId}
            userEmail={mockData.userEmail}
            userImgSrc={mockData.imgSrc}
          />
        </Grid>
      </Hidden>
      <Grid item md={8} sm={8} xs={12}>
        <Grid container>
          <Grid item md={12}>
            <MyPageProject
              joinProject={mockData.ingProject_1}
              unfinishedProject={mockData.ingProject_2}
              finishedProject={mockData.endingProject_1}
              outProject={mockData.endingProject_2}
            />
          </Grid>
          <Grid item md={12}>
            <MyAllPlan />
          </Grid>
        </Grid>
      </Grid>
      <Hidden only="xs">
        <Grid item md={4} sm={4} xs={12}>
          <Profile
            history={props["history"]}
            userName={mockData.name}
            userId={mockData.userId}
            userEmail={mockData.userEmail}
            userImgSrc={mockData.imgSrc}
          />
        </Grid>
      </Hidden>
    </Grid>
  );
}
