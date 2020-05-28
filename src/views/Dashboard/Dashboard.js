import React, { useEffect, useState } from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import SchedulerSection from "./component/Scheduler";
import TodoListSection from "./component/TodoList";
import FreeBoardSection from "./component/FreeBoard";
import ChartSection from "./component/ChartSection";
import SignUpListSection from "./component/SignUpList";
import TeamInfoSection from "./component/TeamInfo";
import Grow from "@material-ui/core/Grow";
import Fade from "@material-ui/core/Fade";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import * as axiosGet from "@axios/get";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const classes = useStyles();
  const [todayPlan, setTodayPlan] = useState([]);
  const [todayPlanCount, setTodayPlanCount] = useState([]);
  const [teamInfo, setTeamInfo] = useState();
  const [joinListImg, setJoinListImg] = useState();

  const [plan, setPlan] = useState([]);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {}, [props.match.params.idx]);

  const updatePlan = () => {
    let now = new Date();
    let page = {
      date:
        now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(),
      size: 100,
      page: 0,
    };
    axiosGet.getContainsData(
      "http://172.30.1.37:8090/api/teamManage/plan/" +
        props.match.params.idx +
        "/search/all",
      getPlanSuccess,
      page,
      true
    );
    getTeamInfo();
    axiosGet.getNotContainsData(
      "http://172.30.1.37:8090/api/teamManage/plan/" +
        props.match.params.idx +
        "/group-by-user",
      getChartGroupByUserSuccess
    );
  };

  const getTeamInfo = () => {
    axiosGet.getNotContainsData(
      "http://172.30.1.37:8090/api/teamManage/" + props.match.params.idx,
      getTeamSuccess
    );
  };

  const getChartGroupByUserSuccess = (res) => {
    setChartData(res);
  };

  const getTeamSuccess = (res) => {
    setTeamInfo(res["data"]);
    setJoinListImg(res["images"]);
  };

  const getPlanSuccess = (res) => {
    if (!res["content"]) {
      setPlan([]);
      setTodayPlan([]);
      setTodayPlanCount([]);
      return;
    }
    const content = res["content"];
    let planList = [];
    let _todayPlan = [];
    let _todayPlanCount = [];
    let count = 0;

    for (let i = 0; i < content.length; i++) {
      planList.push(
        parsePlan(
          content[i],
          content[i]["user"]["name"],
          content[i]["user"]["id"] === localStorage.getItem("ID")
        )
      );
      if (
        _todayPlan.length < 5 &&
        content[i]["user"]["id"] === localStorage.getItem("ID")
      ) {
        _todayPlan.push(content[i]["content"]);
        _todayPlanCount.push(count++);
      }
    }
    setPlan(planList);
    setTodayPlan(_todayPlan);
    setTodayPlanCount(_todayPlanCount);
  };

  const parsePlan = (plan, name, isMyPlan) => {
    let colors = [
      "#D9418C",
      "#D941C5",
      "#8041D9",
      "#6B66FF",
      "#99004C",
      "#747474",
    ];
    return {
      groupId: plan["seq"],
      title: plan["tag"] + " < " + name + " > ",
      start: plan["start"],
      end: plan["end"],
      user: plan["user"],
      progress: plan["progress"],
      content: plan["content"],
      color: isMyPlan ? "red" : colors[plan["seq"] % colors.length],
    };
  };

  const showTotoList = () => {
    props["history"].push("/admin/todoList/" + props.match.params.idx);
  };

  const showScheduler = () => {
    props["history"].push("/admin/scheduler/" + props.match.params.idx);
  };

  const showReferenceData = () => {
    props["history"].push("/admin/referenceData/" + props.match.params.idx);
  };

  useEffect(() => {
    setTeamInfo(null);
    setPlan(null);
    updatePlan();
  }, [props.match.params.idx]);

  return !teamInfo || !plan ? (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <div id="section">
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Fade in timeout={500}>
            <div>
              <TeamInfoSection
                joinListImg={joinListImg}
                updateTeamInfo={getTeamInfo}
                teamInfo={teamInfo}
              />
            </div>
          </Fade>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Fade in timeout={900}>
            <div>
              <SchedulerSection plan={plan} onClick={showScheduler} />
            </div>
          </Fade>
        </GridItem>
        {teamInfo ? (
          teamInfo["teamLeader"]["id"] === localStorage.getItem("ID") ? (
            <GridItem xs={12} sm={12} md={6}>
              <Fade in timeout={1300}>
                <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TodoListSection onClick={showTotoList} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <FreeBoardSection onClick={showReferenceData} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <SignUpListSection
                        teamLeader={
                          teamInfo ? teamInfo["teamLeader"]["id"] : null
                        }
                        code={props.match.params.idx}
                        location={props}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <ChartSection data={chartData} />
                  </GridItem>
                </div>
              </Fade>
            </GridItem>
          ) : (
            <GridItem xs={12} sm={12} md={6}>
              <Fade in timeout={700}>
                <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <TodoListSection onClick={showTotoList} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <FreeBoardSection onClick={showReferenceData} />
                    </GridItem>
                  </GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <ChartSection data={chartData} />
                  </GridItem>
                </div>
              </Fade>
            </GridItem>
          )
        ) : null}
      </GridContainer>
    </div>
  );
}
