import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Fade from "@material-ui/core/Fade";

import MyPageProject from "./Component/MyPageProject.js";
import MyAllPlan from "./Component/MyAllPlan.js";
import ShowSelectEvent from "../Canendal/components/ShowSelectEvent";
import MessageBox from "components/MessageBox/MessageBox";

import Profile from "./Component/Profile.js";
import * as axiosGet from "@axios/get";

export default function MyPage(props) {
  const [finishedPjtList, setFinishedPjtList] = useState([]);
  const [unFinishedPjtList, setUnFinishedPjtList] = useState([]);
  const [mySignUpList, setMySignUpList] = useState([]);
  const [notSuccessPjt, setNotSuccessPjt] = useState([]);

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
    getMySignUpList();
    getPlanList(0);
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    axiosGet.getNotContainsData(
      "http://172.30.1.37:8090/api/users",
      getUserInfoSuccess
    );
  };

  const unFinishedPjt = () => {
    axiosGet.getNotContainsData(
      "http://172.30.1.37:8090/api/teamManage",
      getUnFinishedSuccess
    );
  };

  const getMySignUpList = () => {
    axiosGet.getNotContainsData(
      "http://172.30.1.37:8090/api/teamManage/signUpList",
      getMySignUpListSuccess
    );
  };

  const getMySignUpListSuccess = (res) => {
    let mySingUpList_ready = [];
    let notSuccessPjtList = [];
    for (let i = 0; i < res["content"].length; i++) {
      if(res['content'][i]['state'] === 'NO' && res['content'][i]['reson'] !== null){
        notSuccessPjtList.push(res['content'][i]);
      }else if(res['content'][i]['state'] === 'NO'){
        mySingUpList_ready.push(res['content'][i]);
      }
    }
    setNotSuccessPjt(notSuccessPjtList);
    setMySignUpList(mySingUpList_ready);
  };

  const finishedPjt = () => {
    axiosGet.getNotContainsData(
      "http://172.30.1.37:8090/api/teamManage?flag=finished",
      getFinishedSuccess
    );
  };

  const getPlanList = (page) => {
    axiosGet.getNotContainsData(
      "http://172.30.1.37:8090/api/teamManage/plan/all?size=10&page=" + page,
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
          <Fade in {...{ timeout: 1000 }}>
            <div>
              <Profile
                updateImage={updateImage}
                originImage={user["img"]}
                history={props["history"]}
                userName={user["name"]}
                userId={user["id"]}
                userEmail={user["email"]}
                userImgSrc={userImg}
              />
            </div>
          </Fade>
        </Grid>
      </Hidden>
      <Grid item md={8} sm={8} xs={12}>
        <Grid container>
          <Grid item md={12}>
            <Fade in {...{ timeout: 1000 }}>
              <div>
                <MyPageProject
                  messageBoxHandle={messageBoxHandle}
                  history={props["history"]}
                  notSuccessPjt={notSuccessPjt}
                  mySignUpList={mySignUpList}
                  joinProject={unFinishedPjtList} //참여중인프로젝트
                  unfinishedProject={finishedPjtList} //진행중인프로젝트
                  outTeam={outTeam}
                />
              </div>
            </Fade>
          </Grid>
          <Grid item md={12}>
            <Fade in {...{ timeout: 1000 }}>
              <div>
                <MyAllPlan
                  selectPlan={selectEventHandle}
                  tableData={planList}
                  totalPage={totalPage}
                  pageMove={planPageMove}
                  isFinal={totalPage - 1 === planPage}
                />
              </div>
            </Fade>
          </Grid>
        </Grid>
      </Grid>
      <Hidden only="xs">
        <Grid item md={4} sm={4} xs={12}>
          <Fade in {...{ timeout: 1000 }}>
            <div>
              <Profile
                updateImage={updateImage}
                originImage={user["img"]}
                history={props["history"]}
                userName={user["name"]}
                userId={user["id"]}
                userEmail={user["email"]}
                userImgSrc={userImg}
              />
            </div>
          </Fade>
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
