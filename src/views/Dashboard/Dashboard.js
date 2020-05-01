import React, { useEffect,useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import SchedulerSection from './component/Scheduler';
import TodoListSection from './component/TodoList';
import FreeBoardSection from './component/FreeBoard';
import ChartSection from './component/ChartSection';
import SignUpListSection from './component/SignUpList';
import TeamInfoSection from './component/TeamInfo';

import {  website, server } from "variables/general.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import * as axiosGet from '@axios/get';

const useStyles = makeStyles(styles);


export default function Dashboard(props) {
  const classes = useStyles();
  const [todayPlan,setTodayPlan] = useState([]);
  const [todayPlanCount,setTodayPlanCount] = useState([]);
  const [teamInfo,setTeamInfo] = useState();
  const [signUpList,setSignUplist] = useState(false);
  const [plan,setPlan] = useState([]);

  const [referenceDataList,setReferenceDataList] = useState([]);
  const [referenceDataCount,setReferenceDataCount] = useState([]);

  const [freeBoardList,setFreeBoardList] = useState([]);
  const [freeBoardCount,setFreeBoardCount] = useState([]);

  const [chartData,setChartData] = useState([]);
  
  useEffect(() => {
  }, [props.match.params.idx]);

  const getReferenceData = () => {
    const data = {
      page : 0,
      size : 5
    }
    axiosGet.getContainsData("http://localhost:8090/api/teamManage/referenceData/"+props.match.params.idx+"/all",getReferenceDataSuccess,data,true);
  }

  const getReferenceDataSuccess = (res) => {
    if(!res['_embedded']){
      setReferenceDataCount([]);
      setReferenceDataList([]);
      return;
    }
    const data = res['_embedded']['referenceDataList'];
    let resultArr = [];
    let resultCount = [];
    for(let i =0;i<data.length;i++){
      resultArr.push([data[i]['title']]);
      resultCount.push(i);
    }
    setReferenceDataList(resultArr);
    setReferenceDataCount(resultCount);
  }
  
  const getFreeBoard = () => {
    const data = {
      page : 0,
      size : 5
    }
    axiosGet.getContainsData("http://localhost:8090/api/teamManage/freeBoard/"+props.match.params.idx+"/all",getFreeBoardSuccess,data,true);
  }
  
  const getFreeBoardSuccess = (res) => {
    if(!res['_embedded']){
      setFreeBoardCount([]);
      setFreeBoardList([]);
      return;
    }
    const data = res['_embedded']['freeBoardList'];
    let resultArr = [];
    let resultCount = [];
    for(let i =0;i<data.length;i++){
      resultArr.push([data[i]['title']]);
      resultCount.push(i);
    }
    setFreeBoardList(resultArr);
    setFreeBoardCount(resultCount);  
  }

  const updatePlan = () => {
    let page = {
      year : new Date().getFullYear(),
      month : new Date().getMonth() + 1,
      day : new Date().getDate()
    }
    axiosGet.getContainsData("http://localhost:8090/api/teamManage/plan/"+props.match.params.idx+"/search/all",getPlanSuccess,page,true);
    getTeamInfo();
    axiosGet.getNotContainsData("http://localhost:8090/api/teamManage/plan/" + props.match.params.idx + "/group-by-user",getChartGroupByUserSuccess);
  }

  const getTeamInfo = () => {
    axiosGet.getNotContainsData("http://localhost:8090/api/teamManage/"+props.match.params.idx,getTeamSuccess);
  }

  const getChartGroupByUserSuccess = (res) => {
    setChartData(res);
  }

  const getTeamSuccess = (res) => {
    setTeamInfo(res);
  }

  const getPlanSuccess = (res) => {
    if(!res['_embedded']){
      setPlan([]);
      setTodayPlan([]);
      setTodayPlanCount([]);
      return;
    }
    const content = res['_embedded']['planByUserList'];
    let planList = [];
    let _todayPlan = [];
    let _todayPlanCount = [];
    let count = 0;
    
    for(let i =0;i<content.length;i++){
      planList.push(
        parsePlan(content[i])
      );
      if(_todayPlan.length < 5 && content[i]['user']['id'] === localStorage.getItem('ID')){
        _todayPlan.push(content[i]['content']);
        _todayPlanCount.push(count++);
      }
    }
    setPlan(planList);
    setTodayPlan(_todayPlan);
    setTodayPlanCount(_todayPlanCount);
  }

  const parsePlan = (plan) => {
    let colors = ['#D9418C','#D941C5','#8041D9','#6B66FF','#99004C','#747474'];
    return {
      groupId:plan['seq'],
      title:plan['tag'],
      start:plan['start'],
      end:plan['end'],
      user:plan['user'],
      progress:plan['progress'],
      content : plan['content'],
      color : colors[plan['seq'] % colors.length]
    }
  }

  const showTotoList = () => {
    props["history"].push("/admin/todoList/" + props.match.params.idx);
  }

  const showScheduler = () => {
    props["history"].push("/admin/scheduler/" + props.match.params.idx);
  };

  const showReferenceData = () => {
    props["history"].push("/admin/referenceData/" + props.match.params.idx);
  };

  useEffect(()=>{
    setTeamInfo(null);
    setTimeout(() => {
      updatePlan();
      getReferenceData();
      getFreeBoard();
    }, 1000);
  },[props.match.params.idx]);

  return (
    !teamInfo ? (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="primary" />
      </Backdrop>
    ) : 
    (
    <div id="section">
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <TeamInfoSection updateTeamInfo={getTeamInfo} teamInfo={teamInfo}/>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <SchedulerSection plan={plan} onClick={showScheduler}/>
        </GridItem>
          {teamInfo ? teamInfo['teamLeader']['id'] === localStorage.getItem('ID') ? (
            <GridItem xs={12} sm={12} md={6}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <TodoListSection onClick={showTotoList}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <FreeBoardSection onClick={showReferenceData}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <SignUpListSection teamLeader={teamInfo ? teamInfo['teamLeader']['id'] : null} code={props.match.params.idx} location={props}/>
                </GridItem>
              </GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <ChartSection data={chartData}/>
              </GridItem>
            </GridItem>
          ) : (
            <GridItem xs={12} sm={12} md={6}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TodoListSection onClick={showTotoList}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <FreeBoardSection onClick={showReferenceData}/>
                </GridItem>
              </GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <ChartSection data={chartData}/>
              </GridItem>
            </GridItem>
          ) : null}
        </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title=""
            tabs={[
              {
                tabName: "오늘 일정",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={todayPlanCount}
                    tasks={todayPlan}
                  />
                ),
              },
              {
                tabName: "참고자료",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={referenceDataCount}
                    tasks={referenceDataList}
                  />
                ),
              },
              {
                tabName: "자유게시판",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[]}
                    tasksIndexes={freeBoardCount}
                    tasks={freeBoardList}
                  />
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
    )
  );
}
