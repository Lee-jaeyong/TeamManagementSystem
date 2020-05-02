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
  allPlan: [
    ["C언어 프로젝트", "포인터 공부해오기", "14%", "2020.04.16 ~ 2020.04.20"],
    ["C언어 프로젝트", "구조체 예습하기^^", "100%", "2020.04.01 ~ 2020.04.04"],
    [
      "JAVA 프로젝트",
      "배열에 관하여 레포트 작성하기",
      "26%",
      "2020.04.20 ~ 2020.04.30",
    ],
    [
      "Spring team",
      "빈의 생성주기? 공부해오기",
      "59%",
      "2020.04.16 ~ 2020.04.20",
    ],
    ["C언어 프로젝트", "포인터 공부해오기", "14%.", "2020.04.16 ~ 2020.04.20"],
    [
      "JAVA 프로젝트",
      "소켓으로 케케오톡만들기",
      "39%.",
      "2020.06.01 ~ 2020.06.10",
    ],
  ],
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
              joinProject={mockData.ingProject_1} //참여중인프로젝트
              unfinishedProject={mockData.ingProject_2} //진행중인프로젝트
              finishedProject={mockData.endingProject_1} //마감된 프로젝트
              outProject={mockData.endingProject_2} //탈퇴한 프로젝트
            />
          </Grid>
          <Grid item md={12}>
            <MyAllPlan tableData={mockData.allPlan} />
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
