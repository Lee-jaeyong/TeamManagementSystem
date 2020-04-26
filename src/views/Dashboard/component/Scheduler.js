import React, { useEffect,useState } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { CardActionArea } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Fade from "@material-ui/core/Fade";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const mockData = [
  {"seq" : 1,
  "tag" : "4주차 wiringPi( ) 함수-디지털 입력",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-01",
  "end" : "2020-4-10",
  "teamPlan" : null,
  "progress" : 0},
  {"seq" : 2,
  "tag" : "4주차 강의자료 입니다 참고하세요",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-05",
  "end" : "2020-04-10",
  "teamPlan" : null,
  "progress" : 0},
  {"seq" : 4,
  "tag" : "오늘 수업은 1시부터 실시간 수업으로 진행할 예정입니다",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-11",
  "end" : "2020-04-13",
  "teamPlan" : null,
  "progress" : 0},
  {"seq" : 5,
  "tag" : "자세한 사항은 수업에서 다시 설명하겠습니다",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-20",
  "end" : "2020-04-25",
  "teamPlan" : null,
  "progress" : 0},
  {"seq" : 6,
  "tag" : "여기 게시판이 아닌 수업 게시판에 링크를 공지하겠습니다",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-17",
  "end" : "2020-04-25",
  "teamPlan" : null,
  "progress" : 0},
  {"seq" : 7,
  "tag" : "안녕하세요 학생 여러분 코로나 사태가 지속되면서 온라인 비대면 수업도 이어지고 있네요",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-30",
  "end" : "2020-05-10",
  "teamPlan" : null,
  "progress" : 0},
  {"seq" : 9,
  "tag" : "오늘도 열공 하길 바랍니다",
  "content" : "수정한 콘텐츠",
  "start" : "2020-04-03",
  "end" : "2020-04-10",
  "teamPlan" : null,
  "progress" : 0},
]

export default function Scheduler(props){
    const classes = useStyles();
    const {onClick} = props;

    useEffect(()=>{
    },[props['plan']]);

    const parsePlan = (plan) => {
      let colors = ['#D9418C','#D941C5','#8041D9','#6B66FF','#99004C','#747474'];
      return {
        title:plan['tag'],
        start:plan['start'],
        end:plan['end'],
        color : colors[plan['seq'] % colors.length]
      }
    }

    return (
        <div>
            <Card>
              <CardActionArea onClick={onClick}>
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
                      events={props['plan']}
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
    )
}