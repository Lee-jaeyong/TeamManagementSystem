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