import React, { useState, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Divider from "@material-ui/core/Divider";
import GroupByUserChart from "@commons/plan/component/readList/GroupByUserChart";

const useStyles = makeStyles(styles);

const ChartSection = memo(({ data }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("개인별 일정수");
  const [content, setContent] = useState(
    "팀원과 자신의 일정수를 비교할 수 있습니다."
  );
  const [value, setValue] = useState(0);

  return (
    <Card chart>
      <CardHeader color={value === 0 ? "warning" : "success"}>
        <GroupByUserChart data={data} />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{title ? title : null}</h4>
        <p className={classes.cardCategory}>{content ? content : null}</p>
        <Divider style={{ marginTop: 7, marginBottom: 0 }} />
      </CardBody>
    </Card>
  );
});

export default ChartSection;
