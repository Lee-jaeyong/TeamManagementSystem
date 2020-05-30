import React, { memo } from "react";
import Scheduler from "@commons/plan/component/readList/Scheduler";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { CardActionArea } from "@material-ui/core";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

const SchedulerSection = memo(({onClick,plan}) => {
const classes = useStyles();

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
            <Scheduler {...{plan}}/>
          </CardBody>
          <CardFooter chart></CardFooter>
        </CardActionArea>
      </Card>
    </div>
  );
});

export default SchedulerSection;
