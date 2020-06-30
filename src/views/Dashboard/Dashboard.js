import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import TodoListSection from "./component/TodoList";
import FreeBoardSection from "./component/FreeBoard";
import ChartSection from "./component/ChartSection";
import SignUpListSection from "./component/SignUpList";
import Fade from "@material-ui/core/Fade";

import TeamInfo from "@commons/team/component/readOne/TeamInfo";
import SchedulerSection from "./component/SchedulerSection";
import ProgressChartSection from "./component/ProgressChartSection";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import { getTeam } from "@commons/team/methods/TeamAccess";
import { readTeamOneHandle } from "@store/actions/Team/TeamAction";

import {
  getPlanList,
  getPlanCount,
  getPlanProgress,
} from "@commons/plan/methods/PlanAccess";

import {
  readPlanListHandle,
  readPlanListCountHandle,
  readPlanListProgressHandle,
} from "@store/actions/Plan/PlanAction";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [teamInfo, setTeamInfo] = useState();

  const _teamInfo = useSelector((state) => state["Team"]["team"]);
  const _planList = useSelector((state) => state["Plan"]["planList"]);
  const _planListCount = useSelector((state) => state["Plan"]["planListCount"]);
  const _planListProgress = useSelector(
    (state) => state["Plan"]["planProgress"]
  );
  const [plan, setPlan] = useState([]);
  const [chartData, setChartData] = useState([]);

  async function _getPlanList() {
    let now = new Date();
    let data = {
      size: 100,
      page: 0,
    };
    const planList = await getPlanList(props.match.params.idx, data);
    const planCount = await getPlanCount(props.match.params.idx);
    const allProgress = await getPlanProgress(props.match.params.idx);

    dispatch(readPlanListProgressHandle(allProgress));
    dispatch(readPlanListCountHandle(planCount["content"]));
    dispatch(readPlanListHandle(planList["content"]));
  }

  async function getTeamInfo(data) {
    let res = await getTeam(data);
    dispatch(readTeamOneHandle(res));
  }

  const showTotoList = () => {
    dispatch(readPlanListHandle([]));
    props["history"].push("/admin/todoList/" + props.match.params.idx);
  };

  const showScheduler = () => {
    dispatch(readPlanListHandle([]));
    props["history"].push("/admin/scheduler/" + props.match.params.idx);
  };

  const showReferenceData = () => {
    props["history"].push("/admin/referenceData/" + props.match.params.idx);
  };

  useEffect(() => {
    setPlan(_planList);
    setChartData(_planListCount);
  }, [_planList]);

  useEffect(() => {
    setTeamInfo(_teamInfo);
  }, [_teamInfo]);

  useEffect(() => {
    _getPlanList();
    setTeamInfo(null);
    setPlan(null);
    getTeamInfo(props.match.params.idx);
  }, [props.match.params.idx]);

  return !teamInfo ? (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Fade in timeout={500}>
          <div>
            <TeamInfo updateTeamInfo={getTeamInfo} teamInfo={teamInfo} />
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
                  <ChartSection
                    planChartData={_planList}
                    progressData={_planListProgress}
                    data={chartData}
                  />
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
                  <ChartSection
                    planChartData={_planList}
                    progressData={_planListProgress}
                    data={chartData}
                  />
                </GridItem>
              </div>
            </Fade>
          </GridItem>
        )
      ) : null}
    </GridContainer>
  );
}
