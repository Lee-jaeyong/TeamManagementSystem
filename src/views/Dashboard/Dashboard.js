import React, { useEffect,useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import { CardActionArea } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Paper from "@material-ui/core/Paper";
import Cloud from "@material-ui/icons/Cloud";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Fade from "@material-ui/core/Fade";

import SchedulerSection from './component/Scheduler';
import TodoListSection from './component/TodoList';
import FreeBoardSection from './component/FreeBoard';
import ChartSection from './component/ChartSection';
import SignUpListSection from './component/SignUpList';

import { bugs, website, server } from "variables/general.js";

import { dailySalesChart, emailsSubscriptionChart } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const classes = useStyles();

  const [signUpList,setSignUplist] = useState(false);

  useEffect(() => {}, [props.match.params.idx]);

  const showSearchResult = () => {
    props["history"].push("/admin/search");
  };

  const showScheduler = () => {
    props["history"].push("/admin/scheduler/" + props.match.params.idx);
  };

  const showReferenceData = () => {
    props["history"].push("/admin/referenceData/" + props.match.params.idx);
  };

  const showNotice = () => {
    props["history"].push("/admin/notice/" + props.match.params.idx);
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <SchedulerSection onClick={showScheduler}/>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <TodoListSection onClick={showScheduler}/>
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
