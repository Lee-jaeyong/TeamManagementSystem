import React, { useState, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ProgressChart from '@commons/plan/component/readList/ProgressChart';

const useStyles = makeStyles(styles);

const ProgressChartSection = memo(({ data }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("일정 분포도");
  const [content, setContent] = useState(
    "팀의 일정 분포도를 확인할 수 있습니다."
  );
  const [value, setValue] = useState(0);

  const printChart = () => {
    window.frames[
      "progressChartPrint"
    ].document.body.innerHTML = document.getElementById("progressChartSection").innerHTML;
    window.frames["progressChartPrint"].print();
  };
  console.log(data);
  return (
    <Card chart>
      <CardHeader color={value === 0 ? "primary" : "success"}>
        <div id="progressChartSection">
          <ProgressChart data={data} />
        </div>
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{title ? title : null}</h4>
        <p className={classes.cardCategory}>
          {content ? content : null}
          <Button
            onClick={printChart}
            style={{ marginLeft: 30 }}
            size="small"
            variant="outlined"
            color="primary"
          >
            차트 인쇄
          </Button>
        </p>
        <Divider style={{ marginTop: 7, marginBottom: 0 }} />
      </CardBody>
    </Card>
  );
});

export default ProgressChartSection;
