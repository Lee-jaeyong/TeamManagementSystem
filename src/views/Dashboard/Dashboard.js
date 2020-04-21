import React, { useEffect } from "react";
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

import { bugs, website, server } from "variables/general.js";

import { dailySalesChart, emailsSubscriptionChart } from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard(props) {
  const classes = useStyles();

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
          <div>
            <Card>
              <CardActionArea onClick={showScheduler}>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Icon>content_copy</Icon>
                  </CardIcon>
                  <p className={classes.cardCategory}>Scheduler</p>
                  <h3 className={classes.cardTitle}>스케줄러</h3>
                  <br />
                </CardHeader>
                <CardBody>
                  <Fade in timeout={200}>
                    <FullCalendar
                      events={[
                        { title: "event 1", date: "2020-04-01" },
                        {
                          title: "이재용의 스케쥴러",
                          start: "2020-04-03",
                          end: "2020-04-06",
                          color: "red",
                        },
                      ]}
                      buttonText={{
                        today: "today",
                      }}
                      titleFormat={{ year: "numeric", month: "long" }}
                      defaultView="dayGridMonth"
                      plugins={[dayGridPlugin, interactionPlugin]}
                      titleFormat={{
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }}
                      header={{
                        left: "",
                        center: "",
                        right: "",
                      }}
                    />
                  </Fade>
                </CardBody>
                <CardFooter chart></CardFooter>
              </CardActionArea>
            </Card>
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardActionArea onClick={showScheduler}>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Todo List</p>
                    <h3 className={classes.cardTitle}>나의 TODO리스트</h3>
                    <br />
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <Store />
                      </Danger>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        일정 보기
                      </a>
                    </div>
                  </CardFooter>
                </CardActionArea>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardActionArea onClick={showReferenceData}>
                  <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                      <Store />
                    </CardIcon>
                    <p className={classes.cardCategory}>Board</p>
                    <h3 className={classes.cardTitle}>자유게시판</h3>
                    <br />
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <DateRange />
                      </Danger>
                      공지, 자료, 게시글
                    </div>
                  </CardFooter>
                </CardActionArea>
              </Card>
            </GridItem>
          </GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  style={{ height: 380 }}
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>개인별 진척도</h4>
                <p className={classes.cardCategory}>
                  팀원과 자신의 진척도를 비교할 수 있습니다.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> 내 일정에 대한 진척도 보기
                </div>
              </CardFooter>
            </Card>
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
