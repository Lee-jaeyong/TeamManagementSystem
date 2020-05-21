import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import MyPageProject from "./Component/MyPageProject.js";
import MyAllPlan from "./Component/MyAllPlan.js";
import ShowSelectEvent from "../Canendal/components/ShowSelectEvent";
import MessageBox from "components/MessageBox/MessageBox";

import Profile from "./Component/Profile.js";
import * as axiosGet from "@axios/get";

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
  const [finishedPjtList, setFinishedPjtList] = useState([]);
  const [unFinishedPjtList, setUnFinishedPjtList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [planList, setPlanList] = useState([]);
  const [originPlanList, setOriginPlanList] = useState([]);
  const [planPage, setPlanPage] = useState(0);
  const [user, setUser] = useState({ id: "", name: "", email: "" });
  const [userImg, setUserImg] = useState();
  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectEvent, setSelectEvent] = useState();
  const [showSelectEventState, setShowSelectEventState] = useState(false);
  const [showMessageState, setShowMessageState] = useState(false);
  const [MessageBoxState, setMessageBoxState] = useState({
    content: "",
    level: "success",
    time: 2000,
  });

  useEffect(() => {
    unFinishedPjt();
    finishedPjt();
    getPlanList(0);
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    axiosGet.getNotContainsData(
      "http://localhost:8090/api/users",
      getUserInfoSuccess
    );
  };

  const unFinishedPjt = () => {
    axiosGet.getNotContainsData(
      "http://localhost:8090/api/teamManage",
      getUnFinishedSuccess
    );
  };

  const finishedPjt = () => {
    axiosGet.getNotContainsData(
      "http://localhost:8090/api/teamManage?flag=finished",
      getFinishedSuccess
    );
  };

  const getPlanList = (page) => {
    axiosGet.getNotContainsData(
      "http://localhost:8090/api/teamManage/plan/all?size=10&page=" + page,
      getPlanListSuccess
    );
  };

  const getUserInfoSuccess = (res) => {
    setUser(res["data"]);
    setUserImg(res["image"]);
  };

  const getPlanListSuccess = (res) => {
    setTotalPage(res["page"]["totalPages"]);
    const plan = res["content"];
    let _data = [];
    for (let i = 0; i < plan.length; i++) {
      const todoList = plan[i]["todoList"] ? plan[i]["todoList"] : [];
      let todoListSuccessCount = 0;
      for (let j = 0; j < todoList.length; j++) {
        if (todoList[j]["ing"] === "YES") {
          todoListSuccessCount++;
        }
      }
      _data.push([
        plan[i]["seq"],
        plan[i]["tag"],
        todoList.length + "중 " + todoListSuccessCount + "개 완료",
        plan[i]["start"] + " ~ " + plan[i]["end"],
      ]);
    }
    setOriginPlanList(originPlanList.concat(plan));
    setPlanList(planList.concat(_data));
    setUpdateFlag(!updateFlag);
  };

  const getUnFinishedSuccess = (res) => {
    setUnFinishedPjtList(res["content"]);
  };

  const getFinishedSuccess = (res) => {
    setFinishedPjtList(res["content"]);
  };

  const outTeam = (code) => {
    let outPjt = finishedPjtList.filter((team) => team["code"] !== code);
    setFinishedPjtList(outPjt);
    outPjt = unFinishedPjtList.filter((team) => team["code"] !== code);
    setUnFinishedPjtList(outPjt);
  };

  const planPageMove = () => {
    getPlanList(planPage + 1);
    setPlanPage(planPage + 1);
  };

  const messageBoxHandle = (show, content, time, level) => {
    setShowMessageState(show);
    setMessageBoxState({
      content: content,
      time: time,
      level: level,
    });
  };

  const selectEventHandle = (seq) => {
    for (let i = 0; i < originPlanList.length; i++) {
      if (originPlanList[i]["seq"] === seq) {
        setSelectEvent(originPlanList[i]);
        setShowSelectEventState(true);
        return;
      }
    }
  };

  function updatePlanList(value) {
    for (let i = 0; i < originPlanList.length; i++) {
      if (originPlanList[i]["seq"] === value["seq"]) {
        originPlanList[i] = {
          ...originPlanList[i],
          title: value["tag"],
          start: value["start"],
          end: value["end"],
        };
        planList[i][1] = value["tag"];
        planList[i][3] = value["start"] + "~" + value["end"];
      }
    }
  }

  function changeIng(value) {
    let _originPlanList = originPlanList;
    let _data = [];
    for (let i = 0; i < originPlanList.length; i++) {
      const todoList = originPlanList[i]["todoList"];
      let todoListSuccessCount = 0;
      for (let j = 0; j < todoList.length; j++) {
        if (value["seq"] === todoList[j]["seq"]) {
          todoList[j] = value;
          _originPlanList[i]["todoList"] = todoList;
        }
        if (todoList[j]["ing"] === "YES") {
          todoListSuccessCount++;
        }
      }
      _data.push([
        _originPlanList[i]["seq"],
        _originPlanList[i]["tag"],
        todoList.length + "중 " + todoListSuccessCount + "개 완료",
        _originPlanList[i]["start"] + " ~ " + _originPlanList[i]["end"],
      ]);
    }
    setPlanList(_data);
    setOriginPlanList(_originPlanList);
    setUpdateFlag(!updateFlag);
  }

  const updateImage = (image, name) => {
    setUser({ ...user, img: name });
    setUserImg(image);
  };

  return (
    <Grid container style={{ padding: 20 }} spacing={5}>
      <Hidden only={["lg", "md", "xl", "sm"]}>
        <Grid item md={4} sm={4} xs={12}>
          <Profile
            updateImage={updateImage}
            originImage={user["img"]}
            history={props["history"]}
            userName={user["name"]}
            userId={user["id"]}
            userEmail={user["email"]}
            userImgSrc={userImg}
          />
        </Grid>
      </Hidden>
      <Grid item md={8} sm={8} xs={12}>
        <Grid container>
          <Grid item md={12}>
            <MyPageProject
              history={props["history"]}
              joinProject={unFinishedPjtList} //참여중인프로젝트
              unfinishedProject={finishedPjtList} //진행중인프로젝트
              outTeam={outTeam}
            />
          </Grid>
          <Grid item md={12}>
            <MyAllPlan
              selectPlan={selectEventHandle}
              tableData={planList}
              totalPage={totalPage}
              pageMove={planPageMove}
              isFinal={totalPage - 1 === planPage}
            />
          </Grid>
        </Grid>
      </Grid>
      <Hidden only="xs">
        <Grid item md={4} sm={4} xs={12}>
          <Profile
            updateImage={updateImage}
            originImage={user["img"]}
            history={props["history"]}
            userName={user["name"]}
            userId={user["id"]}
            userEmail={user["email"]}
            userImgSrc={userImg}
          />
        </Grid>
      </Hidden>
      <ShowSelectEvent
        changeIng={changeIng}
        messageBoxHandle={messageBoxHandle}
        updatePlanList={updatePlanList}
        event={selectEvent}
        open={showSelectEventState}
        handleClose={() => setShowSelectEventState(false)}
      />
      <MessageBox
        open={showMessageState}
        content={MessageBoxState["content"]}
        level={MessageBoxState["level"]}
        time={MessageBoxState["time"]}
        handleClose={() => setShowMessageState(false)}
      />
    </Grid>
  );
}
