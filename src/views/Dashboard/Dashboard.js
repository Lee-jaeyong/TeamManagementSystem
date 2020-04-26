import React, { useEffect,useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";

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

import { bugs, website, server } from "variables/general.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import * as axiosGet from '@axios/get';

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const classes = useStyles();

  const [signUpList,setSignUplist] = useState(false);
  const [plan,setPlan] = useState([]);

  useEffect(() => {

  }, [props.match.params.idx]);

  const updatePlan = () => {
    axiosGet.getNotContainsData("http://localhost:8090/api/teamManage/plan/"+props.match.params.idx+"/all",getPlanSuccess)
  }

  const getPlanSuccess = (res) => {
    if(!res['_embedded']){
      setPlan([]);
      return;
    }
    const content = res['_embedded']['planByUserList'];
    let planList = [];
    for(let i =0;i<content.length;i++){
      planList.push(
        parsePlan(content[i])
      );
    }
    setPlan(planList);
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
    updatePlan();
  },[props.match.params.idx]);

  return (
    <div id="section">
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <SchedulerSection plan={plan} onClick={showScheduler}/>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <TodoListSection onClick={showTotoList}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <FreeBoardSection onClick={showReferenceData}/>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <SignUpListSection location={props}/>
            </GridItem>
          </GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <ChartSection/>
          </GridItem>
        </GridItem>
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
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "참고자료",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                ),
              },
              {
                tabName: "자유게시판",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}
