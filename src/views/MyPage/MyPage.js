import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Fade from "@material-ui/core/Fade";

import MyPageProject from "./Component/MyPageProject.js";
import MyAllPlan from "./Component/MyAllPlan.js";
import ShowSelectEvent from "../Canendal/components/ShowSelectEvent";
import MessageBox from "components/MessageBox/MessageBox";

import UserCard from "@commons/users/component/readOne/UserCard";
import MyTeamListCard from "@commons/team/component/readList/MyTeamListCard";
import MyAllPlanCard from '@commons/plan/component/readList/MyAllPlanCard';
import Profile from "./Component/Profile.js";
import * as axiosGet from "@axios/get";

import { getUser } from "@commons/users/methods/UserAccess";
import { getMySignUpList } from "@commons/team/methods/TeamAccess";
import { getFinishedTeamList } from "@commons/team/methods/TeamAccess";
import { useSelector, useDispatch } from "react-redux";
import { readUserOne } from "@store/actions/User/UserAction.js";
import { readMySignupList } from "@store/actions/Team/TeamAction.js";
import { readFinishedTeamList } from "@store/actions/Team/TeamAction.js";

export default function MyPage(props) {
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
  const dispatch = useDispatch();

  
  const _userInfo = useSelector((state) => state["User"]["user"]);
  const _teamList = useSelector((state) => state["Team"]["teamList"], []);
  const _mySignUpList = useSelector((state) => state["Team"]["mySignUp"]);
  const _finishedTeamList = useSelector(
    (state) => state["Team"]["finishedTeamList"]
    );
    
    const [userInfo, setUserInfo] = useState();
    const [teamList, setTeamList] = useState();
    const [mySignUpList, setMySignUpList] = useState();
    const [finishedTeamList, setFinishedTeamList] = useState();


  async function _getUser() {
    const res = await getUser();
    dispatch(readUserOne(res));
  }

  async function _getMySignUpList() {
    const res = await getMySignUpList();
    dispatch(readMySignupList(res));
  }

  async function _getFinishedTeamList() {
    const res = await getFinishedTeamList();
    dispatch(readFinishedTeamList(res));
  }

  useEffect(() => {
    _getUser();
    _getMySignUpList();
    _getFinishedTeamList();
  }, []);

  useEffect(() => {
    setUserInfo(_userInfo);
  }, [_userInfo]);

  useEffect(() => {
    setTeamList(_teamList);
  }, [_teamList]);

  useEffect(() => {
    setMySignUpList(_mySignUpList);
  }, [_mySignUpList]);

  useEffect(() => {
    setFinishedTeamList(_finishedTeamList);
  }, [_finishedTeamList]);

  const getMySignUpListSuccess = (res) => {
    let mySingUpList_ready = [];
    let notSuccessPjtList = [];
    for (let i = 0; i < res["content"].length; i++) {
      if (
        res["content"][i]["state"] === "NO" &&
        res["content"][i]["reson"] !== null
      ) {
        notSuccessPjtList.push(res["content"][i]);
      } else if (res["content"][i]["state"] === "NO") {
        mySingUpList_ready.push(res["content"][i]);
      }
    }
    setNotSuccessPjt(notSuccessPjtList);
    setMySignUpList(mySingUpList_ready);
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
              <UserCard
                {...{ userInfo }}
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
                <MyTeamListCard
                  {...{ teamList, mySignUpList, finishedTeamList }}
                  history={props.history}
                />
              </div>
            </Fade>
          </Grid>
          <Grid item md={12}>
            <Fade in {...{ timeout: 1000 }}>
              <div>
                <MyAllPlanCard
                  // selectPlan={selectEventHandle}
                  // tableData={planList}
                  // totalPage={totalPage}
                  // isFinal={totalPage - 1 === planPage}
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
              <UserCard
                {...{ userInfo }}
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
        // messageBoxHandle={messageBoxHandle}
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
