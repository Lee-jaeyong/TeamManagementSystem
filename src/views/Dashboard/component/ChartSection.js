import React, { useState, memo } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import GroupByUserChart from "@commons/plan/component/readList/GroupByUserChart";
import ProgressChart from "@commons/plan/component/readList/ProgressChart";
import PlanChart from "@commons/plan/component/readList/PlanChart";
import { Fade } from "@material-ui/core";

const useStyles = makeStyles(styles);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ChartSection = memo(({ data, progressData, planChartData }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("개인별 일정수");
  const [content, setContent] = useState(
    "팀원과 자신의 일정수를 비교할 수 있습니다."
  );
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setTitle("개인별 일정수");
      setContent("팀원과 자신의 일정수를 비교할 수 있습니다.");
    } else if (newValue === 1) {
      setTitle("일정 분포도");
      setContent("팀의 전체 일정 분포도를 확인할 수 있습니다.");
    } else if (newValue === 2) {
      setTitle("일정 차트");
      setContent("일정을 차트 형식으로 볼 수 있습니다.");
    }
  };

  const printChart = () => {
    window.frames[
      "chartPrint"
    ].document.body.innerHTML = document.getElementById("chart").innerHTML;
    window.frames["chartPrint"].print();
  };

  const printProgressChart = () => {
    window.frames[
      "progressChartPrint"
    ].document.body.innerHTML = document.getElementById(
      "progressChartSection"
    ).innerHTML;
    window.frames["progressChartPrint"].print();
  };

  const planChartPint = () => {
    window.frames[
      "planChartPrint"
    ].document.body.innerHTML = document.getElementById(
      "planChartSection"
    ).innerHTML;
    window.frames["planChartPrint"].print();
  };

  return (
    <Card chart>
      <CardHeader
        color={value === 0 ? "warning" : value === 1 ? "success" : "info"}
      >
        {value === 0 ? (
          <Fade in={true} timeout={300}>
            <div id="chartSection">
              <GroupByUserChart data={data} />
            </div>
          </Fade>
        ) : value === 1 ? (
          <Fade in={true} timeout={300}>
            <div id="progressChartSection">
              <ProgressChart data={progressData} />
            </div>
          </Fade>
        ) : (
          <Fade in={true} timeout={300}>
            <div id="planChartSection">
              <PlanChart data={planChartData} />
            </div>
          </Fade>
        )}
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{title ? title : null}</h4>
        <p className={classes.cardCategory}>
          {content ? content : null}
          {value === 0 ? (
            <Button
              onClick={printChart}
              style={{ marginLeft: 30 }}
              size="small"
              variant="outlined"
              color="primary"
            >
              차트 인쇄
            </Button>
          ) : value === 1 ? (
            <Button
              onClick={printProgressChart}
              style={{ marginLeft: 30 }}
              size="small"
              variant="outlined"
              color="primary"
            >
              차트 인쇄
            </Button>
          ) : (
            <Button
              onClick={planChartPint}
              style={{ marginLeft: 30 }}
              size="small"
              variant="outlined"
              color="primary"
            >
              차트 인쇄
            </Button>
          )}
        </p>
        <Divider style={{ marginTop: 7, marginBottom: 0 }} />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="개인별 일정수 보기" {...a11yProps(0)} />
          <Tab label="일정 분포도 보기" {...a11yProps(1)} />
          <Tab label="일정 차트 보기" {...a11yProps(2)} />
        </Tabs>
      </CardBody>
    </Card>
  );
});

export default ChartSection;
