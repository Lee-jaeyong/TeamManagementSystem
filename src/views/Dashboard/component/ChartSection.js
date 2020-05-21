import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { makeStyles } from "@material-ui/core/styles";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(styles);

const chartOption = (maxCount) => {
  return {
  options: {
    axisX: {
      showGrid: false,
    },
    low: 0,
    high: maxCount + 5,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0,
    },
  },
  animation: {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * 80,
            dur: 500,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  }}
};

const chartData = (user, value) => {
  return {
    data: {
      labels: user,
      series: [value],
    },
  };
};

export default function SignUpList(props) {
  const classes = useStyles();
  const [data, setData] = useState();
  const [title, setTitle] = useState("개인별 일정수");
  const [content, setContent] = useState(
    "팀원과 자신의 일정수를 비교할 수 있습니다."
  );
  const [value, setValue] = useState(0);
  const [maxCount,setMaxCount] = useState(0);

  const parseChartData = (data) => {
    if (!data["content"]) return;
    let user = [];
    let value = [];
    let max = 0;
    for (let i = 0; i < data["content"].length; i++) {
      user.push(data["content"][i]["name"]);
      value.push(data["content"][i]["count"]);
      if(max < data['content'][i]['count'])
        max = data['content'][i]['count'];
    }
    setMaxCount(max);
    setData({
      user: user,
      value: value,
    });
  };

  useEffect(() => {
    parseChartData(props["data"]);
  }, [props["data"]]);

  return (
    <Card chart>
      <CardHeader color={value === 0 ? "warning" : "success"}>
        <ChartistGraph
          style={{ height: 365 }}
          className="ct-chart"
          data={
            chartData(data ? data["user"] : [], data ? data["value"] : []).data
          }
          type="Bar"
          options={chartOption(maxCount).options}
          responsiveOptions={chartOption(maxCount).responsiveOptions}
          listener={chartOption(maxCount).animation}
        />
      </CardHeader>
      <CardBody>
        <h4 className={classes.cardTitle}>{title ? title : null}</h4>
        <p className={classes.cardCategory}>{content ? content : null}</p>
        <Divider style={{ marginTop: 7, marginBottom: 0 }} />
      </CardBody>
    </Card>
  );
}
